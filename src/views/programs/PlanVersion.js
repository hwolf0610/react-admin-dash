// import React, { Component } from 'react';
// import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable } from '@coreui/react';
// import {
//     CIcon
// } from '@coreui/icons-react';
// import { withRouter } from "react-router";

// import PlanVersionData from './PlanVersionData'

// class PlanVersion extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             users: [],
//             userDetails: [],
//             title: "",
//         }
//     }

//     componentDidMount = () => {
//         let { users, userDetails, title } = this.state;
// users = PlanVersionData.find(user => user.id.toString() === this.props.match.params.id)

// userDetails = users ? users : [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
// if (users) {
//     title = users.title;
// }
//         this.setState({ users, userDetails, title })

//     }

//     render() {

//         return (
//             <div className="animated fadeIn">
// <CRow>
//     <CCol lg={12}>
//         {/* {this.props.match.params.id} */}
//         <h2>{this.state.title}</h2>
//         <CButton color="info" style={{float:'right'}}>Add New Version </CButton>
//     </CCol>
// </CRow>

//                 <br />
//       <CRow>
//         <CCol xl={12}>
//           <CCard>
//             <CCardHeader>
//             {this.state.title}  &nbsp; Version
//               {/* <small className="text-muted"> example</small> */}
//             </CCardHeader>
//             <CCardBody>
//               <CDataTable
//                 items={PlanVersionData}
//                 fields={[{ key: 'version', _classes: 'font-weight-bold' },
//                   'created', 'Finished']}
//                 hover
//                 tableFilter
//                 itemsPerPageSelect
//                 striped
//                 pagination={{ doubleArrows: false, align: 'center' }}
//                 itemsPerPage={5}
//                 clickableRows
//                 onRowClick={(item, index) =>  this.props.history.push(`/programs/Plans/VersionTask/${item.id}`)}
//                 scopedSlots={{
//                 //   'status':
//                 //     (item) => (
//                 //       <td>
//                 //         <CBadge color={getBadge(item.status)}>
//                 //           {item.status}
//                 //         </CBadge>
//                 //       </td>
//                 //     )
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>

//             </div>
//         )
//     }
// }

// // export default PlanVersion;
// export default withRouter(PlanVersion);

import React, { Component } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable,
  CBadge,
  CSelect,
  CInput, CForm, CFormGroup, CLabel, CButtonGroup
} from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import PlanVersionData from './PlanVersionData'

