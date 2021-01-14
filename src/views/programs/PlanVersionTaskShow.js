import React, { Component } from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable, CInput, CTextarea, CFormText, CToaster, CToastHeader, CToastBody, CToast, CListGroup, CListGroupItem } from '@coreui/react';
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


class PlanVersionTaskShow extends Component {
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
    let { PlanVersionUUID, BackendUserData, loaderFlag, beforeId, title, version, description, editDescription, DayDefaultDataCountArray, VersionDayTaskData, taskData, editTitle, ImageGalleryCountArray } = this.state;
    let url = Config.host + Config.Plan.Plan_Version_CRUD_Url;
    ApiService.apiCall('get', url, {}, (res) => {
      try {

        if (res.data.status == 200) {
          BackendUserData = res.data.data
          console.log("res.data:", BackendUserData)
          BackendUserData.map(item => {
            if (item.planTypeVersionID == this.props.match.params.id) {
              console.log("BackendUserData:", item.planVersionDayTaskData)
              VersionDayTaskData = item.planVersionDayTaskData
              PlanVersionUUID = item._id;
              console.log("PlanVersionUUID:", PlanVersionUUID)
              for (var i = 1; i < 31; i++) {
                DayDefaultDataCountArray.push(i)
                this.setState({
                  ['taskData' + i]: VersionDayTaskData.filter(task => task.versionDay == i)
                })
              }
              this.setState({ uniqueId: VersionDayTaskData.length })

              let users = item
              if (users) {
                beforeId = users.planVersionID;
                title = localStorage.getItem("PlanDataTitle");
                editTitle = localStorage.getItem("PlanDataTitle");
                description = localStorage.getItem("PlanDataDescription");
                editDescription = localStorage.getItem("PlanDataDescription");
                version = users.version;
                localStorage.setItem("planExerciseID", beforeId)
                localStorage.setItem("planVersionTypeUUID", users.planTypeVersionID)
                localStorage.setItem("planExerciseTitle", title)
                localStorage.setItem("planVersionUUID", users._id)
              }

            }

          })



          for (var i = 1; i < 10; i++) {
            let newObject = {}
            switch (i % 4) {
              case 0:
                newObject.keyID = i
                newObject.image = exercise_icon
                ImageGalleryCountArray.push(newObject);
                break;
              case 1:
                newObject.keyID = i
                newObject.image = rest_icon
                ImageGalleryCountArray.push(newObject);
                break;
              case 2:
                newObject.keyID = i
                newObject.image = video_icon
                ImageGalleryCountArray.push(newObject);
                break;
              case 3:
                newObject.keyID = i
                newObject.image = challengeImage_icon
                ImageGalleryCountArray.push(newObject);
                break;
              default:
                newObject.keyID = i
                newObject.image = challengeImage_icon
                ImageGalleryCountArray.push(newObject);
            }
          }
          console.log("ImageGalleryCountArray:", ImageGalleryCountArray)

          loaderFlag = false
          this.setState({ PlanVersionUUID, BackendUserData, loaderFlag, beforeId, title, version, DayDefaultDataCountArray, description, editDescription, VersionDayTaskData, taskData, editTitle, ImageGalleryCountArray })


        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("api call failed.", error)
      }
    })


    // users = PlanVersionData.find(user => user.id.toString() === this.props.match.params.id)

    // if (users) {
    //   beforeId = users.id;
    //   title = users.title;
    //   version = users.version;
    //   description = users.description;
    //   editTitle = users.title;
    //   localStorage.setItem("planExerciseID", beforeId)
    //   localStorage.setItem("planExerciseTitle", title)
    // }
    // VersionDayTaskData = PlanVersionDayTaskData.filter(user => user.title.toString().indexOf(title) !== -1 && user.version.toString().indexOf(version) !== -1)





  }

  onCreateNewDayTaskCard = (day) => {
    localStorage.setItem("PlanVersionTaskDay", day);
    // localStorage.setItem("PlanVersionTaskDayUUID", taskTitle.id);
    localStorage.setItem("editPlanVersionDayTaskFlag", "")
    localStorage.setItem("editPlanVersionDayTaskTitle", "")
    localStorage.setItem("editPlanVersionDayTaskDescription", "")
    this.props.history.push('/Version/NewTask')
  }

  editTask = (taskTitle, day) => {
    localStorage.setItem("PlanVersionTaskDay", day);
    // localStorage.setItem("PlanVersionTaskDayUUID", taskTitle.id);
    localStorage.setItem("editPlanVersionDayTaskFlag", taskTitle.id)
    localStorage.setItem("editPlanVersionDayTaskTitle", taskTitle.taskTitle)
    localStorage.setItem("editPlanVersionDayTaskDescription", taskTitle.taskTitle)
    this.props.history.push('/Version/NewTask')
  }

