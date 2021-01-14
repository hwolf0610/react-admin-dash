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
//   CButton,
//   CSelect,
//   CInput
// } from '@coreui/react';

// import usersData from './UsersData'
// import profile from '../../assets/img/profile/profile1.png'

// const getBadge = (status) => {
//   switch (status) {
//     case 'Active': return 'success'
//     case 'Inactive': return 'secondary'
//     case 'Pending': return 'warning'
//     case 'Banned': return 'danger'
//     default: return 'primary'
//   }
// }
// var itemperpager = 5;
// const onChangePerPager = (e) => {
//   console.log(e.target.value)
//   itemperpager = e.target.value
// }

// const Users = () => {
//   const history = useHistory()
//   return (
//     <div className="animated fadeIn">
//       <h2>Users</h2>
//       <CButton color="info" >Active </CButton>
//       &nbsp;&nbsp;&nbsp;
//       <CButton color="basic" > Cancelled </CButton>
//       &nbsp;&nbsp;&nbsp;
//       <CButton color="basic" > Total  </CButton>
//       &nbsp;&nbsp;&nbsp;
//       <CButton color="basic" > Banned  </CButton>
//       <br />
//       <br />
//       <CRow>
//         <CCol xl={12}>
//           <CCard>
//             <CCardHeader>
//               Memberships
//               {/* <small className="text-muted"> example</small> */}
//             </CCardHeader>
//             <CCardBody>
//               <div >
//                 <div style={{ display: 'inline-block' }}>Show</div>
//                 <div style={{ display: 'inline-block' }}>
//                   <CSelect custom name="select" id="select" onChange={onChangePerPager} >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="15">15</option>
//                     <option value="20">20</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </CSelect>
//                 </div>
//                 <div style={{ display: 'inline-block' }}>entires</div>
//                 <div style={{ display: 'inline-block', float: 'right', textAlign: 'center' }}>
//                   Search
//                   <div style={{ display: 'inline-block', float: 'right' }}>
//                     <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" />
//                   </div>
//                 </div>
//               </div><br />