class PlanVersion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendTotalPlanData: [],
      BackendUserData: [],
      userTotalData: [],
      userPageData: [],
      pageButtonNumber: [],
      title: "",
      itemperpager: 5,
      pageNumber: 1,
      pageCount: 0,
      vidbleStatus: 'current',
      visbleButtonColor: [true, false, false, false],
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    localStorage.setItem("PlanDataUUID", this.props.match.params.id);
    let { BackendTotalPlanData, BackendUserData, loaderFlag, userTotalData, pageCount, itemperpager, pageButtonNumber, title } = this.state;
    let url = Config.host + Config.Plan.Plans_CRUD_Url + "/" + this.props.match.params.id;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendTotalPlanData = res.data.data
          console.log(BackendTotalPlanData._id)
          if (BackendTotalPlanData._id == this.props.match.params.id) {
            title = BackendTotalPlanData.title;
            localStorage.setItem("PlanDataTitle", title);
            localStorage.setItem("PlanDataDescription", BackendTotalPlanData.description);
          }
          // let users = BackendTotalPlanData.find(user => user._id.toString() === this.props.match.params.id)
          // if (users) {
          //   title = users.title;
          // }
          BackendUserData = BackendTotalPlanData.planTypeData
          userTotalData = BackendUserData
          pageCount = Math.round(userTotalData.length / itemperpager);
          console.log("pageCount:", pageCount)
          if (pageCount * itemperpager < userTotalData.length) {
            pageCount++;
            console.log("pageCount:", pageCount)
          }
          var startWhileValue = 0;
          while (startWhileValue < eval(pageCount)) {
            pageButtonNumber.push(startWhileValue + 1);
            startWhileValue++;
          }
          console.log("PageButtonNumber:", pageButtonNumber)

          loaderFlag = false
          this.setState({ BackendTotalPlanData, BackendUserData, loaderFlag, userTotalData, pageCount, itemperpager, pageButtonNumber, title })

        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("api call failed.", error)
      }
    })


  }

  getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'free': return 'secondary'
      case 'Cancel': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  onChangePerPager = (e) => {
    console.log(e.target.value)
    let { userTotalData, pageCount, itemperpager, pageButtonNumber } = this.state;
    itemperpager = eval(e.target.value);
    pageCount = Math.round(userTotalData.length / itemperpager);
    console.log("pageCount:", pageCount)
    if (pageCount * itemperpager < userTotalData.length) {
      pageCount++;
      console.log("pageCount:", pageCount)
    }
    var startWhileValue = 0;
    pageButtonNumber = [];
    while (startWhileValue < eval(pageCount)) {
      pageButtonNumber.push(startWhileValue + 1);
      startWhileValue++;
    }
    console.log("PageButtonNumber:", pageButtonNumber)

    this.setState({ userTotalData, pageCount, itemperpager, pageButtonNumber })
  }
  onSearch = (e) => {
    let { userTotalData, vidbleStatus, BackendUserData } = this.state;
    userTotalData = BackendUserData.filter(user => user.version.toString().indexOf(e.target.value) !== -1)

    console.log(userTotalData)
    this.setState({ userTotalData })
  }

  // onGoVersion =()=>{
  //   this.props.history.push(`/programs/Plans/VersionTask/${item.id}`)
  // }

  onRemovePlan = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to update this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Plan.Plans_CRUD_Url;
            let formData = new FormData();
            // if (this.state.ImageFile != null) { formData.append("picture", this.state.ImageFile); }
            formData.set("editID", this.props.match.params.id);
            formData.set("status", "remove");
            // formData.set("description", this.state.Description);
            // formData.set("public", this.state.publicType);
            ApiService.apiCall('patch', url, formData, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data is updated !")
                  this.props.history.push(`/programs/plans`)
                } else {
                  alert("this request failed !")
                }
              } catch (error) {
                console.log("error:", error)
              }
            })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onGoVersion = () => {
    let url = Config.host + Config.Plan.add_Plan_Version_Url;
    let data ={
      editID :this.props.match.params.id,
      version :0,
      created :0,
      finished :0
    } 
    ApiService.apiCall('post', url, data, (res) => {
      try {
        if (res.data.status == 200) {
          // alert("this data is updated !")
          let planTypeDataID;
          res.data.data.planTypeData.map(item=>{
            if(item.version == "0"){
              planTypeDataID = item.id
            }
          })
          this.props.history.push(`/programs/Plans/VersionTask/${planTypeDataID}`)
        } else {
          alert("this request failed !")
        }
      } catch (error) {
        console.log("error:", error)
      }
    })
    
  }


  render() {
    return (
      <div className="animated fadeIn">
        {(this.state.loaderFlag != false) &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            >
            </div>
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
        <Link to="/programs/plans" >
          <span>Programs</span> &nbsp;
        </Link>/ &nbsp; {this.state.title}
        <br />
        <br />
        <CRow>
          <CCol lg={6}><h2>{this.state.title}</h2></CCol>
          <CCol lg={6}>
            <div style={{ float: 'right' }}>
              <div style={{ display: 'inline-block' }}>
                <CButton color="danger" onClick={this.onRemovePlan}>Delete Plan </CButton>
              </div>
              <div style={{ display: 'inline-block', marginLeft: "20px" }}>
                <CButton color="info" onClick={this.onGoVersion}>Add New Version </CButton>
              </div>
            </div>

          </CCol>
        </CRow>
        <br />
        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                <h5>{this.state.title} &nbsp; Version</h5>
              </CCardHeader>
              <CCardBody>
                <div >
                  <div style={{ display: 'inline-block' }}>Show</div>
                  <div style={{ display: 'inline-block' }}>
                    <CSelect custom name="select" id="select" onChange={this.onChangePerPager} >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </CSelect>
                  </div>
                  <div style={{ display: 'inline-block' }}>entires</div>
                  <div style={{ display: 'inline-block', float: 'right', textAlign: 'center' }}>

                    <CForm action="" method="get" inline>
                      <CFormGroup className="pr-1">
                        <CLabel htmlFor="exampleInputName2" className="pr-1">Search</CLabel>
                        <CInput id="exampleInputName2" placeholder="type string..." required onChange={this.onSearch} />
                      </CFormGroup>
                    </CForm>
                  </div>
                </div><br />

                <CDataTable
                  items={this.state.userTotalData}
                  fields={[{ key: 'version', _classes: 'font-weight-bold' },
                    'created', 'finished']}
                  hover
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  clickableRows
                  onRowClick={(item, index) => this.props.history.push(`/programs/Plans/VersionTask/${item.id}`)}
                  scopedSlots={{
                    'profile':
                      (item) => (
                        <td><img src={item.profile} width="50px" height="50px" /></td>
                      ),
                    'version':
                      (item) => (
                        <td>{item.version}.0</td>
                      ),
                    'subscription':
                      (item) => (
                        <td>
                          <CBadge color={this.getBadge(item.subscription)}>
                            {item.subscription}
                          </CBadge>
                        </td>
                      )
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

      </div>
    )
  }
}
export default withRouter(PlanVersion);

