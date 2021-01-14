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

// import FlaggedPostData from './FlaggedPostData'
import FlaggedPost_image from '../../assets/img/FlaggedPost_image.png'
import "./style.css"
class PostUserHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendPostTotalData: [],
      BackendUserData: [],
      FlaggedPostTotalData: [],
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
    console.log("username:", localStorage.getItem("PostHistoryUserName"))
    let { BackendPostTotalData, BackendUserData, loaderFlag, FlaggedPostTotalData, pageCount, itemperpager, pageButtonNumber } = this.state;
    let url = Config.host + Config.post.Posts_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendPostTotalData = res.data.data
          BackendPostTotalData.map((item => {
            item.commitData.map(item2 => {
              if (item2.commitUsername == localStorage.getItem("PostHistoryUserName")) {
                BackendUserData.push(item2)
              }
            })
          }))
          FlaggedPostTotalData = BackendUserData
          console.log("FlaggedPostTotalData:", FlaggedPostTotalData)

          pageCount = Math.round(FlaggedPostTotalData.length / itemperpager);
          console.log("pageCount:", pageCount)
          if (pageCount * itemperpager < FlaggedPostTotalData.length) {
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
          this.setState({ BackendPostTotalData, BackendUserData, loaderFlag, FlaggedPostTotalData, pageCount, itemperpager, pageButtonNumber })

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
      case 'No Warning': return 'success'
      case 'free': return 'secondary'
      case 'Cancel': return 'warning'
      case 'warned': return 'danger'
      default: return 'primary'
    }
  }
  onChangePerPager = (e) => {
    console.log(e.target.value)
    let { FlaggedPostTotalData, pageCount, itemperpager, pageButtonNumber } = this.state;
    itemperpager = eval(e.target.value);
    pageCount = Math.round(FlaggedPostTotalData.length / itemperpager);
    console.log("pageCount:", pageCount)
    if (pageCount * itemperpager < FlaggedPostTotalData.length) {
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

    this.setState({ FlaggedPostTotalData, pageCount, itemperpager, pageButtonNumber })
    // this.setState({ itemperpager: eval(e.target.value) })
  }
  onSearch = (e) => {
    let { FlaggedPostTotalData, BackendUserData } = this.state;
    FlaggedPostTotalData = BackendUserData.filter(user => user.commitUsername.toString().indexOf(e.target.value) !== -1)

    console.log(FlaggedPostTotalData)
    this.setState({ FlaggedPostTotalData })
  }

  onRemoveCommit = (removeItem) => {
    var dIndex = -1;
    let { BackendPostTotalData } = this.state;
    BackendPostTotalData.map(item => {
      item.commitData.map(item2 => {
        if (item2.id == removeItem.id) {
          dIndex = item._id;
        }
      })
    })
    console.log("_ID:", dIndex)

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.post.delete_Commit_Url;
            let data = { editPostID: dIndex, delCommitID : removeItem.id }
            ApiService.apiCall('delete', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data deleted !")
                  this.props.history.push(`/FlaggedPosts`)
                } else {
                  alert("delete request failed !")
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
        <Link to="/FlaggedPosts" >
          <span>FlaggedPosts</span> &nbsp;
        </Link>/ &nbsp; User History
        <br />
        <br />
        <h2>User History</h2>
        {/* {this.props.match.params.id} */}
        <br />
        <br />
        <CRow>
          <CCol xl={12}>
            <CCard>
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
                  style={{ boxShadow: '5px 5px 10px 18px #888888' }}
                  items={this.state.FlaggedPostTotalData}
                  fields={[
                    { key: 'username', _classes: 'font-weight-bold' },
                    'Flagged Post/Comment', 'DataPosted', 'PostStatus',
                    { key: 'Actions', _classes: 'text-align-right-me' }]}
                  // hover
                  // tableFilter = {{label:'Show' , placeholder:'type string...'}}
                  // itemsPerPageSelect = {{label:'Search'}}
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  // clickableRows
                  // onRowClick={(item, index) => this.props.history.push(`/FlaggedPosts/${item.id}`)}
                  scopedSlots={{
                    'username':
                      (item) => (
                        <td>
                          {item.commitUsername}<br />
                        </td>
                      ),
                    'DataPosted':
                      (item) => (
                        <td>
                          {item.creatorDate}<br />
                        </td>
                      ),
                    'Flagged Post/Comment':
                      (item) => (
                        <td>
                          {(item.commitPicture != null) && <img src={Config.host + "/static/media/" + item.commitPicture}  width="100px" height="100px"/>}<br />
                          {item.commitDetails}<br />
                        </td>
                      ),
                    'Actions':
                      (item) => (
                        <td>
                          <div style={{ float: 'right' }} >
                            {(item.PostStatus != "Removed") && <div style={{ display: 'inline-block', marginLeft: "15px" }}><CButton color="danger" variant="outline" onClick={this.onRemoveCommit.bind(this, item)}>Remove </CButton></div>}
                          </div>
                        </td>
                      ),
                    'PostStatus':
                      (item) => (
                        <td>
                          {(item.commitStatus != "Removed") && <span style={{ color: '#F86C6B' }}>{item.commitStatus}</span>}
                          {(item.commitStatus != "unflagged") && <span style={{ color: '#4DBD74' }}>{item.commitStatus}</span>}
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

// export default PlanVersion;
export default withRouter(PostUserHistory);


