import React, { Component } from 'react';
import { CCallout, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CFormGroup, CInputRadio, CLabel, CInputGroup, CInputGroupAppend, CBadge, CTextarea, CFormText, CSelect } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';

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

import { Link } from 'react-router-dom';

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

import preview_image from '../../assets/img/upload_preview.png'
import ReomveIcon from '../../assets/img/remove.png';

const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

class NewPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendUserData: [],
      publicType: "yes",
      Title: "",
      Description: "",
      ImageFile: null,
      ImageName: "",
      VideoFile: null,
      VideoName: "",
      ImageLink: preview_image,
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    console.log("editPlanItemUUID", localStorage.getItem("editPlanItemUUID"))

    let { BackendUserData, loaderFlag, Title, publicType, Description, ImageLink, VideoName } = this.state;
    if (localStorage.getItem("editPlanItemUUID") != "") {
      let url = Config.host + Config.Plan.Plans_CRUD_Url;
      ApiService.apiCall('get', url, {}, (res) => {
        try {
          if (res.data.status == 200) {
            BackendUserData = res.data.data

            BackendUserData.map(item => {
              if (item._id == localStorage.getItem("editPlanItemUUID")) {
                Title = item.title;
                Description = item.description;
                publicType = item.public;
                ImageLink = Config.host + "/static/media/" + item.planImage;
                VideoName = item.planVideo;
              }
            })

            loaderFlag = false
            this.setState({ BackendUserData, loaderFlag, Title, Description, ImageLink, publicType, VideoName })

          } else {
            console.log("api call failed.")
          }
        } catch (error) {
          console.log("error :", error);
        }
      })
    }


  }

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
            formData.set("editID", localStorage.getItem("editPlanItemUUID"));
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

  onUpdatePlan = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to update this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Plan.Plans_CRUD_Url;
            let formData = new FormData();
            if (this.state.ImageFile != null) { formData.append("picture", this.state.ImageFile); }
            if (this.state.VideoFile != null) { formData.append("video", this.state.VideoFile); }
            formData.set("editID", localStorage.getItem("editPlanItemUUID"));
            formData.set("title", this.state.Title);
            formData.set("description", this.state.Description);
            formData.set("public", this.state.publicType);
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

  onCreatePlan = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to add  this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Plan.Plans_CRUD_Url;
            let formData = new FormData();
            if (this.state.ImageFile != null) { formData.append("picture", this.state.ImageFile); }
            if (this.state.VideoFile != null) { formData.append("video", this.state.VideoFile); }
            formData.set("createdBy", sessionStorage.getItem('user_ID'));
            formData.set("title", this.state.Title);
            formData.set("description", this.state.Description);
            formData.set("public", this.state.publicType);
            ApiService.apiCall('post', url, formData, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data is added !")
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

  onChangeTitle = (e) => { this.setState({ Title: e.target.value }) }
  onChangeDescription = (e) => { this.setState({ Description: e.target.value }) }
  onChangePublicType = (e) => { this.setState({ publicType: e.target.value }) }
  onChangeImage = (event) => {
    if (event.target.files[0]) {
      this.setState({ ImageLink: URL.createObjectURL(event.target.files[0]) })
      this.setState({ ImageName: event.target.files[0].name })
      this.setState({ ImageFile: event.target.files[0] })
    }
  }

  onChangeVideo = (event) => {
    if (event.target.files[0]) {
      this.setState({ VideoName: event.target.files[0].name })
      this.setState({ VideoFile: event.target.files[0] })
    }
  }

  render() {

    return (
      <div className="animated fadeIn">
        {(this.state.loaderFlag != false) && (localStorage.getItem("editPlanItemUUID") != "") &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            >
            </div>
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
        <Link to="/programs/plans" >
          <span>Plans</span> &nbsp;
        </Link>/ &nbsp; Create New Plan
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            {/* <h2> Challenge Details </h2> */}
            {/* {this.props.match.params.id} */}
            <CRow>
              <CCol lg={4}>
                <img src={this.state.ImageLink} width="100%" id="image" />
                <input id="myInput" type="file" ref={(ref) => this.myInput1 = ref} style={{ display: 'none' }} onChange={this.onChangeImage} />
                <br /><br />
                <CButton color="info" style={{ width: '90%', display: 'block', margin: '0 auto' }} onClick={(e) => this.myInput1.click()}>Edit Graphic</CButton>
              </CCol>
              <CCol lg={8}>
                <CInput className="form-control" id="bcc2" type="email" placeholder="Plan Name" value={this.state.Title} onChange={this.onChangeTitle} /><br />
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="5"
                  placeholder="description"
                  value={this.state.Description}
                  onChange={this.onChangeDescription}
                />
                <CFormText className="help-block">300 characters max</CFormText><br />

                <CRow>
                  <CCol lg={8}>
                    <input id="myInput" type="file" ref={(ref) => this.myInput4 = ref} style={{ display: 'none' }} onChange={this.onChangeVideo} />
                    <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.VideoName} onClick={(e) => this.myInput4.click()} />
                  </CCol>
                  <CCol lg={4}>
                    <CButton type="button" color="info" onClick={(e) => this.myInput4.click()} style={{ float: 'right' }}>Upload Video</CButton>
                  </CCol>
                </CRow><br />

                <CRow>
                  <CCol lg={6}>
                    Public
                <CSelect custom name="select" id="select" value={this.state.publicType} onChange={this.onChangePublicType} >
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </CSelect>
                  </CCol>
                </CRow>

                <br />
              </CCol>
            </CRow>
          </CCol>
          <CCol lg={5}>
            {(localStorage.getItem("editPlanItemUUID") != "") &&
              <div style={{ float: 'right' }}>
                <div style={{ display: 'inline-block' }}><CButton color="danger" style={{ float: 'right' }} onClick={this.onRemovePlan} >Remove </CButton></div>
                <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="info" style={{ float: 'right' }} onClick={this.onUpdatePlan}  >Save Changes </CButton></div>
              </div>
            }
            {(localStorage.getItem("editPlanItemUUID") == "") &&
              <div style={{ float: 'right' }}>
                <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="info" style={{ float: 'right' }} onClick={this.onCreatePlan}  >Save Plan </CButton></div>
              </div>
            }

          </CCol>
          {/* <CCol lg={1}><CButton color="danger" style={{ float: 'right' }} >Remove </CButton></CCol>
          <CCol lg={2}><CButton color="info" style={{ float: 'right' }} >Save Changes </CButton></CCol> */}
          <CCol lg={1}>&nbsp;</CCol>
        </CRow>
      </div>
    )
  }
}

export default NewPlan;
