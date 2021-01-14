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

import ChallengesData from './ChallengesData'
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

class NewChallenge extends Component {
  constructor(props) {
    super(props)
    var date = new Date();
    var inputDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getDay()
    this.state = {
      BackendPlanData: [],
      VersionData: [],
      plan: null,
      version: null,
      ImageUrl: preview_image,
      image: null,
      challengeTitle: "",
      description: "",
      startDate: inputDate,
      host: "dash",
      scheduleDate: "30",
      featured: "no",
      publicType: "no",
    }
  }

  componentDidMount = () => {
    let { BackendPlanData, plan, version, VersionData } = this.state;
    let url = Config.host + Config.Plan.Plans_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          res.data.data.map(item => {
            if (item.status == "current") {
              BackendPlanData.push(item)
            }
          })
          plan = BackendPlanData[0].title

          BackendPlanData.map((item, idx) => {
            if (item.title == plan) {
              VersionData.push(...item.planTypeData);
            }
          })
          if (VersionData.length < 2 && VersionData.length > 0) {
            console.log("no")
            version = VersionData[0].version;
          }
          console.log("VersionData:", VersionData)
          plan = null;
          version = null;
          this.setState({ BackendPlanData, plan, version, VersionData })
        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("api call failed.", error)

        console.log("error :", error);
      }
    })

    // let { users, userDetails, startDate, plan, ActiveDate, version, featured } = this.state;
    // users = ChallengesData.find(user => user.id.toString() === this.props.match.params.id)

    // userDetails = users ? users : [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
    // if (users) {
    //   startDate = users.startDate;
    //   plan = users.plan;
    //   ActiveDate = users.ActiveDate;
    //   version = users.version;
    //   featured = users.featured;
    // }
    // this.setState({ users, userDetails, startDate, plan, ActiveDate, version, featured })

  }
  onCreate = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to create this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Challenges.Challenges_CRUD_Url;
            let formData = new FormData();
            formData.append("challengeBGImage", this.state.image);
            formData.set("createdBy", sessionStorage.getItem('user_ID'));
            formData.set("title", this.state.challengeTitle);
            formData.set("description", this.state.description);
            formData.set("startDate", this.state.startDate);
            formData.set("scheduleDate", this.state.scheduleDate);
            formData.set("Host", this.state.host);
            formData.set("Plan", this.state.plan);
            formData.set("PlanID", localStorage.getItem("PlanUUID_For_Challenges"));
            formData.set("Version", this.state.version);
            formData.set("accessType", this.state.publicType);
            formData.set("Featured", this.state.featured);

            ApiService.apiCall('post', url, formData, (res) => {
              try {
                if (res.data.status == 200) {
                  if (localStorage.getItem("PlanUUID_For_Challenges") != null) {
                    let url2 = Config.host + Config.Plan.Plans_CRUD_Url;
                    let formData2 = new FormData();
                    formData2.append("picture", null);
                    formData2.append("video", null);
                    formData2.set("editID", localStorage.getItem("PlanUUID_For_Challenges"));
                    formData2.set("totalCreations", "true");
                    // let data = {
                    //   editID: localStorage.getItem("PlanUUID_For_Challenges"),
                    //   totalCreations: "true"
                    // }
                    ApiService.apiCall('patch', url2, formData2, (res2) => {
                      try {
                        if (res2.data.status == 200) {
                          alert("this data is created !")
                          this.props.history.push(`/Challenges`)

                        } else {
                          alert("request failed !")
                        }
                      } catch (error) {
                        console.log("error:", error)
                      }
                    })
                  }
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


  onChangeStartDate = (e) => { this.setState({ startDate: e.target.value }) }
  onChangePlan = (e) => {
    let { plan, VersionData, version, BackendPlanData } = this.state;
    VersionData = []
    plan = e.target.value;
    BackendPlanData.map((item, idx) => {
      if (item.title == plan) {
        VersionData.push(...item.planTypeData);
        localStorage.setItem("PlanUUID_For_Challenges", item._id)
      }
    })
    if (VersionData.length < 2 && VersionData.length > 0) {
      console.log("no")
      version = VersionData[0].version;
    }
    this.setState({ plan, version, VersionData })
  }
  onChangescheduleDate = (e) => { this.setState({ scheduleDate: e.target.value }) }
  onChangeVersion = (e) => { this.setState({ version: e.target.value }) }
  onChangeDateFeatured = (e) => { this.setState({ featured: e.target.value }) }
  onChangePublic = (e) => { this.setState({ publicType: e.target.value }) }
  onChangeChallengeTitle = (e) => { this.setState({ challengeTitle: e.target.value }) }
  onChangeDescription = (e) => { this.setState({ description: e.target.value }) }
  onChangeHost = (e) => { this.setState({ host: e.target.value }) }
  changemainimage = (event) => {
    // this.setState({ ImageUrl: URL.createObjectURL(event.target.files[0]) })
    if (event.target.files[0]) {
      this.setState({ ImageUrl: URL.createObjectURL(event.target.files[0]) })
      this.setState({ image: event.target.files[0] })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Link to="/Challenges" >
          <span>Challenges</span> &nbsp;
        </Link>/ &nbsp; Create New Challenge
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            <h2> Create New Challenge</h2>
          </CCol>
          <CCol lg={5}><CButton color="info" style={{ float: 'right' }} onClick={this.onCreate}>Create New </CButton></CCol>
          <CCol lg={1}>&nbsp;</CCol>
        </CRow>

        <CRow>
          <CCol lg={2}>
            <img src={this.state.ImageUrl} width="100%" height="250px" />
            <input id="myInput" type="file" ref={(ref) => this.myInput1 = ref} style={{ display: 'none' }} onChange={this.changemainimage} /><br /><br />
            <CButton color="info" style={{ width: '90%', display: 'block', margin: '0 auto' }} onClick={(e) => this.myInput1.click()}>Upload Graphic</CButton>
          </CCol>
          <CCol lg={4}>
            <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" onChange={this.onChangeChallengeTitle} /><br />
            <CTextarea
              name="textarea-input"
              id="textarea-input"
              rows="5"
              placeholder="description"
              onChange={this.onChangeDescription}
            />
            <CFormText className="help-block">300 characters max</CFormText>
            <div  >
              <div style={{ display: 'inline-block' }}>Hosted by</div>
              <div style={{ display: 'inline-block' }}>
                <CSelect custom name="select" id="select" style={{ color: '#33adff' }} onChange={this.onChangeHost}>
                  <option value="Dash">Dash</option>
                  <option value="Dash1">Dash1</option>
                  <option value="Dash2">Dash2</option>
                  <option value="Dash3">Dash3</option>
                </CSelect>
              </div>
            </div>
          </CCol>
          <CCol lg={1}>&nbsp;</CCol>
          <CCol lg={4}  >
            <div style={{ marginTop: "20px" }}>
              <span style={{ float: 'right' }}>Last 14 Days</span><br />
              <div style={{ float: 'right' }} >
                <div style={{ display: 'inline-block' }}>
                  <CCallout color="info">
                    <p >New Sign-Ups<br />0</p>
                  </CCallout>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <CCallout color="danger">
                    <p>Left Challenge<br />0</p>
                  </CCallout>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <CCallout color="warning">
                    <p>Challenge View<br />0</p>
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
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={this.onChangeStartDate} />
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol lg={2}>
                Plan
                <CSelect custom name="select" id="select" onChange={this.onChangePlan} >
                  <option  disabled selected>Please select</option>
                  {
                    this.state.BackendPlanData.map((item, idx) => {
                      return (
                        <option value={item.title} key={idx}>{item.title}</option>
                      )
                    })
                  }
                </CSelect>
              </CCol>
              <CCol lg={2}>
                Public
                <CSelect custom name="select" id="select" onChange={this.onChangePublic} >
                  <option  disabled selected>Please select</option>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </CSelect>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={2}>
                Duration
                <CSelect custom name="select" id="select" onChange={this.onChangescheduleDate} >
                  <option   disabled selected>Please select</option>
                  <option value="30">30 days</option>
                  <option value="20">20 days</option>
                  <option value="15">15 days</option>
                </CSelect>
              </CCol>
              <CCol lg={2}>
                Version
                <CSelect custom name="select" id="select" onChange={this.onChangeVersion}>
                  <option   disabled selected>Please select</option>
                  {
                    this.state.VersionData.map((item, idx) => {
                      return (
                        <option value={item.version} key={idx}>{item.version + ".0"}</option>
                      )
                    })
                  }
                </CSelect>
              </CCol>
              <CCol lg={2}>
                Featured
                <CSelect custom name="select" id="select" onChange={this.onChangeDateFeatured} >
                  <option   disabled selected>Please select</option>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </CSelect>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <br />
      </div>
    )
  }
}

export default NewChallenge;
