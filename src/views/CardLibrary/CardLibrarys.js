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

// import usersData from './CardLibraryData'
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

// const CardLibrarys = () => {
//   const history = useHistory()
//   return (
//     <div className="animated fadeIn">
// <CRow>
//   <CCol lg={12}> <h2> Card Library</h2></CCol>
//   <CCol lg={12}> <CButton color="info" style={{ float: 'right' }}
//   //  onClick={(item, index) => history.push(`/Challenge/CreateNew`)} 
//    > + Create New  </CButton></CCol>
// </CRow>
//       <br />
//       <CRow>
//         <CCol xl={12}>
//           <CCard>
//             <CCardHeader>
//               {/* Data Tables */}
//               {/* <small className="text-muted"> example</small> */}
//             </CCardHeader>
//             <CCardBody>
//               <CDataTable
//                 items={usersData}
//                 fields={[{ key: 'CardTitle', _classes: 'font-weight-bold' }, 'cards']}
//                 hover
//                 tableFilter
//                 itemsPerPageSelect
//                 striped
//                 pagination={{ doubleArrows: false, align: 'left' }}
//                 itemsPerPage={5}
//                 clickableRows
//                 // onRowClick={(item, index) => history.push(`/Challenges/${item.id}`)}
//                 scopedSlots={{
//                   'featured':
//                     (item) => (
//                       // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
//                       <td><img src={featuredImage} width="30px" height="25px" /></td>
//                     ),
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

// export default CardLibrarys


import React, { Component } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable,
  CBadge,
  CSelect,
  CInput, CForm, CFormGroup, CLabel, CButtonGroup,
  CModal, CModalHeader, CModalTitle, CModalBody
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

// import CardLibraryData from './CardLibraryData'

class CardLibrarys extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendUserData: [],
      userTotalData: [],
      userPageData: [],
      pageButtonNumber: [],
      CollectionTitle: "",
      itemperpager: 5,
      pageNumber: 1,
      pageCount: 0,
      vidbleStatus: 'Active',
      visbleButtonColor: [true, false, false, false],
      loaderFlag: true,
      modalTitle: false,

    }
  }

  componentDidMount = () => {
    let { BackendUserData, userTotalData, pageCount, itemperpager, pageButtonNumber, loaderFlag } = this.state;
    let url = Config.host + Config.Cards.Cards_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data.filter(user => user.status == "current")
          userTotalData = BackendUserData;
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
    let { userTotalData, BackendUserData, vidbleStatus } = this.state;
    userTotalData = BackendUserData.filter(user => user.CardTitle.toString().indexOf(e.target.value) !== -1)
    console.log(userTotalData)
    this.setState({ userTotalData })
  }

  onChangeCollectionTitle = (e) => {
    this.setState({ CollectionTitle: e.target.value })
  }

  onShowModal = () => {
    this.setState({
      modalTitle: !this.state.modalTitle,
    });
  }

  onCreateNewCollection = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to add  this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Cards.Cards_CRUD_Url;
            let data = { title: this.state.CollectionTitle };
            ApiService.apiCall('post', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data is added !")
                  window.location.reload();
                  this.props.history.push(`/CardLibrarys`)
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
        <Link to="/CardLibrarys" >
          <span>Card Collections</span> &nbsp;
        </Link>
        <br />
        <br />
        <CRow>
          <CCol lg={12}> <h2> Card Collections</h2></CCol>
          <CCol lg={12}> <CButton color="info" style={{ float: 'right' }}
            //  onClick={(item, index) => this.props.history.push(`/CardLibrary/CreateNew`)} 
            onClick={this.onShowModal}
          > + Create New  </CButton></CCol>
        </CRow>

        <br />
        <br />
        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                {/* <h5>Data Tables</h5> */}
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

                    {/* <CForm action="" method="get" inline>
                      <CFormGroup className="pr-1">
                        <CLabel htmlFor="exampleInputName2" className="pr-1">Search</CLabel>
                        <CInput id="exampleInputName2" placeholder="type string..." required onChange={this.onSearch} />
                      </CFormGroup>
                    </CForm> */}
                  </div>
                </div><br />

                <CDataTable
                  items={this.state.userTotalData}
                  fields={[{ key: 'Name', _classes: 'font-weight-bold' }, 'cards']}
                  hover
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  clickableRows
                  onRowClick={(item, index) => this.props.history.push(`/CardLibrarys/${item._id}`)}
                  scopedSlots={{
                    'Name':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {item.title}</td>
                      ),
                    'cards':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {item.exercisesData.length}</td>
                      )
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CModal
          show={this.state.modalTitle}
          onClose={this.onShowModal}
        >
          <CModalBody>
            <CInput className="form-control" id="bcc2" type="email" placeholder="Collection Name" onChange={this.onChangeCollectionTitle} style={{ fontSize: "30px", width: "100%" }} />
            <br />

            <CRow>
              <CCol lg={12} style={{ float: 'left' }}>
                <CButton color="info" onClick={this.onCreateNewCollection} >Submit </CButton>
                <CButton
                  color="secondary"
                  onClick={this.onShowModal}
                  style={{ marginLeft: '25px' }}
                >Cancel</CButton>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>

      </div>
    )
  }
}
export default withRouter(CardLibrarys);

