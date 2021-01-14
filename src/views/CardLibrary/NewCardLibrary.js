import React, { Component } from 'react';
import { CModal, CModalBody, CListGroup, CListGroupItem, CInputGroupPrepend, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CFormGroup, CInputRadio, CLabel, CInputGroup, CInputGroupAppend, CBadge, CTextarea, CFormText, CSelect } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';

import { Link } from 'react-router-dom';

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import CardLibraryData from './CardLibraryData'
import preview_image from '../../assets/img/upload_preview.png'
import Check_icon from '../../assets/img/Check_icon.png';

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

class NewCardLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendUserData: [],
      ThumbnailBase: null,
      ThumbnailBaseName: preview_image,
      videoFileUrlBase: null,
      videoFileUrlBaseName: "",
      videoFileUrlEasier: null,
      videoFileUrlEasierName: "",
      videoFileUrlHarder: null,
      videoFileUrlHarderName: "",
      audioFileUrlBase: null,
      audioFileUrlBaseName: "",
      audioFileUrlEasier: null,
      audioFileUrlEasierName: "",
      audioFileUrlHarder: null,
      audioFileUrlHarderName: "",
      BaseExerciseName: "",
      BaseExerciseDescription: "",
      EasierExerciseName: "",
      EasierExerciseDescription: "",
      HardExerciseName: "",
      HardExerciseDescription: "",
      CardType: "",
      ExerciseTags: ["exercise", "video", "note", "rest"],
      loaderFlag: true,
    }
  }

  componentDidMount = () => {
    // let { ExerciseCardSearchArray } = this.state
    // CardLibraryData.map(item => {
    //   item.showImageFlag = false;
    // })
    // ExerciseCardSearchArray = CardLibraryData;
    // console.log("ExerciseCardSearchArray:", ExerciseCardSearchArray)
    // this.setState({ ExerciseCardSearchArray })
    console.log(localStorage.getItem("cardCollectionExerciseUrlID"))
    console.log(localStorage.getItem("CardExerciseUUID"))
    if (localStorage.getItem("CardExerciseUUID") != "") {
      let { loaderFlag, BackendUserData, ThumbnailBase, ThumbnailBaseName, videoFileUrlBase, videoFileUrlBaseName, videoFileUrlEasier, videoFileUrlEasierName, videoFileUrlHarder, videoFileUrlHarderName, audioFileUrlBase, audioFileUrlBaseName, audioFileUrlEasier, audioFileUrlEasierName, audioFileUrlHarder, audioFileUrlHarderName, BaseExerciseName, BaseExerciseDescription, EasierExerciseName, EasierExerciseDescription, HardExerciseName, HardExerciseDescription, CardType } = this.state;
      let url = Config.host + Config.Cards.Cards_CRUD_Url + "/" + localStorage.getItem("cardCollectionExerciseUrlID");
      ApiService.apiCall('get', url, {}, (res) => {
        try {
          if (res.data.status == 200) {
            BackendUserData = res.data.data
            BackendUserData.exercisesData.map(item => {
              if (item.id == localStorage.getItem("CardExerciseUUID")) {
                // ThumbnailBase = item.ThumbnailBase
                ThumbnailBaseName = Config.host + "/static/media/" + item.BaseThumbnail_fileName
                // videoFileUrlBase = item.ThumbnailBase
                videoFileUrlBaseName = item.BaseVideo_fileName
                // videoFileUrlEasier = item.ThumbnailBase
                videoFileUrlEasierName = item.EasierVideo_fileName
                // videoFileUrlHarder = item.ThumbnailBase
                videoFileUrlHarderName = item.HardVideo_fileName
                // audioFileUrlBase = item.ThumbnailBase
                audioFileUrlBaseName = item.BaseAudio_fileName
                // audioFileUrlEasier = item.ThumbnailBase
                audioFileUrlEasierName = item.EasierAudio_fileName
                // audioFileUrlHarder = item.ThumbnailBase
                audioFileUrlHarderName = item.HardAudio_fileName
                BaseExerciseName = item.exerciseName
                BaseExerciseDescription = item.exerciseDescription
                EasierExerciseName = item.EasierExerciseName
                EasierExerciseDescription = item.EasierExerciseDescription
                HardExerciseName = item.HardExerciseName
                HardExerciseDescription = item.HardExerciseDescription
                CardType = item.exerciseTag
              }
            })
            console.log("BackendUserData:", BackendUserData)
            loaderFlag = false
            this.setState({ loaderFlag, BackendUserData, ThumbnailBase, ThumbnailBaseName, videoFileUrlBase, videoFileUrlBaseName, videoFileUrlEasier, videoFileUrlEasierName, videoFileUrlHarder, videoFileUrlHarderName, audioFileUrlBase, audioFileUrlBaseName, audioFileUrlEasier, audioFileUrlEasierName, audioFileUrlHarder, audioFileUrlHarderName, BaseExerciseName, BaseExerciseDescription, EasierExerciseName, EasierExerciseDescription, HardExerciseName, HardExerciseDescription, CardType })
          } else {
            console.log("api call failed.")
          }
        } catch (error) {
          console.log("error :", error);
        }
      })
    }


  }
  onCreate = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to create this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (localStorage.getItem("CardExerciseUUID") != "") {
              let url = Config.host + Config.Cards.Cards_add_exercise_data_Url;
              let formData = new FormData();
              formData.set("editCardID", localStorage.getItem("cardCollectionExerciseUrlID"));
              formData.set("editCardExerciseID", localStorage.getItem("CardExerciseUUID"));
              if(this.state.ThumbnailBase != null){formData.append("BaseThumbnail", this.state.ThumbnailBase);}
              if(this.state.videoFileUrlBase != null){formData.append("BaseVideo", this.state.videoFileUrlBase);}
              if(this.state.audioFileUrlBase != null){formData.append("BaseAudio", this.state.audioFileUrlBase);}
              if(this.state.videoFileUrlEasier != null){formData.append("EasierVideo", this.state.videoFileUrlEasier);}
              if(this.state.audioFileUrlEasier != null){formData.append("EasierAudio", this.state.audioFileUrlEasier);}
              if(this.state.videoFileUrlHarder != null){formData.append("HardVideo", this.state.videoFileUrlHarder);}
              if(this.state.audioFileUrlHarder != null){formData.append("HardAudio", this.state.audioFileUrlHarder);}
              if(this.state.BaseExerciseName != ""){formData.append("exerciseName", this.state.BaseExerciseName);}
              if(this.state.BaseExerciseDescription != ""){formData.append("exerciseDescription", this.state.BaseExerciseDescription);}
              if(this.state.CardType != ""){formData.append("exerciseTag", this.state.CardType);}
              if(this.state.EasierExerciseName != ""){formData.append("EasierExerciseName", this.state.EasierExerciseName);}
              if(this.state.EasierExerciseDescription != ""){formData.append("EasierExerciseDescription", this.state.EasierExerciseDescription);}
              if(this.state.HardExerciseName != ""){formData.append("HardExerciseName", this.state.HardExerciseName);}
              if(this.state.HardExerciseDescription != ""){formData.append("HardExerciseDescription", this.state.HardExerciseDescription);}
              ApiService.apiCall('patch', url, formData, (res) => {
                try {
                  if (res.data.status == 200) {
                    alert("this exercise is updated !")
                    this.props.history.push(`/CardLibrarys/${localStorage.getItem("cardCollectionExerciseUrlID")}`)
                  } else {
                    alert("this request failed !")
                  }
                } catch (error) {
                  console.log("error:", error)
                }
              })
            } else {
              if (this.state.BaseExerciseName != "" && this.state.BaseExerciseDescription != "") {
                let url = Config.host + Config.Cards.Cards_add_exercise_data_Url;
                let formData = new FormData();
                formData.append("BaseThumbnail", this.state.ThumbnailBase);
                formData.append("BaseVideo", this.state.videoFileUrlBase);
                formData.append("BaseAudio", this.state.audioFileUrlBase);
                formData.append("EasierVideo", this.state.videoFileUrlEasier);
                formData.append("EasierAudio", this.state.audioFileUrlEasier);
                formData.append("HardVideo", this.state.videoFileUrlHarder);
                formData.append("HardAudio", this.state.audioFileUrlHarder);
                formData.set("editID", localStorage.getItem("cardCollectionExerciseUrlID"));
                formData.set("exerciseName", this.state.BaseExerciseName);
                formData.set("exerciseDescription", this.state.BaseExerciseDescription);
                formData.set("exerciseTag", this.state.CardType);
                formData.set("EasierExerciseName", this.state.EasierExerciseName);
                formData.set("EasierExerciseDescription", this.state.EasierExerciseDescription);
                formData.set("HardExerciseName", this.state.HardExerciseName);
                formData.set("HardExerciseDescription", this.state.HardExerciseDescription);
                ApiService.apiCall('post', url, formData, (res) => {
                  try {
                    if (res.data.status == 200) {
                      alert("this exercise is created !")
                      this.props.history.push(`/CardLibrarys/${localStorage.getItem("cardCollectionExerciseUrlID")}`)
                    } else {
                      alert("this request failed !")
                    }
                  } catch (error) {
                    console.log("error:", error)
                  }
                })
              } else {
                alert("please input all data")
              }
            }


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

  onChangeBaseExerciseName = (e) => { this.setState({ BaseExerciseName: e.target.value }) }
  onChangeBaseExerciseDescription = (e) => { this.setState({ BaseExerciseDescription: e.target.value }) }
  onChangeEasierExerciseName = (e) => { this.setState({ EasierExerciseName: e.target.value }) }
  onChangeEasierExerciseDescription = (e) => { this.setState({ EasierExerciseDescription: e.target.value }) }
  onChangeHardExerciseName = (e) => { this.setState({ HardExerciseName: e.target.value }) }
  onChangeHardExerciseDescription = (e) => { this.setState({ HardExerciseDescription: e.target.value }) }
  onChangeCardType = (e) => {
    this.setState({ CardType: e.target.value })
    console.log("cardType:", e.target.value)
  }

  changeThumbnail = (event) => {
    if (event.target.files[0]) {
      this.setState({ ThumbnailBaseName: URL.createObjectURL(event.target.files[0]) })
      this.setState({ ThumbnailBase: event.target.files[0] })
    }
  }

  changVideoFileBase = (event) => {
    if (event.target.files[0]) {
      this.setState({ videoFileUrlBase: event.target.files[0] })
      this.setState({ videoFileUrlBaseName: event.target.files[0].name })
    }
  }

  changVideoFileEasier = (event) => {
    if (event.target.files[0]) {
      this.setState({ videoFileUrlEasier: event.target.files[0] })
      this.setState({ videoFileUrlEasierName: event.target.files[0].name })
    }
  }

  changVideoFileHarder = (event) => {
    if (event.target.files[0]) {
      this.setState({ videoFileUrlHarder: event.target.files[0] })
      this.setState({ videoFileUrlHarderName: event.target.files[0].name })
    }
  }

  changeAudioFileBase = (event) => {
    if (event.target.files[0]) {
      this.setState({ audioFileUrlBase: event.target.files[0] })
      this.setState({ audioFileUrlBaseName: event.target.files[0].name })
    }
  }

  changeAudioFileEasier = (event) => {
    if (event.target.files[0]) {
      this.setState({ audioFileUrlEasier: event.target.files[0] })
      this.setState({ audioFileUrlEasierName: event.target.files[0].name })
    }
  }

  changeAudioFileHarder = (event) => {
    if (event.target.files[0]) {
      this.setState({ audioFileUrlHarder: event.target.files[0] })
      this.setState({ audioFileUrlHarderName: event.target.files[0].name })
    }
  }


  render() {

    return (
      <div className="animated fadeIn">
        {(this.state.loaderFlag != false) && (localStorage.getItem("CardExerciseUUID") != "") &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            >
            </div>
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
        <Link to="/CardLibrarys" >
          <span>Card Collections</span> &nbsp;
        </Link>/ &nbsp;

        <Link to={(`/CardLibrarys/${localStorage.getItem("cardCollectionExerciseUrlID")}`)} >
          <span>{this.props.match.params.id}</span> &nbsp;
        </Link>/ &nbsp;
        {(localStorage.getItem("CardExerciseUUID") != "") && <span>Edit Exercise</span>}
        {(localStorage.getItem("CardExerciseUUID") == "") && <span>Create New </span>}
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            <h2>
              {(localStorage.getItem("CardExerciseUUID") != "") && <span>Edit Exercise</span>}
              {(localStorage.getItem("CardExerciseUUID") == "") && <span> Create New Exercise </span>}

              {/* {this.props.match.params.id} */}
            </h2>
          </CCol>
          <CCol lg={5}><CButton color="info" style={{ float: 'right' }} onClick={this.onCreate}>
            {(localStorage.getItem("CardExerciseUUID") != "") && <span>Save Change</span>}
            {(localStorage.getItem("CardExerciseUUID") == "") && <span>Create New </span>}
          </CButton></CCol>
          <CCol lg={1}>&nbsp;</CCol>
        </CRow>

        <CRow>
          <CCol lg={2}>
            <img src={this.state.ThumbnailBaseName} width="100%" /><br /><br />
            <input id="myInput" type="file" ref={(ref) => this.myInput1 = ref} style={{ display: 'none' }} onChange={this.changeThumbnail} />
            <CButton color="info" style={{ width: '90%', display: 'block', margin: '0 auto' }} onClick={(e) => this.myInput1.click()}>Change Thumbnail</CButton>
          </CCol>
          <CCol lg={7}>
            <CRow>
              <CCol lg={6}>
                <input id="myInput" type="file" ref={(ref) => this.myInput2 = ref} style={{ display: 'none' }} onChange={this.changVideoFileBase} />
                <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.videoFileUrlBaseName} onClick={(e) => this.myInput2.click()} />
              </CCol>
              <CCol lg={3}>
                <CButton type="button" color="info" onClick={(e) => this.myInput2.click()} style={{ float: 'right' }}>Upload Video</CButton>
              </CCol>
            </CRow>
            <br />
            <CRow>
              <CCol lg={9}>
                <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" value={this.state.BaseExerciseName} onChange={this.onChangeBaseExerciseName} />
              </CCol>
              <CCol lg={3}>
                <CSelect custom name="select" id="select" value={this.state.CardType} onChange={this.onChangeCardType} >
                  {
                    this.state.ExerciseTags.map((item, key) => {
                      return (
                        <option value={item} key={key}>{item}</option>
                      )
                    })
                  }
                </CSelect>
              </CCol>
            </CRow>
            <br />
            <CRow>
              <CCol lg={9}>
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="5"
                  placeholder="description"
                  onChange={this.onChangeBaseExerciseDescription}
                  value={this.state.BaseExerciseDescription}
                />
                <CFormText className="help-block">300 characters max</CFormText>
              </CCol>
            </CRow>
            <br />
            <CRow>
              <CCol lg={6}>
                <input id="myInput" type="file" ref={(ref) => this.myInput3 = ref} style={{ display: 'none' }} onChange={this.changeAudioFileBase} />
                <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.audioFileUrlBaseName} onClick={(e) => this.myInput3.click()} />
              </CCol>
              <CCol lg={3}>
                <CButton type="button" color="info" onClick={(e) => this.myInput3.click()} style={{ float: 'right' }}>Upload Audio</CButton>
              </CCol>
            </CRow>
            <br />
          </CCol>

          <CCol lg={12} style={{ marginTop: "3%", marginLeft: "35px" }}>
            <CRow>
              <CCol lg={4}>
                <h2>Easier Variation</h2>
                <CRow>
                  <CCol lg={12}>
                    <CRow>
                      <CCol lg={8}>
                        <input id="myInput" type="file" ref={(ref) => this.myInput4 = ref} style={{ display: 'none' }} onChange={this.changVideoFileEasier} />
                        <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.videoFileUrlEasierName} onClick={(e) => this.myInput4.click()} />
                      </CCol>
                      <CCol lg={4}>
                        <CButton type="button" color="info" onClick={(e) => this.myInput4.click()} style={{ float: 'right' }}>Upload Video</CButton>
                      </CCol>
                    </CRow>
                    <br />
                    <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" value={this.state.EasierExerciseName} onChange={this.onChangeEasierExerciseName} />
                    <br />
                    <CRow>
                      <CCol lg={12}>
                        <CTextarea
                          name="textarea-input"
                          id="textarea-input"
                          rows="5"
                          placeholder="description"
                          onChange={this.onChangeEasierExerciseDescription}
                          value={this.state.EasierExerciseDescription}
                        />
                        <CFormText className="help-block">300 characters max</CFormText>
                      </CCol>
                    </CRow>
                    <br />
                    <CRow>
                      <CCol lg={8}>
                        <input id="myInput" type="file" ref={(ref) => this.myInput5 = ref} style={{ display: 'none' }} onChange={this.changeAudioFileEasier} />
                        <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.audioFileUrlEasierName} onClick={(e) => this.myInput5.click()} />
                      </CCol>
                      <CCol lg={4}>
                        <CButton type="button" color="info" onClick={(e) => this.myInput5.click()} style={{ float: 'right' }}>Upload Audio</CButton>
                      </CCol>
                    </CRow>
                    <br />
                  </CCol>
                </CRow>
              </CCol>
              <CCol lg={4} style={{ marginLeft: "50px" }}>
                <h2>Harder Variation</h2>
                <CRow>
                  <CCol lg={12}>
                    <CRow>
                      <CCol lg={8}>
                        <input id="myInput" type="file" ref={(ref) => this.myInput6 = ref} style={{ display: 'none' }} onChange={this.changVideoFileHarder} />
                        <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.videoFileUrlHarderName} onClick={(e) => this.myInput6.click()} />
                      </CCol>
                      <CCol lg={4}>
                        <CButton type="button" color="info" onClick={(e) => this.myInput6.click()} style={{ float: 'right' }}>Upload Video</CButton>
                      </CCol>
                    </CRow>
                    <br />
                    <CInput className="form-control" id="bcc2" type="email" placeholder="challenge Name" value={this.state.HardExerciseName} onChange={this.onChangeHardExerciseName} />
                    <br />
                    <CRow>
                      <CCol lg={12}>
                        <CTextarea
                          name="textarea-input"
                          id="textarea-input"
                          rows="5"
                          placeholder="description"
                          onChange={this.onChangeHardExerciseDescription}
                          value={this.state.HardExerciseDescription}
                        />
                        <CFormText className="help-block">300 characters max</CFormText>
                      </CCol>
                    </CRow>
                    <br />
                    <CRow>
                      <CCol lg={8}>
                        <input id="myInput" type="file" ref={(ref) => this.myInput7 = ref} style={{ display: 'none' }} onChange={this.changeAudioFileHarder} />
                        <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" value={this.state.audioFileUrlHarderName} onClick={(e) => this.myInput7.click()} />
                      </CCol>
                      <CCol lg={4}>
                        <CButton type="button" color="info" onClick={(e) => this.myInput7.click()} style={{ float: 'right' }}>Upload Audio</CButton>
                      </CCol>
                    </CRow>
                    <br />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default NewCardLibrary;
