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

// import ChallengesData from './ChallengesData'
import preview_image from '../../assets/img/upload_preview.png'
import line1 from '../../assets/img/line1.png'
import line2 from '../../assets/img/line2.png'
import line3 from '../../assets/img/line3.png'

const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

class Challenge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      BackendUserData: [],
      BackendPlanData: [],
      VersionData: [],
      startDate: "",
      plan: "",
      activeDate: "",
      version: "",
      featured: "",
      publicType: "",
      challengeTitle: "",
      description: "",
      signUps: "",
      leftChallenge: "",
      challengeView: "",
      changeImage: null,
      challengeImage: "",
      challengeImageLink: "",
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    let { BackendUserData, loaderFlag, BackendPlanData, VersionData, users, startDate, plan, activeDate, version, featured, publicType, challengeTitle, description, signUps, leftChallenge, challengeView, challengeImage, challengeImageLink } = this.state;

    let url = Config.host + Config.Challenges.Challenges_CRUD_Url + "/" + this.props.match.params.id;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data
          // users = BackendUserData.find(user => user._id.toString() === this.props.match.params.id)
          users = BackendUserData;
          if (users) {
            startDate = users.startDate;
            plan = users.Plan;
            activeDate = users.ActiveDate;
            version = users.Version;
            featured = users.Featured;
            publicType = users.accessType;
            challengeTitle = users.title;
            description = users.description;
            signUps = users.signUps;
            leftChallenge = users.leftChallenge;
            challengeView = users.challengeView;
            challengeImage = users.challengeBGImage;
            challengeImageLink = Config.host + "/static/media/" + users.challengeBGImage;
          }

          let url2 = Config.host + Config.Plan.Plans_CRUD_Url;
          ApiService.apiCall('get', url2, {}, (res) => {
            try {
              if (res.data.status == 200) {
                BackendPlanData = res.data.data

                BackendPlanData.map((item, idx) => {
                  if (item.title == plan) {
                    VersionData.push(...item.planTypeData);
                  }
                })
                console.log("VersionData:", VersionData)

                // if(VersionData.length < 2 && VersionData.length > 0){
                //   console.log("no")
                //   version = VersionData[0].version;
                // }

                loaderFlag = false
                this.setState({ BackendUserData, loaderFlag, BackendPlanData, VersionData, users, startDate, plan, activeDate, version, featured, publicType, challengeTitle, description, signUps, leftChallenge, challengeView, challengeImage, challengeImageLink })

              } else {
                console.log("api call failed.")
              }
            } catch (error) {
              console.log("api call failed.", error)

              console.log("error :", error);
            }
          })

        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("error :", error);
      }
    })
  }

  onRemoveChallenges = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to remove this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Challenges.Challenges_CRUD_Url;
            let formData = new FormData();
            // if (this.state.changeImage != null) { formData.append("challengeBGImage", this.state.changeImage); }
            formData.set("editID", this.props.match.params.id);
            formData.set("status", "remove");
            // formData.set("description", this.state.description);
            // formData.set("startDate", this.state.startDate);
            // formData.set("ActiveDate", this.state.activeDate);
            // formData.set("Plan", this.state.plan);
            // formData.set("Version", this.state.version);
            // formData.set("accessType", this.state.publicType);
            // formData.set("Featured", this.state.featured);
            ApiService.apiCall('patch', url, formData, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data is removed !")
                  this.props.history.push(`/Challenges`)
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

  onUpdateChallenges = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to update this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Challenges.Challenges_CRUD_Url;
            let formData = new FormData();
            if (this.state.changeImage != null) { formData.append("challengeBGImage", this.state.changeImage); }
            formData.set("editID", this.props.match.params.id);
            formData.set("title", this.state.challengeTitle);
            formData.set("description", this.state.description);
            formData.set("startDate", this.state.startDate);
            formData.set("ActiveDate", this.state.activeDate);
            formData.set("Plan", this.state.plan);
            formData.set("Version", this.state.version);
            formData.set("accessType", this.state.publicType);
            formData.set("Featured", this.state.featured);
            ApiService.apiCall('patch', url, formData, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data is updated !")
                  this.props.history.push(`/Challenges`)
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

  onChangeStartDate = (e) => { this.setState({ startDate: e.target.value }) }
  onChangePlan = (e) => { 
    let { plan, version, VersionData, BackendPlanData } = this.state;
    VersionData = []
    plan = e.target.value;
    BackendPlanData.map((item, idx) => {
      if (item.title == plan) {
        VersionData.push(...item.planTypeData);
      }
    })
    if(VersionData.length < 2){
      console.log("no")
      version = VersionData[0].version;
    }
    
    this.setState({ plan, version, VersionData })
   }
  onChangeActiveDate = (e) => { this.setState({ activeDate: e.target.value }) }
  onChangeVersion = (e) => { this.setState({ version: e.target.value }) }
  onChangeDateFeatured = (e) => { this.setState({ featured: e.target.value }) }
  onChangePublic = (e) => { this.setState({ publicType: e.target.value }) }
  onChangeChallengeTitle = (e) => { this.setState({ challengeTitle: e.target.value }) }
  onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
  // onChangeSignUps = (e) => { this.setState({ signUps: e.target.value }) }
  // onChangeLeftChallenge = (e) => { this.setState({ leftChallenge: e.target.value }) }
  // onChangeChallengeView = (e) => { this.setState({ challengeView: e.target.value }) }
  changemainimage = (event) => {
    // this.setState({ challengeImageLink: URL.createObjectURL(event.target.files[0]) })
    if (event.target.files[0]) {
      this.setState({ challengeImageLink: URL.createObjectURL(event.target.files[0]) })
      this.setState({ challengeImage: event.target.files[0].name })
      this.setState({ changeImage: event.target.files[0] })
    }
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
        <Link to="/Challenges" >
          <span>Challenges</span> &nbsp;
        </Link>/ &nbsp; Challenge Details
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            <h2> Challenge Details </h2>
            {/* {this.props.match.params.id} */}
          </CCol>
          <CCol lg={5}>
            <div style={{ float: 'right' }}>
              <div style={{ display: 'inline-block' }}><CButton color="danger" style={{ float: 'right' }} onClick={this.onRemoveChallenges} >Remove </CButton></div>
              <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="info" style={{ float: 'right' }} onClick={this.onUpdateChallenges}  >Save Changes </CButton></div>
            </div>
          </CCol>
          {/* <CCol lg={1}><CButton color="danger" style={{ float: 'right' }} >Remove </CButton></CCol>
          <CCol lg={2}><CButton color="info" style={{ float: 'right' }} >Save Changes </CButton></CCol> */}
          <CCol lg={1}>&nbsp;</CCol>
        </CRow>

        <CRow>
          <CCol lg={2}>
            <img src={this.state.challengeImageLink} width="100%" height="250px" id="image" />
            <input id="myInput" type="file" ref={(ref) => this.myInput1 = ref} style={{ display: 'none' }} onChange={this.changemainimage} />
            <br /><br />
            <CButton color="info" style={{ width: '90%', display: 'block', margin: '0 auto' }} onClick={(e) => this.myInput1.click()}>Edit Graphic</CButton>
          </CCol>
          <CCol lg={4}>
            <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" value={this.state.challengeTitle} onChange={this.onChangeChallengeTitle} /><br />
            <CTextarea
              name="textarea-input"
              id="textarea-input"
              rows="5"
              placeholder="description"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
            <CFormText className="help-block">300 characters max</CFormText><br />
            <CInput className="form-control" id="bcc2" type="email" placeholder="challenge image" value={this.state.challengeImage} disabled /><br />
          </CCol>

          <CCol lg={1}>&nbsp;</CCol>

          <CCol lg={4}  >
            <div style={{ marginTop: "20px" }}>
              <span style={{ float: 'right' }}>Last 14 Days</span><br />
              <div style={{ float: 'right' }} >
                <div style={{ display: 'inline-block' }}>
                  <CCallout color="info">
                    <p >New Sign-Ups<br />{this.state.signUps}</p>
                  </CCallout>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <CCallout color="danger">
                    <p>Left Challenge<br />{this.state.leftChallenge}</p>
                  </CCallout>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <CCallout color="warning">
                    <p>Challenge View<br />{this.state.challengeView}</p>
                  </CCallout>
                </div>
              </div>
            </div>
          </CCol>
          <CCol lg={1}>&nbsp;</CCol>

          <CCol lg={12} style={{ marginTop: "3%", marginLeft: "35px" }}>
            <CRow>
              <CCol lg={2}>
                Start Date
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <CInput type="email" id="date-input" name="date-input" placeholder="date" value={this.state.startDate} onChange={this.onChangeStartDate} disabled/>
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol lg={2}>
                Plan
                {/* <CSelect custom name="select" id="select" value={this.state.plan} onChange={this.onChangePlan}>
                <option value="yes" disabled selected>Please select</option>
                  {
                    this.state.BackendPlanData.map((item, idx) => {
                      return (
                        <option value={item.title}>{item.title}</option>
                      )
                    })
                  }
                </CSelect> */}
                <CInput type="email" id="date-input" name="date-input" placeholder="date" value={this.state.plan} onChange={this.onChangePlan} disabled/>
              </CCol>
              <CCol lg={2}>
                Public
                <CSelect custom name="select" id="select" value={this.state.publicType} onChange={this.onChangePublic} >
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </CSelect>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={2}>
                Active Date
                <CInput type="email" id="date-input" name="date-input" placeholder="date" value={this.state.activeDate} onChange={this.onChangeActiveDate} disabled/>
              </CCol>
              <CCol lg={2}>
                Version
                {/* <CSelect custom name="select" id="select" value={this.state.version} onChange={this.onChangeVersion}>
                <option value="yes" disabled selected>Please select</option>
                  {
                    this.state.VersionData.map((item, idx) => {
                      return (
                        <option value={item.version}>{item.version + ".0"}</option>
                      )
                    })
                  }
                </CSelect> */}
                <CInput type="email" id="date-input" name="date-input" placeholder="date" value={this.state.version} onChange={this.onChangeVersion} disabled/>
              </CCol>
              <CCol lg={2}>
                Featured
                <CSelect custom name="select" id="select" value={this.state.featured} onChange={this.onChangeDateFeatured} >
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </CSelect>
              </CCol>
            </CRow>
          </CCol>
        </CRow>


      </div>
    )
  }
}

export default Challenge;
