// import React from 'react';
// import { useHistory } from "react-router-dom";
// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CDataTable,
//   CRow,
//   CButton
// } from '@coreui/react';

// import usersData from './ChallengesData'
// import featuredImage from '../../assets/img/featured.png'

// const getBadge = (status) => {
//   switch (status) {
//     case 'past': return 'success'
//     case 'Inactive': return 'secondary'
//     case 'Pending': return 'warning'
//     case 'remove': return 'danger'
//     default: return 'primary'
//   }
// }

// const Challenges = () => {
//   const history = useHistory()
//   return (
//     <div className="animated fadeIn">
// <CRow>
//     <CCol lg={12}> <h2> Challenges</h2></CCol> 
//     <CCol lg={12}> &nbsp;</CCol> 
//     <CCol lg={6}> 
//    <CButton color="info" >Current </CButton>
// &nbsp;&nbsp;&nbsp;
// <CButton color="basic" > Past  </CButton>
// &nbsp;&nbsp;&nbsp;
// <CButton color="basic" > Removed  </CButton>
// &nbsp;&nbsp;&nbsp;
//     </CCol>
//     <CCol lg={4}>&nbsp;&nbsp;</CCol>
//     <CCol lg={2}> <CButton color="info" style={{float:'right'}} onClick = {(item, index) => history.push(`/Challenge/CreateNew`)} > Create New Challenge  </CButton></CCol>
//   </CRow>     
//       <br />
//       <CRow>
//         <CCol xl={12}>
//           <CCard>
//             <CCardHeader>
//               Data Tables
//               {/* <small className="text-muted"> example</small> */}
//             </CCardHeader>
//             <CCardBody>
//               <CDataTable
//                 items={usersData}
// fields={[{ key: 'challengeTitle', _classes: 'font-weight-bold' },
//   'plan', 'version', 'host', 'signUps', 'activeDate', 'featured', 'status']}
//                 hover
//                 tableFilter
//                 itemsPerPageSelect
//                 striped
//                 pagination={{ doubleArrows: false, align: 'left' }}
//                 itemsPerPage={5}
//                 clickableRows
//                 onRowClick={(item, index) => history.push(`/Challenges/${item.id}`)}
//                 scopedSlots={{
// 'featured':
//   (item) => (
//     // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
//     <td><img src={featuredImage} width="30px" height="25px" /></td>
//   ),
//                   'status':
//                     (item) => (
//                       <td>
//                         <CBadge color={getBadge(item.status)}>
//                           {item.status}
//                         </CBadge>
//                       </td>
//                     )
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </div>
//   )
// }

// export default Challenges

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
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import ChallengesData from './ChallengesData'
import featuredImage from '../../assets/img/featured.png'

class Challenges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendUserData: [],
      userTotalData: [],
      userPageData: [],
      pageButtonNumber: [],
      title: "",
      itemperpager: 5,
      pageNumber: 1,
      pageCount: 0,
      vidbleStatus: 'Active',
      visbleButtonColor: [true, false, false, false],
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    let { BackendUserData, userTotalData, pageCount, itemperpager, pageButtonNumber, loaderFlag } = this.state;
    let url = Config.host + Config.Challenges.Challenges_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data
          userTotalData = BackendUserData.filter(user => user.status== "Active" || user.status == "start")
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
          this.setState({ BackendUserData, userTotalData, pageCount, itemperpager, pageButtonNumber, loaderFlag })
        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("error :", error);
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
    if (vidbleStatus == "Active") {
      userTotalData = BackendUserData.filter(user => user.title.toString().indexOf(e.target.value) !== -1 && (user.status == vidbleStatus || user.status == "start"))
    } else {
      userTotalData = BackendUserData.filter(user => user.title.toString().indexOf(e.target.value) !== -1 && user.status == vidbleStatus)
    }
    console.log(userTotalData)
    this.setState({ userTotalData })
  }

  setVisbleStatus = (status, btnKey) => {
    console.log("status:", status);
    let { BackendUserData, userTotalData, vidbleStatus, visbleButtonColor } = this.state;
    vidbleStatus = status
    if (vidbleStatus == "Active") {
      userTotalData = BackendUserData.filter(user => user.status == vidbleStatus || user.status == "start")
    } else {
      userTotalData = BackendUserData.filter(user => user.status == vidbleStatus)
    }
    console.log(userTotalData)

    visbleButtonColor.map((item, key) => {
      if (btnKey == key) {
        visbleButtonColor[key] = true
        console.log("key1:", btnKey, key, item);
      } else {
        visbleButtonColor[key] = false
        console.log("key2:", btnKey, key, item);
      }
    })
    console.log("visbleButtonColor:", visbleButtonColor);
    this.setState({ userTotalData, vidbleStatus, visbleButtonColor })

  }
  render() {
    let btn_class1 = this.state.visbleButtonColor[0] ? "info" : "basic";
    let btn_class2 = this.state.visbleButtonColor[1] ? "info" : "basic";
    let btn_class3 = this.state.visbleButtonColor[2] ? "info" : "basic";
    return (
      <div className="animated fadeIn" >
        {(this.state.loaderFlag != false) &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            >
            </div>
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
        <Link to="/Challenges" >
          <span>Challenges</span> &nbsp;
        </Link>
        <br />
        <br />
        <CRow>
          <CCol lg={12}> <h2> Challenges</h2></CCol>
          <CCol lg={12}> &nbsp;</CCol>
          <CCol lg={6}>
            <CButton color={btn_class1} onClick={this.setVisbleStatus.bind(this, 'Active', 0)}>Active </CButton>
            &nbsp;&nbsp;&nbsp;
            <CButton color={btn_class2} onClick={this.setVisbleStatus.bind(this, 'past', 1)}> Past </CButton>
            &nbsp;&nbsp;&nbsp;
            <CButton color={btn_class3} onClick={this.setVisbleStatus.bind(this, 'remove', 2)} > Removed  </CButton>
            &nbsp;&nbsp;&nbsp;
          </CCol>
          <CCol lg={6}> <CButton color="info" style={{ float: 'right' }} onClick={(item, index) => this.props.history.push(`/Challenge/CreateNew`)} > Create New Challenge  </CButton></CCol>
        </CRow>

        <br />
        <br />
        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                <h5>Data Tables</h5>
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
                  fields={[{ key: 'challengeTitle', _classes: 'font-weight-bold' },
                    'Plan', 'Version', 'Host', 'signUps', 'ActiveDate', 'Featured']}
                  hover
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  clickableRows
                  onRowClick={(item, index) => this.props.history.push(`/Challenges/${item._id}`)}
                  scopedSlots={{
                    'Featured':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {(item.Featured == "yes") && <img src={featuredImage} width="30px" height="25px" />}</td>
                      ),
                    'challengeTitle':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {item.title}</td>
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
export default withRouter(Challenges);