//               <CDataTable
//                 items={usersData}
//                 fields={['profile',
//                   { key: 'name', _classes: 'font-weight-bold' },
//                   'username', 'DataRegistered', 'membership', 'role', 'subscription']}
//                 hover
//                 // tableFilter
//                 // itemsPerPageSelect
//                 striped
//                 pagination={{ doubleArrows: false, align: 'center', }}
//                 itemsPerPage={itemperpager}
//                 clickableRows
//                 onRowClick={(item, index) => history.push(`/users/${item.id}`)}
//                 scopedSlots={{
//                   'profile':
//                     (item) => (
//                       <td><img src={item.profile} width="50px" height="50px" /></td>
//                     ),
//                   'subscription':
//                     (item) => (
//                       <td>
//                         <CBadge color={getBadge(item.subscription)}>
//                           {item.subscription}
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
// export default Users

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
// import usersData from './UsersData'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
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
    let url = Config.host + Config.user.User_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data
          console.log("data:", res.data.data)

          userTotalData = BackendUserData.filter(user => user.status == "Active")
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
    // this.setState({ itemperpager: eval(e.target.value) })
  }
  onSearch = (e) => {
    let { userTotalData, BackendUserData, vidbleStatus } = this.state;
    if (vidbleStatus === "Total") {
      userTotalData = BackendUserData.filter(user => user.displayname.toString().indexOf(e.target.value) !== -1)
    } else {
      userTotalData = BackendUserData.filter(user => user.displayname.toString().indexOf(e.target.value) !== -1 && user.status == vidbleStatus)
    }

    console.log(userTotalData)
    this.setState({ userTotalData })
  }

  onPreviousPage = () => {
    let { pageNumber, userPageData } = this.state;
    if (pageNumber > 1) {
      pageNumber = pageNumber - 1;
    }
    console.log("pageNumber:", pageNumber)
    this.setState({ pageNumber, userPageData })
  }

  onNextPage = () => {
    let { pageNumber, pageCount, userPageData } = this.state;
    if (pageNumber < pageCount) {
      pageNumber = pageNumber + 1;
    }
    console.log("pageNumber:", pageNumber, pageCount)
    this.setState({ pageNumber, pageCount, userPageData })
  }

  onsetPageNumber = (number) => {
    // this.setState({pageNumber:number})
    console.log("PageNumber:", number)
  }
  createTable = () => {
    let table = []

    table.push(<CButton variant="outline" color="info" onClick={this.onPreviousPage}>Previous</CButton>)
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      // let children = []
      // //Inner loop to create children
      // for (let j = 0; j < 5; j++) {
      //   // children.push(<td>{`Column ${j + 1}`}</td>)
      //   children.push(<CButton variant="outline" color="info" onClick={this.onPreviousPage}>Previous</CButton>)
      // }
      // //Create the parent and add the children
      table.push(<CButton variant="outline" color="info" onClick={this.onsetPageNumber(i)}>{`${i}`}</CButton>)
    }
    table.push(<CButton variant="outline" color="info" onClick={this.onNextPage}>Next</CButton>)
    return table
  }

  setVisbleStatus = (status, btnKey) => {
    console.log("status:", status);
    let { userTotalData, vidbleStatus, visbleButtonColor, BackendUserData } = this.state;
    vidbleStatus = status
    if (vidbleStatus === "Total") {
      userTotalData = BackendUserData;
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
    let btn_class4 = this.state.visbleButtonColor[3] ? "info" : "basic";
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


        <Link to="/users" >
          <span>Users</span> &nbsp;
        </Link>
        <br />
        <br />
        <h2>Users</h2>
        <div style={{ marginTop: '30px' }}>
          <CButton color={btn_class1} onClick={this.setVisbleStatus.bind(this, 'Active', 0)}>Active </CButton>
      &nbsp;&nbsp;&nbsp;
        <CButton color={btn_class2} onClick={this.setVisbleStatus.bind(this, 'Cancel', 1)}> Cancelled </CButton>
      &nbsp;&nbsp;&nbsp;
        <CButton color={btn_class3} onClick={this.setVisbleStatus.bind(this, 'Total', 2)} > Total  </CButton>
      &nbsp;&nbsp;&nbsp;
        <CButton color={btn_class4} onClick={this.setVisbleStatus.bind(this, 'Banned', 3)}> Banned  </CButton>
        </div>

        <br />
        <br />
        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                <h5>Memberships</h5>
                {/* <small className="text-muted"> example</small> */}
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
                    {/* <div style={{ display: 'inline-block', float: 'right' }}>
                      <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" />
                    </div> */}
                  </div>
                </div><br />

                <CDataTable
                  items={this.state.userTotalData}
                  fields={['profile',
                    { key: 'displayname', _classes: 'font-weight-bold' },
                    'username', 'DataRegistered', 'Membership', 'Role', 'Subscription']}
                  hover
                  // tableFilter = {{label:'Show' , placeholder:'type string...'}}
                  // itemsPerPageSelect = {{label:'Search'}}
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  clickableRows
                  onRowClick={(item, index) => this.props.history.push(`/users/${item._id}`)}
                  scopedSlots={{
                    'profile':
                      (item) => (
                        <td><img src={Config.host + "/static/media/" + item.profileImage} width="50px" height="50px" /></td>
                      ),
                    'Subscription':
                      (item) => (
                        <td>
                          <CBadge color={this.getBadge(item.Subscription)}>
                            {item.Subscription}
                          </CBadge>
                        </td>
                      )
                  }}
                />
                {/* //    <div style={{ float: 'right' }}> */}
                {/* dangerouslySetInnerHTML={{ __html: item.tableData }} */}
                {/* <CButtonGroup  > */}
                {/* {this.createTable()} */}
                {/* <CButton variant="outline" color="info" onClick={this.onPreviousPage}>Previous</CButton>       
                    {
                      this.state.pageButtonNumber.map((item,key)=>{
                        return(
                          <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, item)}>{item}</CButton>
                        )
                      })
                    }
                     <CButton variant="outline" color="info" onClick={this.onNextPage}>Next</CButton> */}
                {/* <CButton variant="outline" color="info" onClick={this.onPreviousPage}>Previous</CButton>
                    <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, 1)}>1</CButton>
                    {(this.state.pageButtonNumber.includes(2)) && <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, 2)}>2</CButton>}
                    {(this.state.pageButtonNumber.includes(3)) && <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, 3)}>3</CButton>}
                    {(this.state.pageButtonNumber.includes(4)) && <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, 4)}>4</CButton>}
                    {(this.state.pageButtonNumber.includes(5)) && <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, 5)}>5</CButton>} */}
                {/* {(this.state.pageCount > 5) && <CButton variant="outline" color="info" onClick={this.onsetPageNumber.bind(this, 5)}>5</CButton>} */}
                {/* <CButton variant="outline" color="info" onClick={this.onNextPage}>Next</CButton>
                  </CButtonGroup>
                </div> */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

      </div>
    )
  }
}

// export default PlanVersion;
export default withRouter(Users);