  onRefoundConfirm = (removeItem) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            var dIndex = -1;
            let { VersionDayTaskData } = this.state
            console.log("before:", VersionDayTaskData)
            VersionDayTaskData.map((item, key) => {
              if (removeItem.taskTitle == item.taskTitle) {
                dIndex = key;
              }
            })
            if (dIndex != -1) {
              VersionDayTaskData.splice(dIndex, 1);
            }
            console.log("after:", VersionDayTaskData)
            this.setState({ VersionDayTaskData })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  // showModalChangeImage = () => {
  //   this.setState({ showChangeImageModal: true });
  // }
  // hideModalChangeImage = () => {
  //   this.setState({ showChangeImageModal: false });
  //   this.setState({ toastTitle: "Cancel !" });
  //   this.setState({ toastDescription: "Change Image request Cancelled" });
  //   this.state.toasts.push(this.toastConfig)
  //   this.setState({ toasts: this.state.toasts })
  // };

  // showModal = () => {
  //   this.setState({ show: true });
  // };

  // hideModal = () => {
  //   this.setState({ show: false });
  //   this.setState({ toastTitle: "Cancel !" });
  //   this.setState({ toastDescription: "Title/ Description edit Cancelled" });
  //   this.state.toasts.push(this.toastConfig)
  //   this.setState({ toasts: this.state.toasts })
  // };



  onDuplicate = (addItem) => {
    let { VersionDayTaskData } = this.state
    VersionDayTaskData.push(addItem);
    this.setState({ VersionDayTaskData })
  }

  onCreatNewTask = () => {
    console.log("url error")
    this.props.history.push('/programs/Plans/VersionTask/NewDayTask')
  }

  onChangeTitle = (e) => { this.setState({ version: e.target.value }) }
  onChangeDescription = (e) => { this.setState({ editDescription: e.target.value }) }

  toggleTitle = () => {
    this.setState({
      modalTitle: !this.state.modalTitle,
    });
  }

