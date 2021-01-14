import React, { Component } from 'react';
import { CListGroup, CListGroupItem, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CFormGroup, CInputRadio, CLabel, CInputGroup, CInputGroupAppend, CBadge, CTextarea, CFormText, CSelect } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';
import { Link } from 'react-router-dom';


import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import FlaggedPostData from './FlaggedPostData'
import preview_image from '../../assets/img/upload_preview.png'
import line1 from '../../assets/img/line1.png'
import line2 from '../../assets/img/line2.png'
import line3 from '../../assets/img/line3.png'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

class FlaggedPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendUserData: [],
      PostDetailData: [],
      loaderFlag: true,
    }
  }

  componentDidMount = () => {
    let { BackendUserData, loaderFlag, PostDetailData } = this.state;
    let url = Config.host + Config.post.Posts_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          // BackendUserData = res.data.data
          res.data.data.map((item => {
            item.commitData.map(item => {
              BackendUserData.push(item)
            })
          }))
          PostDetailData = BackendUserData
          console.log("PostDetailData:", PostDetailData)
          loaderFlag = false
          this.setState({ BackendUserData, loaderFlag, PostDetailData })
        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("error :", error);
      }
    })

  }
  onRefoundConfirm = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
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
        </Link>/ &nbsp; Post Detail
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            <h2> Thread Details </h2>
            {/* {this.props.match.params.id} */}
          </CCol>
        </CRow>
        <br /><br />
        <CRow>
          <CCol lg={12}>
            <CListGroup>
              {
                this.state.PostDetailData.map((item, key) => {
                  if (key % 2 == 0) {
                    return (
                      <CListGroupItem style={{ backgroundColor: '#f2f2f2' }} >
                        <CRow>
                          <CCol lg={2}>
                            <span style={{ color: '#1AA0FF' }}>{item.commitUsername}</span>
                          </CCol>
                          <CCol lg={6}>
                            {(item.commitPicture != null) && <img src={Config.host + "/static/media/" + item.commitPicture} width="100px" height="100px"/>}
                            <p>{item.commitDetails}</p>
                          </CCol>
                        </CRow>
                      </CListGroupItem>
                    )
                  } else {
                    return (
                      <CListGroupItem  >
                        <CRow>
                          <CCol lg={2}>
                            <span style={{ color: '#1AA0FF' }}>{item.commitUsername}</span>
                          </CCol>
                          <CCol lg={6}>
                            {(item.commitPicture != null) && <img src={Config.host + "/static/media/" + item.commitPicture} width="100px" height="100px"/>}
                            <p>{item.commitDetails}</p>
                          </CCol>
                        </CRow>
                      </CListGroupItem>
                    )
                  }
                })
              }

            </CListGroup>
          </CCol>
        </CRow>
        <br />
        <br />
        <br />


      </div>
    )
  }
}

export default FlaggedPost;
