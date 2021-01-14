import React, { Component } from 'react';
import { CSelect, CSwitch, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable, CInput, CTextarea, CFormText, CToaster, CToastHeader, CToastBody, CToast, CListGroup, CListGroupItem } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { ReactSortable } from 'react-sortablejs';

import HoverImage from "react-hover-image"

// import PlanVersionData from './PlanVersionData'
// import PlanVersionDayTaskData from './PlanVersionDayTaskData'

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

import './ModalStyle.css'

import ReomveIcon from '../../assets/img/remove.png';
import remove_img from '../../assets/img/remove_img.png';
import exercise_icon from '../../assets/img/exercise_icon.png';
import rest_icon from '../../assets/img/rest_icon.png';
import video_icon from '../../assets/img/video_icon.png';
import challengeImage_icon from '../../assets/img/challengeImage.png';

import drop_drag_icon from '../../assets/img/drop_drag_icon.png';
import remove_exercise from '../../assets/img/remove_exercise.png';


class PlanDrop_test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackendUserData: [],
      beforeId: '',
      title: "",
      editTitle: "",
      description: "",
      editDescription: "",
      version: "",
      toasts: [],
      toastTitle: "",
      toastDescription: "",
      autohide: true,
      autohideValue: 1000,
      closeButton: true,
      fade: true,
      position: 'top-center',
      ImageGalleryCountArray: [],
      modalTitle: false,
      modalImage: false,
      ImageUrl: null,

      VersionDayTaskData: [],
      PlanVersionUUID: "",
      DayDefaultDataCountArray: [],
      taskData: [],
      uniqueId: 0,
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    console.log("PlanDataUUID", localStorage.getItem("PlanDataUUID"))
    let { BackendUserData, loaderFlag,  DayDefaultDataCountArray, VersionDayTaskData, taskData } = this.state;

    let url = Config.host + Config.Plan.Plan_Version_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data
          console.log("res.data:", BackendUserData)

          let newBody = {}

          BackendUserData.map(item => {
            if (item.planTypeVersionID == "plan2020519116913091581286033") {
              console.log("BackendUserData:", item.planVersionDayTaskData)
              item.planVersionDayTaskData.map((itemSub, idxSub)=>{
                itemSub.flag = "exercise" + idxSub;
                itemSub.title = "";
                itemSub.description = "";
                itemSub.file = null;
                itemSub.fileName = "";
                itemSub.Reps = "";
                itemSub.Sets = "";
                itemSub.RepsCount = "";
                itemSub.RestTime = "";
                itemSub.AutoPlay = "checked";
                VersionDayTaskData.push(itemSub)
              })
              // VersionDayTaskData = item.planVersionDayTaskData

              
              for (var i = 1; i < 6; i++) {
                // switch (i) {
                //   case 1:
                //     newBody = {}
                //     newBody.flag = "circuit"
                //     newBody.id = "circuit" + Math.random().toString().replace("0.", "")
                //     DayDefaultDataCountArray.push(newBody)

                //   case 2:
                //     newBody = {}
                //     newBody.flag = "exercise"
                //     newBody.id = "exercise" + Math.random().toString().replace("0.", "")
                //     DayDefaultDataCountArray.push(newBody)

                //   case 3:
                //     newBody = {}
                //     newBody.flag = "video"
                //     newBody.id = "video" + Math.random().toString().replace("0.", "")
                //     DayDefaultDataCountArray.push(newBody)

                //   case 4:
                //     newBody = {}
                //     newBody.flag = "rest"
                //     newBody.id = "rest" + Math.random().toString().replace("0.", "")
                //     DayDefaultDataCountArray.push(newBody)

                //   case 5:
                //     newBody = {}
                //     newBody.flag = "note"
                //     newBody.id = "note" + Math.random().toString().replace("0.", "")
                //     DayDefaultDataCountArray.push(newBody)
                //   default:
                //     console.log("DayDefaultDataCountArray:", DayDefaultDataCountArray)

                // }
                newBody = {}
                newBody.flag = "exercise" + i;
                newBody.id = "exercise" + Math.random().toString().replace("0.", "")
                newBody.title = "";
                newBody.description = "";
                newBody.file = null;
                newBody.fileName = "";
                newBody.Reps = "";
                newBody.Sets = "";
                newBody.RepsCount = "";
                newBody.RestTime = "";
                newBody.AutoPlay = "checked";
                DayDefaultDataCountArray.push(newBody)
                this.setState({
                  ['taskData' + i]: VersionDayTaskData.filter(task => task.versionDay == i)
                })
              }
              this.setState({ uniqueId: VersionDayTaskData.length })
              console.log("DayDefaultDataCountArray:", DayDefaultDataCountArray)
              console.log("VersionDayTaskData:", VersionDayTaskData)

            }

          })

          loaderFlag = false
          this.setState({ BackendUserData, loaderFlag,  DayDefaultDataCountArray, VersionDayTaskData, taskData })


        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("api call failed.", error)
      }
    })


  }



  // onDuplicate = (addItem) => {
  //   let { VersionDayTaskData } = this.state
  //   VersionDayTaskData.push(addItem);
  //   this.setState({ VersionDayTaskData })
  // }   

  onRemoveDayTaskItem = (removeItem, key) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            var dIndex = -1;
            let items = this.getItems(key)
            // console.log("before:", items)
            items.map((item, key) => {
              if (removeItem.taskTitle == item.taskTitle) {
                dIndex = key;
              }
            })
            if (dIndex != -1) {
              items.splice(dIndex, 1);
            }
            // console.log("after:", items)
            this.setState({ ['taskData' + key]: items })
            this.printChange();

          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onDuplicate = (addItem, key) => {
    let { uniqueId } = this.state
    let items = []
    eval("items = this.state.taskData" + key)
    items.push({ ...addItem, id: uniqueId });
    console.log(items)
    uniqueId++
    this.setState({
      uniqueId
    })
    this.setState({ ['taskData' + key]: items })
    this.printChange();
  }

  getItems(key) {
    let items = []
    eval("items = this.state.taskData" + key)
    return items
  }

  printChange = () => {
    // console.log("items:", items)
    // let {taskData } = this.state;
    // this.setState({ ["taskData" + (index + 1)]: newState })
    var date = new Date();
    let newData = [];
    let itemsChanges = []
    this.state.DayDefaultDataCountArray.map((item, idx) => {
      let items = this.getItems(idx + 1)
      // if (items.length != 0) {
      itemsChanges.push(items)
      // }
      // eval("this.state.taskData" + idx)
      // console.log("taskData:", item, idx)
      // console.log("taskData:",  eval("this.state.taskData" + item))
    })
    console.log("itemsChanges:", itemsChanges)

    // itemsChanges.map((item, idx) => {
    //   let newBody = {};
    //   if (item.length != 0) {
    //     // console.log("taskData:", item, idx)
    //     item.map((itemSub, idx2) => {
    //       // console.log("taskData:", itemSub, idx)
    //       newBody = itemSub
    //       newBody.id = "versionDayTask" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "");
    //       newBody.versionDay = idx + 1;
    //       newData.push(newBody)
    //     })
    //   }
    //   // console.log("taskData:", item, idx)
    // })
    // console.log("taskData:", newData)
    // let formData = { editPlanVersionID: this.state.PlanVersionUUID, editAllData: newData };
    // let url = Config.host + Config.Plan.edit_All_planVersionDayTaskData_Url;
    // ApiService.apiCall('patch', url, formData, (res) => {
    //   try {
    //     if (res.data.status == 200) {
    //       console.log("success:", res.data.data)
    //       // alert("this user is created !")
    //       // this.props.history.push(`/CardLibrarys/${localStorage.getItem("cardLibrary_UUID")}`)
    //     } else {
    //       // alert("this request failed !")
    //       console.log("api call failed.")
    //     }
    //   } catch (error) {
    //     console.log("error:", error)
    //   }
    // })

  }

  render() {
    return (
      <div className="animated fadeIn" > 
        <Link to="/programs/plans" >
          <span>Programs</span> &nbsp;
        </Link>/ &nbsp;

        <Link to={(`/programs/Plans/${this.state.beforeId}`)} >
          <span>{this.state.title}</span> &nbsp;
        </Link>/ &nbsp; v{this.state.version}
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            {/* {this.props.match.params.id} */}
            <h2>{this.state.title} &nbsp; / &nbsp; {this.state.version}.0 </h2>
            <span>{this.state.description}</span>
            {/* <CButton color="info" style={{ float: 'right' }}>Change Preseleceted Images </CButton>
            <CButton color="info" style={{ marginRight: '20px' }}>Edit Title/Description </CButton> */}
          </CCol>
          <CCol lg={6}>
            <div style={{ float: 'right' }}><br />
              <div style={{ display: 'inline-block' }}><CButton color="info" style={{ float: 'right' }} onClick={this.toggleImage} >Change Preseleceted Images </CButton></div>
              <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="info" style={{ float: 'right' }} onClick={this.toggleTitle}>Edit Title/Description</CButton></div>
              <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="danger" style={{ float: 'right' }} onClick={this.onRemoveVersion}>Delete Version</CButton></div>
            </div>


          </CCol>

        </CRow>

        <br />
        <React.Fragment>
          <CRow>
            <CCol sm="12" xl="12" style={{ marginBottom: "50px" }}>
              {this.state.DayDefaultDataCountArray && this.state.DayDefaultDataCountArray.map((itemTop, index) => {
                let items = this.getItems(index + 1)
                return (
                  <CListGroup style={{ marginTop: '10px' }}>
                    {(itemTop.flag == "exercise1") && <CListGroupItem style={{ backgroundColor: "#F0F3F5" }} ><h5>Day {index + 1}</h5></CListGroupItem>}

                    <ReactSortable
                      list={items}
                      setList={newState => this.setState({ ["taskData" + (index + 1)]: newState })}
                      group={{ name: "cloning-group-name" }}
                      handle=".handle"
                      animation={150}
                      // onChange={this.printChange.bind(this)}
                      // onMove={this.printChange.bind(this, items)}
                      // onEnd={this.printChange.bind(this, items)}
                      onEnd={this.printChange.bind(this)}
                    >
                      {items && items.map((item, idx) => (
                        <CListGroupItem
                        //  style={{ height: "50px" }}
                        >
                          {(item.flag == "exercise1") && <>
                            <CRow>
                              <CCol lg={1}><img src={this.state.exercise_icon} width="35%" /></CCol>
                              <CCol lg={3} >
                                <CInput type="email" style={{ cursor: "pointer", marginLeft: "-15%" }} placeholder="Exercise Title"
                                // value={item.title} onClick={this.onShowModalExercise.bind(this, item, "one")}
                                />
                              </CCol>
                              <CCol lg={8} >
                                <div style={{ float: 'right' }}>
                                  <div style={{ display: 'inline-block' }}>
                                    <CSelect custom name="select" id="select"
                                    //  value={item.Reps}  onChange={this.onChangeDividesCardReps.bind(this, item)} 
                                    >
                                      <option value="Reps">Reps</option>
                                      <option value="Seconds">Seconds</option>
                                    </CSelect>
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>Sets</div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <CInput type="email" id="date-input" name="date-input" placeholder="4" style={{ width: "70px" }}
                                    //  value={item.Sets} onChange={this.onChangeDividesCardSets.bind(this, item)}
                                    />
                                  </div>

                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rep Count</div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <CInput type="email" id="date-input" name="date-input" placeholder="45" style={{ width: "70px" }}
                                    // value={item.RepsCount}  onChange={this.onChangeDividesCardRepsCount.bind(this, item)} 
                                    />
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rest </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <CSelect custom name="select" id="select" style={{ width: "90px" }}
                                    //  value={item.RestTime}  onChange={this.onChangeDividesCardRestTime.bind(this, item, "exercise")}
                                    >
                                      <option value="5">5 Secs</option>
                                      <option value="10">10 Secs</option>
                                      <option value="15">15 Secs</option>
                                      <option value="20">20 Secs</option>
                                      <option value="30">30 Secs</option>
                                      <option value="45">45 Secs</option>
                                      <option value="60">1 minutes</option>
                                      <option value="90">1 minutes 30 Secs</option>
                                    </CSelect>
                                  </div>

                                  <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                    Auto Play Next Card   </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"}
                                    //  onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "exercise")}
                                    />
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <img style={{ cursor: "pointer", marginBottom: 22, width: "70%" }} src={remove_exercise} />

                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} 
                                  // onClick={this.removeOtherExerciseItem.bind(this, index, "exercise")}
                                  >Del  </CButton> */}
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                  </div>
                                </div>
                              </CCol>
                            </CRow>
                            <br />
                          </>}

                          {(item.flag == "exercise2") && <>
                            <CRow>
                              <CCol lg={1}><img src={this.state.video_icon} width="35%" /></CCol>
                              <CCol lg={4} >
                                <div>
                                  <div style={{ display: 'inline-block', marginLeft: '-15%', width: "100%" }}>
                                    <CInput className="form-control" id="bcc2" type="email" placeholder="Video title" value={item.title}
                                      // onChange={this.onChangeDividesCardTitle.bind(this, item, "video")}
                                       /><br />
                                    <CTextarea
                                      name="textarea-input"
                                      id="textarea-input"
                                      rows="3"
                                      placeholder="Description"
                                      value={item.description}
                                      // onChange={this.onChangeDividesCardDescription.bind(this, item)}
                                    />
                                    <CFormText className="help-block">300 characters max</CFormText>
                                  </div>
                                </div>
                              </CCol>
                              <CCol lg={7}>
                                <div style={{ float: 'right' }}>
                                  <input id="myInput" type="file" ref={(ref) => this.myInput200 = ref} style={{ display: 'none' }}
                                  //  onChange={this.onChangeDividesCardFile.bind(this, item)}
                                    />
                                  <div style={{ display: 'inline-block' }}>
                                    <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" style={{ width: "280px" }} value={item.fileName} onClick={(e) => this.myInput200.click()} />
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <CButton type="button" color="info" onClick={(e) => this.myInput200.click()}>Upload Video</CButton>
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                    Auto Play Next Card  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} 
                                    // onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "video")}
                                     />
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                  <img style={{ cursor: "pointer", marginBottom: 22, width: "70%" }} src={remove_exercise} />
                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} 
                                    onClick={this.removeOtherExerciseItem.bind(this, index, "video")}
                                    >Del  </CButton> */}
                                  </div>
                                  <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                  </div>
                                </div>
                              </CCol>
                            </CRow>
                            <br />
                          </>}



                          <CRow>
                            <CCol lg={4} sm={12}>
                              <h5 style={{ color: '#33adff', cursor: 'pointer' }}  >{item.taskTitle}</h5>
                            </CCol>
                            <CCol lg={8} sm={12}>
                              <div style={{ float: 'right' }}>
                                <div style={{ display: 'inline-block' }}><CButton color="danger" style={{ float: 'right', width: '40%' }} onClick={this.onRemoveDayTaskItem.bind(this, item, index + 1)} ><img src={ReomveIcon} width="15%" />&nbsp;Remove </CButton></div>
                                <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton block variant="ghost" color="info" style={{ float: 'right' }} onClick={this.onDuplicate.bind(this, item, index + 1)}  >Duplicate</CButton></div>
                                <div style={{ display: 'inline-block', marginLeft: '20px' }}><img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} /> </div>
                              </div>
                            </CCol>
                          </CRow>
                        </CListGroupItem>
                      ))}
                    </ReactSortable>

                    {/* <CListGroupItem href="#" style={{ height: "50px" }}
                    // onClick={this.onCreateNewDayTaskCard.bind(this, index + 1)}
                    // onClick={(item, index) => this.props.history.push('/Version/NewTask')}
                    >   +Create Task </CListGroupItem> */}
                  </CListGroup>
                )
              })}

            </CCol>
          </CRow>

        </React.Fragment>

      </div>
    )
  }
}

// export default PlanVersion;
export default withRouter(PlanDrop_test);
