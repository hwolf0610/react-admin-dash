import React, { Component } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable,
  CBadge,
  CSelect,
  CInput, CForm, CFormGroup, CLabel, CButtonGroup
} from '@coreui/react';

import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import PlanData from './PlanData'

class Plans extends Component {
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
      vidbleStatus: 'current',
      visbleButtonColor: [true, false, false, false],
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    let { BackendUserData, loaderFlag, userTotalData, pageCount, itemperpager, pageButtonNumber } = this.state;
    let url = Config.host + Config.Plan.Plans_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data

          userTotalData = BackendUserData.filter(user => user.status == "current")
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
          this.setState({ BackendUserData, loaderFlag, userTotalData, pageCount, itemperpager, pageButtonNumber })
        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("api call failed.", error)

        console.log("error :", error);
      }
    })


    // var mid = [3, 4];
    // var arr = [1, 2, ...mid, 5, 6];    
    // console.log("arr:" ,arr);
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
    userTotalData = BackendUserData.filter(user => user.title.toString().indexOf(e.target.value) !== -1 && user.status.toString().indexOf(vidbleStatus) !== -1)


    console.log(userTotalData)
    this.setState({ userTotalData })
  }

  setVisbleStatus = (status, btnKey) => {
    console.log("status:", status);
    let { BackendUserData, userTotalData, vidbleStatus, visbleButtonColor } = this.state;
    vidbleStatus = status
    userTotalData = BackendUserData.filter(user => user.status.toString().indexOf(vidbleStatus) !== -1)
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

  onEditPlan = (editItem) => {
    localStorage.setItem("editPlanItemUUID", editItem._id)
    this.props.history.push(`/programs/CreateNewPlan`)
  }

  onCreateNewPlan = () => {
    localStorage.setItem("editPlanItemUUID", "")
    this.props.history.push(`/programs/CreateNewPlan`)
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
        <Link to="/programs/plans" >
          <span>Plans</span>
        </Link>
        <br />
        <br />
        <CRow>
          <CCol lg={12}> <h2> Plans</h2></CCol>
          <CCol lg={12}> &nbsp;</CCol>
          <CCol lg={6}>
            <CButton color={btn_class1} onClick={this.setVisbleStatus.bind(this, 'current', 0)}>Current </CButton>
            &nbsp;&nbsp;&nbsp;
            <CButton color={btn_class2} onClick={this.setVisbleStatus.bind(this, 'past', 1)}> Past </CButton>
            &nbsp;&nbsp;&nbsp;
            <CButton color={btn_class3} onClick={this.setVisbleStatus.bind(this, 'remove', 2)} > Removed  </CButton>
            &nbsp;&nbsp;&nbsp;
          </CCol>
          <CCol lg={6}> <CButton color="info" style={{ float: 'right' }} onClick={this.onCreateNewPlan} > Create New Plan  </CButton></CCol>
        </CRow>

        <br />
        <br />
        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                <h5>Plans</h5>
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
                  fields={[{ key: 'title', _classes: 'font-weight-bold' },
                    'host', 'totalCreations', ' ']}
                  hover
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  // clickableRows
                  // onRowClick={(item, index) => this.props.history.push(`/programs/Plans/${item._id}`)}
                  scopedSlots={{
                    'title':
                      (item) => (
                        <td>
                          <Link to={(`/programs/Plans/${item._id}`)} >
                          <span style={{ color: '#1AA0FF' }}>{item.title}</span>
                          </Link>                         
                        </td>
                      ),
                    'subscription':
                      (item) => (
                        <td>
                          <CBadge color={this.getBadge(item.subscription)}>
                            {item.subscription}
                          </CBadge>
                        </td>
                      ),
                    ' ':
                      (item) => (
                        <td style={{ float: 'right' }}>
                          <CButton color="info" variant="outline" onClick={this.onEditPlan.bind(this, item)}>Edit </CButton>
                        </td>
                      ),
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
export default withRouter(Plans);