  onChangeVersionName = () => {
    this.setState({ modalTitle: !this.state.modalTitle });
    this.setState({ toastTitle: "Success !" });
    this.setState({ toastDescription: "Title/ Description edit success." });
    this.state.toasts.push(this.toastConfig)
    this.setState({ toasts: this.state.toasts })

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to update this Plan data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url1 = Config.host + Config.Plan.Plans_CRUD_Url;
            let formData1 = new FormData();
            formData1.append("picture", null); 
            formData1.append("video", null); 
            formData1.set("editID", this.state.beforeId);
            formData1.set("description", this.state.editDescription);
            // let data1 = {
            //   editID: this.state.beforeId,
            //   // title: this.state.editTitle,
            //   description: this.state.editDescription
            // }
            ApiService.apiCall('patch', url1, formData1, (res1) => {
              try {
                if (res1.data.status == 200) {
                  // alert("this data is updated !")
                  // this.setState({ title: this.state.editTitle })
                  // this.setState({ description: this.state.editDescription })
                  // this.props.history.push(`/users`)

                  let url = Config.host + Config.Plan.add_Plan_Version_Url;
                  let data = {
                    editID: this.state.beforeId,
                    planTypeDataID : this.props.match.params.id,
                    version : this.state.version
                  }
                  ApiService.apiCall('patch', url, data, (res) => {
                    try {
                      if (res.data.status == 200) {
                        alert("this data is updated !")
                        // this.setState({ title: this.state.editTitle })
                        this.setState({ description: this.state.editDescription })
                        // this.props.history.push(`/users`)

                      } else {
                        alert("this request failed !")
                      }
                    } catch (error) {
                      console.log("error:", error)
                    }
                  })

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

  toggleImage = () => {
    this.setState({
      modalImage: !this.state.modalImage,
    });
  }

  toggleImageSaveAddToast = () => {
    this.setState({ modalImage: !this.state.modalImage });
    this.setState({ toastTitle: "Success !" });
    this.setState({ toastDescription: "IMage edit success." });
    this.state.toasts.push(this.toastConfig)
    this.setState({ toasts: this.state.toasts })
    this.setState({ title: this.state.editTitle })
  }

  changemainimage = (event) => {
    if (event.target.files[0]) {
      this.setState({ ImageUrl: event.target.files[0].name })
      console.log("image:", event.target.files[0].name)
      this.setState({ toastTitle: "Success !" });
      this.setState({ toastDescription: "file Name." + event.target.files[0].name });
      this.state.toasts.push(this.toastConfig)
    }
  }

  onRemovePreSettedImage = (removeItem) => {
    console.log("removeItem:", removeItem)
    let { ImageGalleryCountArray } = this.state;
    var dIndex = -1;
    ImageGalleryCountArray.map((item, key) => {
      if (item.keyID == removeItem.keyID) {
        dIndex = key;
      }
    })
    if (dIndex != -1) {
      ImageGalleryCountArray.splice(dIndex, 1);
    }
    this.setState({ toastTitle: "Success !" });
    this.setState({ toastDescription: "Removed." });
    this.state.toasts.push(this.toastConfig)
    console.log("ImageGalleryCountArray:", ImageGalleryCountArray)
  }

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
      let items = this.getItems(item)
      // if (items.length != 0) {
      itemsChanges.push(items)
      // }
      // eval("this.state.taskData" + idx)
      // console.log("taskData:", item, idx)
      // console.log("taskData:",  eval("this.state.taskData" + item))
    })

    itemsChanges.map((item, idx) => {
      let newBody = {};
      if (item.length != 0) {
        // console.log("taskData:", item, idx)
        item.map((itemSub, idx2) => {
          // console.log("taskData:", itemSub, idx)
          newBody = itemSub
          newBody.id = "versionDayTask" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "");
          newBody.versionDay = idx + 1;
          newData.push(newBody)
        })
      }
      // console.log("taskData:", item, idx)
    })
    console.log("taskData:", newData)
    let formData = { editPlanVersionID: this.state.PlanVersionUUID, editAllData: newData };
    let url = Config.host + Config.Plan.edit_All_planVersionDayTaskData_Url;
    ApiService.apiCall('patch', url, formData, (res) => {
      try {
        if (res.data.status == 200) {
          console.log("success:", res.data.data)
          // alert("this user is created !")
          // this.props.history.push(`/CardLibrarys/${localStorage.getItem("cardLibrary_UUID")}`)
        } else {
          // alert("this request failed !")
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("error:", error)
      }
    })

  }

  onRemoveVersion = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Plan.delete_Plan_Version_Url + "/" + localStorage.getItem("PlanDataUUID");
            let data = {
              planTypeVersionID: this.props.match.params.id
            }
            ApiService.apiCall('delete', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data deleted !")
                  this.props.history.push(`/programs/plans/${localStorage.getItem("PlanDataUUID")}`)
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
    // this.printChange();

    this.toasters = (() => {
      return this.state.toasts.reduce((toasters, toast) => {
        toasters[toast.position] = toasters[toast.position] || []
        toasters[toast.position].push(toast)
        return toasters
      }, {})
    })()

    this.toastConfig = (() => {
      return {
        autohide: this.state.autohide ? this.state.autohideValue : false,
        closeButton: this.state.closeButton,
        fade: this.state.fade,
        position: this.state.position,
      }
    })()


    return (
      <div className="animated fadeIn" >
        {(this.state.loaderFlag != false) &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            >
            </div>
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
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

            <CModal
              show={this.state.modalTitle}
              onClose={this.toggleTitle}
            >
              <CModalBody>
                <CInput className="form-control" id="bcc2" type="email" placeholder="Version" value={this.state.version} onChange={this.onChangeTitle} style={{ fontSize: "30px", width: "100%" }} />
                <br />
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="3"
                  placeholder="description"
                  value={this.state.editDescription}
                  onChange={this.onChangeDescription}
                />
                <CFormText className="help-block">300 characters max</CFormText>
                <br />
                <CRow>
                  <CCol lg={12} style={{ float: 'left' }}>
                    <CButton color="info" onClick={this.onChangeVersionName} >Submit </CButton>
                    <CButton
                      color="secondary"
                      onClick={this.toggleTitle}
                      style={{ marginLeft: '25px' }}
                    >Cancel</CButton>
                  </CCol>
                </CRow>
              </CModalBody>
            </CModal>

            <CModal
              show={this.state.modalImage}
              onClose={this.toggleImage}
            >
              {/* <CModalHeader >
                  <CModalTitle>
                    
                  </CModalTitle>
                </CModalHeader> */}
              <CModalBody>
                {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum. */}
                <input id="myInput" type="file" ref={(ref) => this.myInput1 = ref} style={{ display: 'none' }} onChange={this.changemainimage} />
                <CButton color="info" onClick={(e) => this.myInput1.click()} >Upload Now </CButton>
                <CButton
                  color="secondary"
                  onClick={this.toggleImage}
                  style={{ marginLeft: '20px' }}
                >Cancel</CButton>
                <CButton color="info" style={{ float: 'right' }} onClick={this.toggleImageSaveAddToast} >Submit </CButton>
                <br />
                <br />
                {/* <div className="show-image">
                    <img src="http://taditdash.files.wordpress.com/2014/01/tadit-dash.jpg" />
                    <input className="update" type="button" value="Update" />
                    <input className="delete" type="button" value="Delete" />
                  </div> */}
                <CRow>
                  {
                    this.state.ImageGalleryCountArray.map((item, key) => {
                      return (
                        <CCol lg={4}>
                          {/* <img src={exercise_icon} width="100%" /> */}
                          <div className="show-image" style={{ width: "100%" }}>
                            <img src={item.image} style={{ width: "100%" }} />
                            <button className="show-image-delete" onClick={this.onRemovePreSettedImage.bind(this, item)} >&nbsp;&nbsp;Remove </button>
                            {/* <input className="delete" type="button" value="Remove" onClick={this.showSimpleToast} /> */}
                          </div>
                          {/* <div className="show-image">
                              <img src={exercise_icon} width="100%" />
                              <img className="delete" src={remove_img} width="100%" />
                            </div> */}
                        </CCol>
                      )
                    })
                  }
                </CRow>
                {/* <HoverImage
                    width="100%"
                    src={exercise_icon}
                    hoverSrc={remove_img}
                  /> */}


              </CModalBody>
              {/* <CModalFooter>

                </CModalFooter> */}
            </CModal>


          </CCol>

          <CCol sm="12" lg="6">
            {Object.keys(this.toasters).map((toasterKey) => (
              <CToaster
                position={toasterKey}
                key={'toaster' + toasterKey}
              >
                {
                  this.toasters[toasterKey].map((toast, key) => {
                    return (
                      <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                      >
                        <CToastHeader closeButton={toast.closeButton} style={{ backgroundColor: "#f2f2f2" }}>
                          {this.state.toastTitle}
                        </CToastHeader>
                        <CToastBody>
                          {this.state.toastDescription}
                          {/* {`This is a toast in ${toasterKey} positioned toaster number ${key + 1}.`} */}
                        </CToastBody>
                      </CToast>
                    )
                  })
                }
              </CToaster>
            ))}
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
                    <CListGroupItem style={{ backgroundColor: "#F0F3F5" }} ><h5>Day {index + 1}</h5></CListGroupItem>

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
                        <CListGroupItem style={{ height: "50px" }}>
                          <CRow>
                            <CCol lg={4} sm={12}>
                              <h5 style={{ color: '#33adff', cursor: 'pointer' }} onClick={this.editTask.bind(this, item, index + 1)}>{item.taskTitle}</h5>
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

                    <CListGroupItem href="#" style={{ height: "50px" }}
                      onClick={this.onCreateNewDayTaskCard.bind(this, index + 1)}
                    // onClick={(item, index) => this.props.history.push('/Version/NewTask')}
                    >   +Create Task </CListGroupItem>
                  </CListGroup>
                )
              })}

            </CCol>
          </CRow>

        </React.Fragment>
        {/* <CRow>
          <CCol sm="12" xl="12" style={{ marginBottom: "50px" }}>
            {
              this.state.DayDefaultDataCountArray.map((item1, key) => {
                return (
                  <CListGroup style={{ marginTop: '10px' }}>
                    <CListGroupItem href="#" style={{ backgroundColor: "#F0F3F5" }} ><h5>Day {key + 1}</h5></CListGroupItem>
                    {
                      this.state.VersionDayTaskData.map((item, linekey) => {
                        if (item.day == key + 1) {
                          return (
                            <CListGroupItem href="#" style={{ height: "50px" }}>
                              <CRow>
                                <CCol lg={4} sm={12}>
                                  <h5 style={{ color: '#33adff' }} onClick={this.editTask.bind(this, item)}>{item.taskTitle}</h5>
                                </CCol>
                                <CCol lg={8} sm={12}>
                                  <div style={{ float: 'right' }}>
                                    <div style={{ display: 'inline-block' }}><CButton color="danger" style={{ float: 'right', width: '40%' }} onClick={this.onRefoundConfirm.bind(this, item)} ><img src={ReomveIcon} width="15%" />&nbsp;Remove </CButton></div>
                                    <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton block variant="ghost" color="info" style={{ float: 'right' }} onClick={this.onDuplicate.bind(this, item)}  >Duplicate</CButton></div>
                                  </div>
                                </CCol>
                              </CRow>
                            </CListGroupItem>
                          )
                        }
                      })
                    }

                    <CListGroupItem href="#" style={{ height: "50px" }} onClick={(item, index) => this.props.history.push('/Version/NewTask')} >
                      +Create Task
                      </CListGroupItem>
                  </CListGroup>
                )
              })
            }
          </CCol>
        </CRow> */}

      </div>
    )
  }
}

// export default PlanVersion;
export default withRouter(PlanVersionTaskShow);
