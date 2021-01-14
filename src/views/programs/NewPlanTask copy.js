import React, { Component } from 'react';
import { CModal, CModalBody, CCard, CCardBody, CInputGroupPrepend, CCardHeader, CSwitch, CCol, CRow, CButton, CInput, CFormGroup, CInputRadio, CLabel, CInputGroup, CInputGroupAppend, CBadge, CTextarea, CFormText, CSelect, CListGroup, CListGroupItem } from '@coreui/react';
import {
    CIcon
} from '@coreui/icons-react';

import { Link } from 'react-router-dom';

import exercise_icon from '../../assets/img/exercise_icon.png'
import note_icon from '../../assets/img/note_icon.png'
import rest_icon from '../../assets/img/rest_icon.png'
import video_icon from '../../assets/img/video_icon.png'
import drop_drag_icon from '../../assets/img/drop_drag_icon.png';
import remove_exercise from '../../assets/img/remove_exercise.png';
import ReomveIcon from '../../assets/img/remove.png';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

import PlanVersionDayTaskData from './PlanVersionDayTaskData'
import ExerciseCardData from './ExerciseCardData'
import Check_icon from '../../assets/img/Check_icon.png';

import MultiLevelSelect from 'react-multi-level-selector';

import Draggable from 'react-draggable';
import { ReactSortable } from 'react-sortablejs';

// React select
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

const date = new Date();
class NewPlantask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            BackendCardLibraryData: [],
            BackendPlanVersionDayTaskData: [],
            addCircuitArray: [],
            addExerciseArray: [],
            addVideoArray: [],
            addRestArray: [],
            addNoteArray: [],
            addCustomArray: [],
            startDate: "",
            plan: "",
            ActiveDate: "",
            version: "",
            featured: "",
            ImageUrl: "",
            exercise_icon: exercise_icon,
            note_icon: note_icon,
            rest_icon: rest_icon,
            video_icon: video_icon,
            modal: false,
            ExerciseCardSearchArray: [],
            exerciseTitle: "",
            exerciseSubTitle: "",
            cardSearch: false,
            value: [],
            ExerciseSubAllCardsDataArray: [],
            ExerciseTopLevelSelectOptionsArray: [],
            selectedItem: "All",
            DayTaskTitle: "",
            DayTaskDescription: "",
            changeCircuitArray: [],
            circuitMoveCount: 0,
            loaderFlag: true,

        }
        this.mergeCircuitArray = this.mergeCircuitArray.bind(this)
        this.setCircuitArray = this.setCircuitArray.bind(this)
    }

    componentDidMount = () => {
        console.log("PlanVersionTaskDay:", localStorage.getItem("PlanVersionTaskDay"))
        console.log("planVersionUUID:", localStorage.getItem("planVersionUUID"))
        console.log("planVersionTypeUUID:", localStorage.getItem("planVersionTypeUUID"))
        // console.log("PlanVersionTaskDayUUID:", localStorage.getItem("PlanVersionTaskDayUUID"))
        console.log("editPlanVersionDayTaskFlag:", localStorage.getItem("editPlanVersionDayTaskFlag"))

        let { addCustomArray, addCircuitArray, addExerciseArray, addRestArray, addVideoArray, addNoteArray, loaderFlag, BackendCardLibraryData, BackendPlanVersionDayTaskData, ExerciseCardSearchArray, ExerciseSubAllCardsDataArray, ExerciseTopLevelSelectOptionsArray, DayTaskTitle, DayTaskDescription } = this.state
        let url = Config.host + Config.Cards.Cards_CRUD_Url;
        ApiService.apiCall('get', url, {}, (res) => {
            try {
                if (res.data.status == 200) {
                    BackendCardLibraryData = res.data.data
                    BackendCardLibraryData.map(item => {
                        item.exercisesData.map(itemSub => {
                            ExerciseSubAllCardsDataArray.push(itemSub);
                        })
                    })

                    DayTaskTitle = localStorage.getItem("editPlanVersionDayTaskTitle")
                    DayTaskDescription = localStorage.getItem("editPlanVersionDayTaskDescription")
                    BackendCardLibraryData.map(item => {
                        item.exercisesData.map(itemSub => {
                            itemSub.showImageFlag = false;
                        })
                    })
                    ExerciseCardSearchArray = ExerciseSubAllCardsDataArray;
                    console.log("ExerciseCardSearchArray:", ExerciseCardSearchArray)
                    console.log("ExerciseSubAllCardsDataArray:", ExerciseSubAllCardsDataArray)

                    let newBody = {}

                    BackendCardLibraryData.map((item2, key2) => {
                        newBody = {}
                        newBody.select = "";
                        newBody.option = item2.title;
                        ExerciseTopLevelSelectOptionsArray.push(newBody);
                        item2.exercisesData.map((subItem, idxSub) => {
                            newBody = {}
                            newBody.select = "disabled";
                            newBody.option = subItem.exerciseName;
                            ExerciseTopLevelSelectOptionsArray.push(newBody);
                        })
                    })

                    console.log("ExerciseTopLevelSelectOptionsArray:", ExerciseTopLevelSelectOptionsArray)

                    if (localStorage.getItem("editPlanVersionDayTaskFlag") != "") {
                        let url = Config.host + Config.Plan.Plan_Version_CRUD_Url + "/" + localStorage.getItem("planVersionUUID");
                        ApiService.apiCall('get', url, {}, (res) => {
                            try {
                                if (res.data.status == 200) {
                                    BackendPlanVersionDayTaskData = res.data.data

                                    let userTotalData = BackendPlanVersionDayTaskData.planVersionDayTaskData.filter(user => user.id == localStorage.getItem("editPlanVersionDayTaskFlag"))
                                    console.log("userTotalData:", userTotalData[0])

                                    if (userTotalData[0].versionDayTaskCard.length > 0) {

                                        let newBodySub = {}
                                        let newBodyTop = {}
                                        userTotalData[0].versionDayTaskCard.map((item, idx) => {
                                            switch (item.flag) {
                                                case "circuit":
                                                    // let newBodyTop = {}
                                                    // newBodyTop.flag = item.flag
                                                    // newBodyTop.exeerciseCards = []
                                                    // newBodyTop.id = item.id
                                                    // newBodyTop.exeerciseCards.push(...item.exeerciseCards) 
                                                    // newBodyTop.Cycles = item.exeerciseCards
                                                    // newBodyTop.number = item.number
                                                    // addCircuitArray.push(newBodyTop);
                                                    // addCircuitArray = this.mergeCircuitArray()
                                                    // item.cardData.map(itemCardData => {
                                                    //     newBodyTop = {}
                                                    //     newBodyTop.flag = itemCardData.flag
                                                    //     newBodyTop.exeerciseCards = [];
                                                    //     newBodyTop.id = itemCardData.id
                                                    //     newBodyTop.Cycles = itemCardData.Cycles
                                                    //     newBodyTop.number = itemCardData.number;
                                                    //     itemCardData.exeerciseCards.map((item2, idx2) => {
                                                    //         newBodySub = {}
                                                    //         newBodySub.flag = item2.flag
                                                    //         newBodySub.id = item2.id
                                                    //         newBodySub.title = item2.title
                                                    //         newBodySub.description = item2.description
                                                    //         newBodySub.file = item2.file
                                                    //         newBodySub.fileName = item2.fileName
                                                    //         newBodySub.Reps = item2.Reps
                                                    //         newBodySub.Sets = item2.Sets
                                                    //         newBodySub.RepsCount = item2.RepsCount
                                                    //         newBodySub.RestTime = item2.RestTime
                                                    //         newBodySub.AutoPlay = item2.AutoPlay
                                                    //         newBodyTop.exeerciseCards.push(newBodySub);
                                                    //     })
                                                    //     addCircuitArray = this.mergeCircuitArray()

                                                    //     addCircuitArray.push(newBodyTop);

                                                    //     this.setCircuitArray(addCircuitArray)

                                                    //     // addCircuitArray.push(itemCardData)
                                                    //     // this.setCircuitArray(addCircuitArray)
                                                    // })

                                                    addCircuitArray.push(item)
                                                    this.setCircuitArray(addCircuitArray)

                                                // newBodyTop = {}
                                                // newBodyTop.flag = item.flag
                                                // newBodyTop.exeerciseCards = [];
                                                // newBodyTop.id = item.id
                                                // newBodyTop.Cycles = item.Cycles
                                                // newBodyTop.number = item.number;
                                                // item.exeerciseCards.map((item2, idx2) => {
                                                //     newBodySub = {}
                                                //     newBodySub.flag = item2.flag
                                                //     newBodySub.id = item2.id
                                                //     newBodySub.title = item2.title
                                                //     newBodySub.description = item2.description
                                                //     newBodySub.file = item2.file
                                                //     newBodySub.fileName = item2.fileName
                                                //     newBodySub.Reps = item2.Reps
                                                //     newBodySub.Sets = item2.Sets
                                                //     newBodySub.RepsCount = item2.RepsCount
                                                //     newBodySub.RestTime = item2.RestTime
                                                //     newBodySub.AutoPlay = item2.AutoPlay
                                                //     newBodyTop.exeerciseCards.push(newBodySub);
                                                // })
                                                // addCircuitArray = this.mergeCircuitArray()

                                                // addCircuitArray.push(newBodyTop);

                                                // this.setCircuitArray(addCircuitArray)

                                                case "exercise":
                                                    addCustomArray.push(item)
                                                    break;
                                                case "video":
                                                    addCustomArray.push(item)
                                                    break;
                                                case "rest":
                                                    addCustomArray.push(item)
                                                    break;
                                                case "note":
                                                    addCustomArray.push(item)
                                                    break;
                                            }
                                            console.log("userTotalData_item:", item)

                                        })

                                    } else {
                                        console.log("userTotalData_item:", userTotalData[0], "+++")
                                    }

                                    loaderFlag = false
                                    this.setState({ addCustomArray, addCircuitArray, addExerciseArray, addRestArray, addVideoArray, addNoteArray, loaderFlag, BackendCardLibraryData, BackendPlanVersionDayTaskData, ExerciseCardSearchArray, ExerciseSubAllCardsDataArray, ExerciseTopLevelSelectOptionsArray, DayTaskTitle, DayTaskDescription })
                                } else {
                                    console.log("api call failed.")
                                }
                            } catch (error) {
                                console.log("api call failed.", error)

                                console.log("error :", error);
                            }
                        })

                    } else {
                        // this.onAddCircuit();

                        // this.onAddExercise();
                        // this.onAddVideo();
                        // this.onAddRest();
                        // this.onAddNote();
                        // this.initCircuit();
                        loaderFlag = false
                        this.setState({ addCustomArray, loaderFlag, BackendCardLibraryData, BackendPlanVersionDayTaskData, ExerciseCardSearchArray, ExerciseSubAllCardsDataArray, ExerciseTopLevelSelectOptionsArray, DayTaskTitle, DayTaskDescription })
                    }
                } else {
                    console.log("api call failed.")
                }
            } catch (error) {
                console.log("error :", error);
            }
        })

    }

    initCircuit = () => {
        let { addCircuitArray } = this.state
        let newBodySub = {}
        newBodySub.flag = "exercise";
        newBodySub.id = "SubCircuitArray" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBodySub.title = "";
        newBodySub.description = "";
        newBodySub.file = null;
        newBodySub.fileName = "";
        newBodySub.Reps = "Reps";
        newBodySub.Sets = "";
        newBodySub.RepsCount = "";
        newBodySub.RestTime = "";
        newBodySub.AutoPlay = "checked";

        let newBodyTop = {}
        newBodyTop.flag = "circuit";
        newBodyTop.exeerciseCards = [];
        newBodyTop.id = "TopCircuitArray" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBodyTop.exeerciseCards.push(newBodySub);
        newBodyTop.Cycles = 3;
        newBodyTop.number = addCircuitArray.length;
        addCircuitArray.push(newBodyTop);
        // console.log("addCircuitArray:", addCircuitArray)
        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray })
    }

    onCreatePlanVersionDayTask = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let { circuitMoveCount, DayTaskTitle, DayTaskDescription, addCustomArray, addExerciseArray, addVideoArray, addRestArray, addNoteArray, addCircuitArray } = this.state

                        let AllData = [];
                        let AllDataCircuit = [];
                        let Cycles = 0;
                        let id = "";
                        // if (circuitMoveCount > 1) {
                        addCircuitArray.map((item, TopIndex) => {
                            let items = this.getSubItem(TopIndex)
                            Cycles = item.Cycles
                            id = item.id
                            AllDataCircuit.push(...items)

                            // items.map((itemSub, idx2) => {
                            //     itemSub.Cycles = item.Cycles
                            //     itemSub.number = item.number
                            //     AllDataCircuit.push(itemSub)
                            // })
                            // let newBody = {};
                            // newBody = [...items];
                            // newBody.Cycles = item.Cycles
                            // newBody.number = item.number

                            // // newBody.exeerciseCards = [];                               
                            // // newBody.flag = item.flag
                            // // newBody.Cycles = item.Cycles
                            // // newBody.number = item.number
                            // // newBody.exeerciseCards.push(...items);
                            // // newBody.exeerciseCards.Cycles = item.Cycles
                            // // newBody.exeerciseCards.number = item.number
                            // AllDataCircuit.push(newBody)
                        })
                        // } else {
                        //     addCircuitArray.map((item, TopIndex) => {
                        //         AllDataCircuit.push(item)
                        //     })
                        // }
                        let newBody = {};
                        newBody.exeerciseCards = AllDataCircuit;
                        newBody.flag = "circuit"
                        newBody.id = id
                        newBody.Cycles = Cycles
                        newBody.number = 0
                        AllData.push(newBody)

                        addCustomArray.map((item, TopIndex) => {
                            AllData.push(item)
                        })

                        // addExerciseArray.map((item, TopIndex) => {
                        //     AllData.push(item)
                        // })
                        // addVideoArray.map((item, TopIndex) => {
                        //     AllData.push(item)
                        // })
                        // addRestArray.map((item, TopIndex) => {
                        //     AllData.push(item)
                        // })
                        // addNoteArray.map((item, TopIndex) => {
                        //     AllData.push(item)
                        // })

                        console.log("AllData:", ...AllData)


                        if (localStorage.getItem("editPlanVersionDayTaskFlag") != "") {
                            if (DayTaskTitle != "" && DayTaskDescription != "") {
                                let formData = {
                                    editPlanVersionID: localStorage.getItem("planVersionUUID"),
                                    planVersionDayTaskDataID: localStorage.getItem("editPlanVersionDayTaskFlag"),
                                    versionDay: localStorage.getItem("PlanVersionTaskDay"),
                                    taskTitle: DayTaskTitle,
                                    taskDescription: DayTaskDescription,
                                    versionDayTaskCard: AllData,
                                };
                                let url = Config.host + Config.Plan.Edit_Plan_Version_Day_Task_Url;
                                ApiService.apiCall('patch', url, formData, (res) => {
                                    try {
                                        if (res.data.status == 200) {
                                            console.log("success:", res.data.data)
                                            // alert("this user is created !")
                                            this.props.history.push(`/programs/Plans/VersionTask/${localStorage.getItem("planVersionTypeUUID")}`)
                                        } else {
                                            // alert("this request failed !")
                                            console.log("api call failed.")
                                        }
                                    } catch (error) {
                                        console.log("error:", error)
                                    }
                                })
                            } else {
                                alert('please input task data detail!')
                            }
                        } else {
                            if (DayTaskTitle != "" && DayTaskDescription != "") {
                                let formData = {
                                    planTypeVersionID: localStorage.getItem("planVersionTypeUUID"),
                                    versionDay: localStorage.getItem("PlanVersionTaskDay"),
                                    title: DayTaskTitle,
                                    description: DayTaskDescription,
                                    versionDayTaskCard: AllData,
                                };
                                let url = Config.host + Config.Plan.Add_Plan_Version_Day_Task_Url;
                                ApiService.apiCall('post', url, formData, (res) => {
                                    try {
                                        if (res.data.status == 200) {
                                            console.log("success:", res.data.data)
                                            // alert("this user is created !")
                                            this.props.history.push(`/programs/Plans/VersionTask/${localStorage.getItem("planVersionTypeUUID")}`)
                                        } else {
                                            // alert("this request failed !")
                                            console.log("api call failed.")
                                        }
                                    } catch (error) {
                                        console.log("error:", error)
                                    }
                                })
                            } else {
                                alert('please input task data detail!')
                            }
                        }



                        // let itemsChanges = []
                        // addCircuitArray.map((item, TopIndex) => {
                        //     let items = this.getSubItem(TopIndex)
                        //     itemsChanges.push(items)
                        //     console.log("TopIndex:", TopIndex)
                        //     console.log("item_Length:", item.exeerciseCards.length)
                        // })
                        // console.log("addCircuitArray:", itemsChanges)

                        // let formAllData = [];
                        // let ExerciseData = (addExerciseArray[0].title != "") ? addExerciseArray : ""
                        // let VideoData = (addVideoArray[0].title != "") ? addVideoArray : ""
                        // let RestData = (addRestArray[0].title != "") ? addRestArray : ""
                        // let NoteData = (addNoteArray[0].title != "") ? addNoteArray : ""
                        // let CircuitData = (addCircuitArray[0].exeerciseCards[0].title != "") ? addCircuitArray : ""
                        // if (ExerciseData != "") { formAllData.push(...addExerciseArray) }
                        // if (VideoData != "") { formAllData.push(...addVideoArray) }
                        // if (RestData != "") { formAllData.push(...addRestArray) }
                        // if (NoteData != "") { formAllData.push(...addNoteArray) }
                        // if (CircuitData != "") { formAllData.push(...itemsChanges) }
                        // console.log("formAllData:", formAllData)




                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    }

    setCircuitArray = (items = null) => {
        let { addCircuitArray } = this.state
        if (items) {
            addCircuitArray = items
        }
        addCircuitArray.map((item, idx) => {
            this.setState({
                ['subCircuit_' + idx]: item.exeerciseCards
            })
        })

    }

    mergeCircuitArray = (items = null) => {
        let { addCircuitArray } = this.state
        if (items) {
            addCircuitArray = items
        }

        addCircuitArray.map((item, idx) => {
            let exerciseItem = this.getSubItem(idx)
            item.exeerciseCards = [...exerciseItem]
            return item
        })
        this.setState({
            addCircuitArray
        })
        return addCircuitArray

    }

    getSubItem = (key) => {
        let item = []
        eval("item = this.state.subCircuit_" + key)
        return item
    }

    onAddCircuit = () => {
        let newBodySub = {}

        newBodySub.flag = "exercise";
        newBodySub.id = "SubCircuitArray" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBodySub.title = "";
        newBodySub.description = "";
        newBodySub.file = null;
        newBodySub.fileName = "";
        newBodySub.Reps = "Reps";
        newBodySub.Sets = "";
        newBodySub.RepsCount = "";
        newBodySub.RestTime = "";
        newBodySub.AutoPlay = "checked";

        let newBodyTop = {}
        newBodyTop.flag = "circuit";
        newBodyTop.exeerciseCards = [];
        newBodyTop.id = "TopCircuitArray" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBodyTop.Cycles = 2;
        newBodyTop.exeerciseCards.push(newBodySub);

        // newBody.avata = null;
        // newBody.title = "Exercise Title";
        // newBody.Reps = true;
        // newBody.time = false;

        let { addCircuitArray } = this.state

        addCircuitArray = this.mergeCircuitArray()

        newBodyTop.number = addCircuitArray.length;
        addCircuitArray.push(newBodyTop);

        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onAddCircuitHomeExercise = (addItem) => {
        console.log("addItem:", addItem)
        let newBody = {}
        newBody.flag = "exercise";
        newBody.id = "exercise_circuit" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "Reps";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addCircuitArray } = this.state
        addCircuitArray = this.mergeCircuitArray()
        let updateKey;
        addCircuitArray.map((item, key) => {
            if (item.id == addItem.id) {
                updateKey = key
                console.log("key:", key)

            }
        })
        addCircuitArray[updateKey].exeerciseCards.push(newBody)
        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onAddCircuitNoteExercise = (addItem) => {
        let newBody = {}
        newBody.flag = "note";
        newBody.id = "note_circuit" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addCircuitArray } = this.state
        addCircuitArray = this.mergeCircuitArray()
        let updateKey;
        addCircuitArray.map((item, key) => {
            if (item.id == addItem.id) {
                updateKey = key
                console.log("key:", key)
            }
        })
        addCircuitArray[updateKey].exeerciseCards.push(newBody)
        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onAddCircuitRestExercise = (addItem) => {
        let newBody = {}
        newBody.flag = "rest";
        newBody.id = "rest_circuit" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addCircuitArray } = this.state
        addCircuitArray = this.mergeCircuitArray()
        let updateKey;
        addCircuitArray.map((item, key) => {
            if (item.id == addItem.id) {
                updateKey = key
                console.log("key:", key)
            }
        })
        addCircuitArray[updateKey].exeerciseCards.push(newBody)
        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onAddCircuitVideoExercise = (addItem) => {
        let newBody = {}
        newBody.flag = "video";
        newBody.id = "video_circuit" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addCircuitArray } = this.state
        addCircuitArray = this.mergeCircuitArray()
        let updateKey;
        addCircuitArray.map((item, key) => {
            if (item.id == addItem.id) {
                updateKey = key
                console.log("key:", key)
            }
        })
        addCircuitArray[updateKey].exeerciseCards.push(newBody)
        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onAddExercise = () => {
        let newBody = {}
        newBody.flag = "exercise";
        newBody.id = "exercise" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "Reps";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addExerciseArray, addCustomArray } = this.state
        addExerciseArray.push(newBody);
        addCustomArray.push(newBody);

        this.setState({ addExerciseArray, addCustomArray })
        // console.log("addExerciseArray:", addExerciseArray)
        this.printChange("one");
    }

    onAddVideo = () => {
        let newBody = {}
        newBody.flag = "video";
        newBody.id = "video" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addVideoArray, addCustomArray } = this.state
        addVideoArray.push(newBody);
        addCustomArray.push(newBody);
        this.setState({ addVideoArray, addCustomArray })
        // console.log("addVideoArray:", addVideoArray)
        this.printChange("one");
    }

    onAddRest = () => {
        let newBody = {}
        newBody.flag = "rest";
        newBody.id = "rest" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addRestArray, addCustomArray } = this.state
        addRestArray.push(newBody);
        addCustomArray.push(newBody);
        this.setState({ addRestArray, addCustomArray })
        // console.log("addRestArray:", addRestArray)
        this.printChange("one");
    }

    onAddNote = () => {
        let newBody = {}
        newBody.flag = "note";
        newBody.id = "note" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addNoteArray, addCustomArray } = this.state
        addNoteArray.push(newBody);
        addCustomArray.push(newBody);
        this.setState({ addNoteArray, addCustomArray })
        // console.log("addNoteArray:", addNoteArray)
        this.printChange("one");
    }

    onAddCustomArray = (flag) => {
        let newBody = {}
        newBody.flag = flag;
        newBody.id = flag + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + Math.random().toString().replace("0.", "")
        newBody.title = "";
        newBody.description = "";
        newBody.file = null;
        newBody.fileName = "";
        newBody.Reps = "";
        newBody.Sets = "";
        newBody.RepsCount = "";
        newBody.RestTime = "";
        newBody.AutoPlay = "checked";

        let { addCustomArray } = this.state
        addCustomArray.push(newBody);
        this.setState({ addCustomArray })
        // console.log("addNoteArray:", addNoteArray)
        this.printChange("one");
    }

    onCloseExerciseModal = () => {
        this.setState({ modal: !this.state.modal })
        this.setState({ cardSearch: false })
        this.setState({ value: null });
        let { ExerciseCardSearchArray } = this.state
        ExerciseCardSearchArray.map((item, key) => {
            item.showImageFlag = false;
        })
        this.setState({ ExerciseCardSearchArray })
    }

    onShowModalCircuit = (Subitem, TopItems, flag) => {
        this.setState({ modal: !this.state.modal })
        localStorage.setItem("ExerciseCardTitleFlag", flag) //, "two"
        localStorage.setItem("ExerciseCircuitSubItemTitleUUID", Subitem.id)
        localStorage.setItem("ExerciseCircuitTopItemsTitleUUID", TopItems.id)
    }

    onShowModalExercise = (TopItems, flag) => {
        this.setState({ modal: !this.state.modal })
        localStorage.setItem("ExerciseCardTitleFlag", flag)//, "one"
        localStorage.setItem("ExerciseCircuitTopItemsTitleUUID", TopItems.id)
    }

    onSearchExerciseCardData = (event) => {
        let { BackendCardLibraryData, ExerciseSubAllCardsDataArray, ExerciseCardSearchArray, selectedItem } = this.state
        if (selectedItem == "All") {
            ExerciseCardSearchArray = ExerciseSubAllCardsDataArray.filter(user => user.exerciseName.toString().indexOf(event.target.value) !== -1)
        } else {
            let swapData = [];
            BackendCardLibraryData.map(item => {
                if (selectedItem == item.title) {
                    swapData = item.exercisesData
                }
            })

            ExerciseCardSearchArray = swapData.filter(user => user.exerciseName.toString().indexOf(event.target.value) !== -1)
        }
        this.setState({ ExerciseCardSearchArray, selectedItem })
    }

    onSelectExerciseCardImage = (seleteItem) => {
        let { ExerciseCardSearchArray } = this.state
        ExerciseCardSearchArray.map((item, key) => {
            if (item.exerciseName == seleteItem.exerciseName) {
                item.showImageFlag = !item.showImageFlag;
                if (item.showImageFlag == true) {
                    if (localStorage.getItem("ExerciseCardTitleFlag") == "two") {
                        let { addCircuitArray } = this.state
                        var dIndex = -1;
                        addCircuitArray.map((Subitem, idx) => {
                            if (Subitem.id == localStorage.getItem("ExerciseCircuitTopItemsTitleUUID")) {
                                dIndex = idx;
                            }
                        })
                        addCircuitArray[dIndex].exeerciseCards.map((Subitem, idx) => {
                            if (Subitem.id == localStorage.getItem("ExerciseCircuitSubItemTitleUUID")) {
                                Subitem.title = item.exerciseName
                                Subitem.cardUID = item.id
                            }
                        })
                        this.setState({
                            addCircuitArray
                        })
                        console.log("addCircuitArray:", addCircuitArray)
                    } else {
                        let { addExerciseArray, addCustomArray } = this.state
                        addCustomArray.map((Subitem, subIndex) => {
                            if (Subitem.id == localStorage.getItem("ExerciseCircuitTopItemsTitleUUID")) {
                                Subitem.title = item.exerciseName
                                Subitem.cardUID = item.id
                            }
                        })
                        this.setState({ addCustomArray });
                        this.printChange();
                    }
                }
            } else {
                item.showImageFlag = false;
            }
        })
        this.setState({ ExerciseCardSearchArray })
    }


    onSelectTopExercise = (e) => {
        let { BackendCardLibraryData, ExerciseCardSearchArray, selectedItem, ExerciseSubAllCardsDataArray } = this.state;
        selectedItem = e.target.value;
        console.log("selectedItem:", selectedItem)
        if (selectedItem == "All") {
            ExerciseCardSearchArray = ExerciseSubAllCardsDataArray;
        } else {
            BackendCardLibraryData.map(item => {
                if (selectedItem == item.title) {
                    ExerciseCardSearchArray = item.exercisesData
                }
            })
            // ExerciseCardSearchArray = ExerciseCardData.filter(user => user.include.toString() == selectedItem)
        }
        this.setState({ ExerciseCardSearchArray, selectedItem });
    }

    onChangeTaskTitle = (e) => { this.setState({ DayTaskTitle: e.target.value }) }

    onChangeTaskDescription = (e) => { this.setState({ DayTaskDescription: e.target.value }) }

    removeCircuitItem = (Index_Top, Index_Sub) => {
        let { addCircuitArray } = this.state
        let items = this.getSubItem(Index_Top)
        items.splice(Index_Sub, 1)
        this.setState({
            ['subCircuit_' + Index_Top]: items
        })
        addCircuitArray[Index_Top].exeerciseCards = [...items]

        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray });
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    removeEntireCircuitItem = (Index_Top)=>{
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((subItem, subIndex) => {
            if (subIndex == Index_Top) {
                dIndex = subIndex;
            }
        })

        if (dIndex != -1) {
            addCircuitArray.splice(dIndex, 1);
        }
        this.setState({ addCircuitArray });      

        this.setCircuitArray(addCircuitArray)
        this.setState({ addCircuitArray });
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    removeExerciseCardItem = (index, flag) => {
        let { addCustomArray } = this.state
        var dIndex = -1;
        addCustomArray.map((subItem, subIndex) => {
            if (subIndex == index) {
                dIndex = subIndex;
            }
        })

        if (dIndex != -1) {
            addCustomArray.splice(dIndex, 1);
        }
        this.setState({ addCustomArray });
        this.printChange("one");
    }

    // removeOtherExerciseItem = (index, flag) => {
    //     let { addExerciseArray, addVideoArray, addRestArray, addNoteArray } = this.state
    //     var dIndex = -1;
    //     switch (flag) {
    //         case "exercise":
    //             addExerciseArray.map((subItem, subIndex) => {
    //                 if (subIndex == index) {
    //                     dIndex = subIndex;
    //                 }
    //             })

    //             if (dIndex != -1) {
    //                 addExerciseArray.splice(dIndex, 1);
    //             }
    //             break;
    //         case "video":
    //             addVideoArray.map((subItem, subIndex) => {
    //                 if (subIndex == index) {
    //                     dIndex = subIndex;
    //                 }
    //             })

    //             if (dIndex != -1) {
    //                 addVideoArray.splice(dIndex, 1);
    //             }
    //             break;
    //         case "rest":
    //             addRestArray.map((subItem, subIndex) => {
    //                 if (subIndex == index) {
    //                     dIndex = subIndex;
    //                 }
    //             })

    //             if (dIndex != -1) {
    //                 addRestArray.splice(dIndex, 1);
    //             }
    //             break;
    //         case "note":
    //             addNoteArray.map((subItem, subIndex) => {
    //                 if (subIndex == index) {
    //                     dIndex = subIndex;
    //                 }
    //             })

    //             if (dIndex != -1) {
    //                 addNoteArray.splice(dIndex, 1);
    //             }
    //             break;
    //     }
    //     this.setState({ addExerciseArray, addVideoArray, addRestArray, addNoteArray });
    //     this.printChange("one");
    // }

    printChange = (flag) => {
        let { circuitMoveCount, addCustomArray, changeCircuitArray, addCircuitArray, addExerciseArray, addVideoArray, addRestArray, addNoteArray } = this.state
        if (flag != "circuit") {
            console.log("addCircuitArray:", addCircuitArray)
            console.log("addCustomArray:", addCustomArray)
            // console.log("addExerciseArray:", addExerciseArray)
            // console.log("addVideoArray:", addVideoArray)
            // console.log("addRestArray:", addRestArray)
            // console.log("addNoteArray:", addNoteArray)
        } else {
            circuitMoveCount++;
            let itemsChanges = []
            addCircuitArray.map((item, TopIndex) => {
                let items = this.getSubItem(TopIndex)
                itemsChanges.push(items)
            })
            console.log("addCircuitArray_itemsChanges:", itemsChanges)
            console.log("addCircuitArray:", addCircuitArray)
        }

        let AllData = [];
        addCircuitArray.map((item, TopIndex) => {
            AllData.push(item)
        })
        addCustomArray.map((item, TopIndex) => {
            AllData.push(item)
        })


        // addExerciseArray.map((item, TopIndex) => {
        //     AllData.push(item)
        // })
        // addVideoArray.map((item, TopIndex) => {
        //     AllData.push(item)
        // })
        // addRestArray.map((item, TopIndex) => {
        //     AllData.push(item)
        // })
        // addNoteArray.map((item, TopIndex) => {
        //     AllData.push(item)
        // })

        console.log("AllData:", AllData)

        this.setState({ circuitMoveCount });

    }

    onChnageCircuitExerciseCycles = (changeCircuitData, e) => {
        let { addCircuitArray } = this.state
        addCircuitArray.map((item, idx) => {
            if (item.id == changeCircuitData.id) {
                item.Cycles = e.target.value;
            }
        })
        this.setState({
            addCircuitArray
        })
        // console.log("ch:", e.target.value)
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    ///////////////////////////////////////
    onChangeCardFile = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                if (event.target.files[0]) {
                    item.fileName = event.target.files[0].name
                    item.file = event.target.files[0]
                }
            }
        })

        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArrayFile:", addCircuitArray)
        // this.printChange("two");
    }

    onChangesCardRepsDropItem = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.Reps = event.target.value
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onChangeCardSets = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.Sets = event.target.value
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onChangeCardRepsCount = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.RepsCount = event.target.value
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onChangeCardRestTime = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.RestTime = event.target.value
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onChangeCardTitle = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.title = event.target.value
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onChangeCardDescription = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.description = event.target.value
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    onChangeCardAutoPlaySwitch = (TopItems, Subitem, event) => {
        let { addCircuitArray } = this.state
        var dIndex = -1;
        addCircuitArray.map((item, idx) => {
            if (item.id == TopItems.id) {
                dIndex = idx;
            }
        })
        addCircuitArray[dIndex].exeerciseCards.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.AutoPlay = item.AutoPlay == "checked" ? "false" : "checked";
            }
        })
        this.setState({
            addCircuitArray
        })
        console.log("addCircuitArray:", addCircuitArray)
        // this.printChange("two");
    }

    ///////////////////////////////////////////////////////////////////////

    onChangeDividesCardReps = (Subitem, event) => {
        let { addExerciseArray, addCustomArray } = this.state
        addCustomArray.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.Reps = event.target.value
            }
        })
        this.setState({
            addExerciseArray, addCustomArray
        })
        // console.log("addExerciseArray:", addExerciseArray)
        this.printChange("one");
    }

    onChangeDividesCardSets = (Subitem, event) => {
        let { addCustomArray } = this.state
        addCustomArray.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.Sets = event.target.value
            }
        })
        this.setState({
            addCustomArray
        })
        // console.log("addExerciseArray:", addExerciseArray)
        this.printChange("one");
    }

    onChangeDividesCardRepsCount = (Subitem, event) => {
        let { addCustomArray } = this.state
        addCustomArray.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.RepsCount = event.target.value
            }
        })
        this.setState({
            addCustomArray
        })
        // console.log("addExerciseArray:", addExerciseArray)
        this.printChange("one");
    }

    onChangeDividesCardDescription = (Subitem, event) => {
        let { addCustomArray } = this.state
        addCustomArray.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.description = event.target.value
            }
        })
        this.setState({
            addCustomArray
        })
        // console.log("addVideoArray:", addVideoArray)
        this.printChange("one");
    }

    onChangeDividesCardFile = (Subitem, event) => {
        let { addCustomArray } = this.state
        addCustomArray.map((item, idx) => {
            if (item.id == Subitem.id) {
                if (event.target.files[0]) {
                    item.fileName = event.target.files[0].name
                    item.file = event.target.files[0]
                }
            }
        })

        this.setState({
            addCustomArray
        })
        // console.log("addVideoArray:", addVideoArray)
        this.printChange("one");
    }

    onChangeDividesCardRestTime = (Subitem, flag, event) => {

        let { addCustomArray } = this.state
        addCustomArray.map((item, idx) => {
            if (item.id == Subitem.id) {
                item.RestTime = event.target.value
            }
        })
        this.setState({
            addCustomArray
        })

        // if (flag == "exercise") {
        //     let { addExerciseArray } = this.state
        //     addExerciseArray.map((item, idx) => {
        //         if (item.id == Subitem.id) {
        //             item.RestTime = event.target.value
        //         }
        //     })
        //     this.setState({
        //         addExerciseArray
        //     })
        //     // console.log("addExerciseArray:", addExerciseArray)
        // } else {
        //     let { addRestArray } = this.state
        //     addRestArray.map((item, idx) => {
        //         if (item.id == Subitem.id) {
        //             item.RestTime = event.target.value
        //         }
        //     })
        //     this.setState({
        //         addRestArray
        //     })
        //     // console.log("addRestArray:", addRestArray)
        // }
        this.printChange("one");
    }

    onChangeDividesCardTitle = (Subitem, flag, event) => {
        let { addCustomArray, addVideoArray, addRestArray, addNoteArray } = this.state
        addCustomArray.map((item, subIndex) => {
            if (item.id == Subitem.id) {
                item.title = event.target.value
            }
        })

        // switch (flag) {
        //     case "note":
        //         addNoteArray.map((item, subIndex) => {
        //             if (item.id == Subitem.id) {
        //                 item.title = event.target.value
        //             }
        //         })
        //         break;
        //     case "video":
        //         addVideoArray.map((item, subIndex) => {
        //             if (item.id == Subitem.id) {
        //                 item.title = event.target.value
        //             }
        //         })
        //         break;
        //     case "rest":
        //         addRestArray.map((item, subIndex) => {
        //             if (item.id == Subitem.id) {
        //                 item.title = event.target.value
        //             }
        //         })
        //         break;
        // }
        this.setState({ addCustomArray, addNoteArray, addVideoArray, addRestArray });
        this.printChange("one");
    }

    onChangeDividesCardAutoPlaySwitch = (Subitem, flag, event) => {


        let { addCustomArray, addExerciseArray, addVideoArray, addRestArray } = this.state
        addCustomArray.map((item, subIndex) => {
            if (item.id == Subitem.id) {
                item.AutoPlay = item.AutoPlay == "checked" ? "false" : "checked";
            }
        })

        // switch (flag) {
        //     case "exercise":
        //         addExerciseArray.map((item, subIndex) => {
        //             if (item.id == Subitem.id) {
        //                 item.AutoPlay = item.AutoPlay == "checked" ? "false" : "checked";
        //             }
        //         })
        //         break;
        //     case "video":
        //         addVideoArray.map((item, subIndex) => {
        //             if (item.id == Subitem.id) {
        //                 item.AutoPlay = item.AutoPlay == "checked" ? "false" : "checked";
        //             }
        //         })
        //         break;
        //     case "rest":
        //         addRestArray.map((item, subIndex) => {
        //             if (item.id == Subitem.id) {
        //                 item.AutoPlay = item.AutoPlay == "checked" ? "false" : "checked";
        //             }
        //         })
        //         break;
        // }
        this.setState({ addCustomArray, addExerciseArray, addVideoArray, addRestArray });
        this.printChange("one");
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
                <Link to="/programs/plans" >
                    <span>Programs</span> &nbsp;
        </Link>/ &nbsp;

                <Link to={(`/programs/Plans/${localStorage.getItem("planExerciseID")}`)} >
                    <span>{localStorage.getItem("planExerciseTitle")}</span> &nbsp;
        </Link>/ &nbsp;

                <Link to={(`/programs/Plans/VersionTask/${localStorage.getItem("planVersionTypeUUID")}`)} >
                    <span>v{localStorage.getItem("planExerciseVersion")}</span> &nbsp;
        </Link>/ &nbsp; Create New Task
                <br />
                <br />
                <h2> Create New Task</h2>
                <CCol lg={4}>
                    <CFormGroup row>
                        <CCol md="12">
                            <CInputGroup>
                                <CInput type="email" id="input2-group2" name="input2-group2" placeholder="Task title" value={this.state.DayTaskTitle} onChange={this.onChangeTaskTitle} />
                                <CInputGroupAppend>
                                    <CButton type="button" color="info" onClick={this.onCreatePlanVersionDayTask}>Submit</CButton>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CTextarea
                        name="textarea-input"
                        id="textarea-input"
                        rows="5"
                        placeholder="description"
                        value={this.state.DayTaskDescription}
                        onChange={this.onChangeTaskDescription}
                    />
                    <CFormText className="help-block">300 characters max</CFormText>
                </CCol><br />

                <React.Fragment>

                    {this.state.addCircuitArray.map((TopItems, TopIndex) => {
                        let items = this.getSubItem(TopIndex)
                        // console.log(items, "==== items")
                        return (
                            <div key={TopIndex}>
                                <CListGroup>
                                    <CListGroupItem href="#" style={{ backgroundColor: "#f2f2f2" }}>
                                        <span style={{ textSize: "35px" }}><b>Circuit {TopItems.number + 1}</b></span>
                                        <div style={{ float: 'right' }}>
                                            <div style={{ display: 'inline-block' }}>Cycles</div>
                                            <div style={{ display: 'inline-block' }} >
                                                <CSelect custom name="select" id="select" style={{ width: "236px" }} value={TopItems.Cycles} onChange={this.onChnageCircuitExerciseCycles.bind(this, TopItems)}>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </CSelect>
                                            </div>
                                            <div style={{ display: 'inline-block', marginLeft:'15px' }}>
                                                <a onClick={this.removeEntireCircuitItem.bind(this, TopIndex)}>
                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 2, width: '70%' }} src={remove_exercise} />
                                                </a>
                                            </div>
                                        </div>
                                    </CListGroupItem>
                                    <ReactSortable
                                        list={items}
                                        setList={newState => (this.setState({
                                            ['subCircuit_' + TopIndex]: newState
                                        }))}
                                        group={{ name: "cloning-group-name" }}
                                        handle=".handle"
                                        animation={150}
                                        onEnd={this.printChange.bind(this, "circuit")}
                                    >
                                        {items && items.map((item, subIndex) => {
                                            return (
                                                <CListGroupItem key={subIndex}>
                                                    {(item.flag == "exercise") && <CRow>
                                                        {/* <CCol lg={1}><img src={this.state.exercise_icon} width="35%" /></CCol> */}
                                                        <CCol lg={4} >
                                                            <CInput type="email" style={{ cursor: "pointer" }} placeholder="Exercise Title" value={item.title} onClick={this.onShowModalCircuit.bind(this, item, TopItems, "two")} />
                                                        </CCol>
                                                        <CCol lg={8} >
                                                            <div style={{ float: 'right' }}>
                                                                <div style={{ display: 'inline-block' }}>
                                                                    <CSelect custom name="select" id="select" value={item.Reps} onChange={this.onChangesCardRepsDropItem.bind(this, TopItems, item)}>
                                                                        <option value="Reps">Reps</option>
                                                                        <option value="Seconds">Seconds</option>
                                                                    </CSelect>
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>Sets</div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CInput type="email" id="date-input" name="date-input" placeholder="4" style={{ width: "70px" }} value={item.Sets} onChange={this.onChangeCardSets.bind(this, TopItems, item)} />
                                                                </div>

                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rep Count</div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CInput type="email" id="date-input" name="date-input" placeholder="45" style={{ width: "70px" }} value={item.RepsCount} onChange={this.onChangeCardRepsCount.bind(this, TopItems, item)} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rest </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CSelect custom name="select" id="select" style={{ width: "90px" }} value={item.RestTime} onChange={this.onChangeCardRestTime.bind(this, TopItems, item)}>
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
                                                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeCardAutoPlaySwitch.bind(this, TopItems, item)} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <a onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)} >Del </CButton> */}
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>}
                                                    {(item.flag == "rest") && <CRow>
                                                        <CCol lg={1}><img src={this.state.rest_icon} width="35%" /></CCol>
                                                        <CCol lg={4} >
                                                            <CInput className="form-control" id="bcc2" type="email" placeholder="Timer title" style={{ marginLeft: "-15%" }} value={item.title} onChange={this.onChangeCardTitle.bind(this, TopItems, item)} /><br />
                                                        </CCol>
                                                        <CCol lg={1}>
                                                            <CSelect custom name="select" id="select" style={{ width: "87px", marginLeft: "-75%" }} value={item.RestTime} onChange={this.onChangeCardRestTime.bind(this, TopItems, item)}>
                                                                <option value="5">5 Secs</option>
                                                                <option value="10">10 Secs</option>
                                                                <option value="15">15 Secs</option>
                                                                <option value="20">20 Secs</option>
                                                                <option value="30">30 Secs</option>
                                                                <option value="45">45 Secs</option>
                                                                <option value="60">1 minutes</option>
                                                                <option value="90">1 minutes 30 Secs</option>
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol lg={6}>
                                                            <div style={{ float: 'right' }}>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                                                    Auto Play Next Card   </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeCardAutoPlaySwitch.bind(this, TopItems, item)} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <a onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)} >Del </CButton> */}
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>}
                                                    {(item.flag == "note") && <CRow>
                                                        <CCol lg={1}><img src={this.state.note_icon} width="35%" /></CCol>
                                                        <CCol lg={4} >
                                                            <CTextarea
                                                                name="textarea-input"
                                                                id="textarea-input"
                                                                rows="3"
                                                                placeholder="Add Note"
                                                                style={{ marginLeft: "-15%", width: '100%' }}
                                                                value={item.title}
                                                                onChange={this.onChangeCardTitle.bind(this, TopItems, item)}
                                                            />
                                                            <CFormText className="help-block">300 characters max</CFormText>
                                                        </CCol>
                                                        <CCol lg={7}>
                                                            <div style={{ float: 'right' }}>
                                                                {/* <div style={{ display: 'inline-block', marginLeft: '25px', textAlign: 'center' }}>
                                                                    Auto Play Next Card    </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '25px' }}>
                                                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked />
                                                                </div> */}
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <a onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)} >Del </CButton> */}
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>}
                                                    {(item.flag == "video") &&
                                                        <CRow>
                                                            <CCol lg={1}><img src={this.state.video_icon} width="35%" /></CCol>
                                                            <CCol lg={4} >
                                                                <div>
                                                                    <div style={{ display: 'inline-block', marginLeft: '-15%', width: "100%" }}>
                                                                        <CInput className="form-control" id="bcc2" type="email" placeholder="Video title"
                                                                            value={item.title}
                                                                            onChange={this.onChangeCardTitle.bind(this, TopItems, item)} /><br />
                                                                        <CTextarea
                                                                            name="textarea-input"
                                                                            id="textarea-input"
                                                                            rows="3"
                                                                            placeholder="Description"
                                                                            value={item.description}
                                                                            onChange={this.onChangeCardDescription.bind(this, TopItems, item)}
                                                                        />
                                                                        <CFormText className="help-block">300 characters max</CFormText>
                                                                    </div>
                                                                </div>
                                                            </CCol>
                                                            <CCol lg={7}>
                                                                <div style={{ float: 'right' }}>
                                                                    <input id="myInput" type="file" ref={(ref) => this.myInput100 = ref} style={{ display: 'none' }} onChange={this.onChangeCardFile.bind(this, TopItems, item)} />
                                                                    <div style={{ display: 'inline-block' }}>
                                                                        <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" style={{ width: "280px" }} value={item.fileName} onClick={(e) => this.myInput100.click()} />
                                                                    </div>
                                                                    <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                        <CButton type="button" color="info" onClick={(e) => this.myInput100.click()}>Upload Video</CButton>
                                                                    </div>
                                                                    <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                                                        Auto Play Next Card  </div>
                                                                    <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                        <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeCardAutoPlaySwitch.bind(this, TopItems, item)} />
                                                                    </div>
                                                                    <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                        <a onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)}>
                                                                            <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                        </a>
                                                                        {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeCircuitItem.bind(this, TopIndex, subIndex)} >Del </CButton> */}
                                                                    </div>
                                                                    <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                    </div>
                                                                </div>
                                                            </CCol>
                                                        </CRow>}
                                                </CListGroupItem>
                                            )
                                        })
                                        }</ReactSortable>
                                    <CListGroupItem  >
                                        <CButton type="button" color="info" variant="ghost" onClick={this.onAddCircuitHomeExercise.bind(this, TopItems)}> +Add Exercise Card</CButton>
                                        <CButton type="button" color="info" variant="ghost" style={{ marginLeft: '25px' }} onClick={this.onAddCircuitNoteExercise.bind(this, TopItems)}> +Add Note Card</CButton>
                                        <CButton type="button" color="info" variant="ghost" style={{ marginLeft: '25px' }} onClick={this.onAddCircuitRestExercise.bind(this, TopItems)}> +Add Rest Card</CButton>
                                        <CButton type="button" color="info" variant="ghost" style={{ marginLeft: '25px' }} onClick={this.onAddCircuitVideoExercise.bind(this, TopItems)}> +Add Video Card</CButton>
                                    </CListGroupItem>
                                </CListGroup> <br />
                            </div>
                        )
                    })
                    }
                    <br />




                    <CListGroup>
                        {/* <CListGroupItem href="#" style={{ backgroundColor: "#f2f2f2" }}>
                            <span style={{ textSize: "35px" }}><b>Exercise  </b></span>
                        </CListGroupItem> */}
                        <ReactSortable
                            list={this.state.addCustomArray}
                            setList={newState => this.setState({ addCustomArray: newState })}
                            group={{ name: "cloning-group-name" }}
                            handle=".handle"
                            animation={150}
                            onEnd={this.printChange.bind(this, "exercise")}
                        >
                            {
                                this.state.addCustomArray.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                (item.flag == "exercise") &&
                                                <CListGroupItem    >
                                                    <CRow>
                                                        <CCol lg={1}><img src={this.state.exercise_icon} width="35%" /></CCol>
                                                        <CCol lg={3} >
                                                            <CInput type="email" style={{ cursor: "pointer", marginLeft: "-15%" }} placeholder="Exercise Title" value={item.title} onClick={this.onShowModalExercise.bind(this, item, "one")} />
                                                        </CCol>
                                                        <CCol lg={8} >
                                                            <div style={{ float: 'right' }}>
                                                                <div style={{ display: 'inline-block' }}>
                                                                    <CSelect custom name="select" id="select" value={item.Reps}
                                                                        onChange={this.onChangeDividesCardReps.bind(this, item)} >
                                                                        <option value="Reps">Reps</option>
                                                                        <option value="Seconds">Seconds</option>
                                                                    </CSelect>
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>Sets</div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CInput type="email" id="date-input" name="date-input" placeholder="4" style={{ width: "70px" }} value={item.Sets}
                                                                        onChange={this.onChangeDividesCardSets.bind(this, item)} />
                                                                </div>

                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rep Count</div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CInput type="email" id="date-input" name="date-input" placeholder="45" style={{ width: "70px" }} value={item.RepsCount}
                                                                        onChange={this.onChangeDividesCardRepsCount.bind(this, item)} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rest </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CSelect custom name="select" id="select" style={{ width: "90px" }} value={item.RestTime}
                                                                        onChange={this.onChangeDividesCardRestTime.bind(this, item, "exercise")}>
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
                                                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "exercise")} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <a onClick={this.removeExerciseCardItem.bind(this, index, "exercise")}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeExerciseCardItem.bind(this, index, "exercise")} >Del </CButton> */}

                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CListGroupItem>
                                            }

                                            {
                                                (item.flag == "video") &&
                                                <CListGroupItem   >
                                                    <CRow>
                                                        <CCol lg={1}><img src={this.state.video_icon} width="35%" /></CCol>
                                                        <CCol lg={4} >
                                                            <div>
                                                                <div style={{ display: 'inline-block', marginLeft: '-15%', width: "100%" }}>
                                                                    <CInput className="form-control" id="bcc2" type="email" placeholder="Video title" value={item.title}
                                                                        onChange={this.onChangeDividesCardTitle.bind(this, item, "video")} /><br />
                                                                    <CTextarea
                                                                        name="textarea-input"
                                                                        id="textarea-input"
                                                                        rows="3"
                                                                        placeholder="Description"
                                                                        value={item.description}
                                                                        onChange={this.onChangeDividesCardDescription.bind(this, item)}
                                                                    />
                                                                    <CFormText className="help-block">300 characters max</CFormText>
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                        <CCol lg={7}>
                                                            <div style={{ float: 'right' }}>
                                                                <input id="myInput" type="file" ref={(ref) => this.myInput200 = ref} style={{ display: 'none' }} onChange={this.onChangeDividesCardFile.bind(this, item)} />
                                                                <div style={{ display: 'inline-block' }}>
                                                                    <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" style={{ width: "280px" }} value={item.fileName} onClick={(e) => this.myInput200.click()} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CButton type="button" color="info" onClick={(e) => this.myInput200.click()}>Upload Video</CButton>
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                                                    Auto Play Next Card  </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "video")} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <a onClick={this.removeExerciseCardItem.bind(this, index, "exercise")}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeExerciseCardItem.bind(this, index, "exercise")} >Del </CButton> */}

                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CListGroupItem>
                                            }

                                            {
                                                (item.flag == "rest") &&
                                                <CListGroupItem   >
                                                    <CRow>
                                                        <CCol lg={1}><img src={this.state.rest_icon} width="35%" /></CCol>
                                                        <CCol lg={4} >
                                                            <CInput className="form-control" id="bcc2" type="email" placeholder="Timer title" style={{ marginLeft: "-15%" }}
                                                                value={item.title}
                                                                onChange={this.onChangeDividesCardTitle.bind(this, item, "rest")} /><br />
                                                        </CCol>
                                                        <CCol lg={1}>
                                                            <CSelect custom name="select" id="select" style={{ width: "87px", marginLeft: "-75%" }} value={item.RestTime}
                                                                onChange={this.onChangeDividesCardRestTime.bind(this, item, "rest")}>
                                                                <option value="5">5 Secs</option>
                                                                <option value="10">10 Secs</option>
                                                                <option value="15">15 Secs</option>
                                                                <option value="20">20 Secs</option>
                                                                <option value="30">30 Secs</option>
                                                                <option value="45">45 Secs</option>
                                                                <option value="60">1 minutes</option>
                                                                <option value="90">1 minutes 30 Secs</option>
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol lg={6}>
                                                            <div style={{ float: 'right' }}>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                                                    Auto Play Next Card   </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "rest")} />
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <a onClick={this.removeExerciseCardItem.bind(this, index, "exercise")}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeExerciseCardItem.bind(this, index, "exercise")} >Del </CButton> */}
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CListGroupItem>
                                            }

                                            {
                                                (item.flag == "note") &&
                                                <CListGroupItem   >
                                                    <CRow>
                                                        <CCol lg={1}><img src={this.state.note_icon} width="35%" /></CCol>
                                                        <CCol lg={4} >
                                                            <CTextarea
                                                                name="textarea-input"
                                                                id="textarea-input"
                                                                rows="3"
                                                                placeholder="Add Note"
                                                                style={{ marginLeft: "-15%", width: '100%' }}
                                                                value={item.title}
                                                                onChange={this.onChangeDividesCardTitle.bind(this, item, "note")}
                                                            />
                                                            <CFormText className="help-block">300 characters max</CFormText>
                                                        </CCol>
                                                        <CCol lg={7}>
                                                            <div style={{ float: 'right' }}>
                                                                {/* <div style={{ display: 'inline-block', marginLeft: '25px', textAlign: 'center' }}>
                                                                Auto Play Next Card    </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '25px' }}>
                                                                <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked />
                                                            </div> */}
                                                                <div style={{ display: 'inline-block', marginLeft: '25px' }}>
                                                                    <a onClick={this.removeExerciseCardItem.bind(this, index, "exercise")}>
                                                                        <img className="handle" style={{ cursor: "pointer", marginBottom: 22, width: '70%' }} src={remove_exercise} />
                                                                    </a>
                                                                    {/* <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeExerciseCardItem.bind(this, index, "exercise")} >Del </CButton> */}
                                                                </div>
                                                                <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                                                                    <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CListGroupItem>
                                            }
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </ReactSortable>
                    </CListGroup><br />


                    {/* 

                    
                        <ReactSortable
                            list={this.state.addExerciseArray}
                            setList={newState => this.setState({ addExerciseArray: newState })}
                            group={{ name: "cloning-group-name" }}
                            handle=".handle"
                            animation={150}
                            onEnd={this.printChange.bind(this, "exercise")}
                        >
                            {
                                this.state.addExerciseArray.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <CListGroupItem    >
                                                <CRow>
                                                    <CCol lg={1}><img src={this.state.exercise_icon} width="35%" /></CCol>
                                                    <CCol lg={3} >
                                                        <CInput type="email" style={{ cursor: "pointer", marginLeft: "-15%" }} placeholder="Exercise Title" value={item.title} onClick={this.onShowModalExercise.bind(this, item, "one")} />
                                                    </CCol>
                                                    <CCol lg={8} >
                                                        <div style={{ float: 'right' }}>
                                                            <div style={{ display: 'inline-block' }}>
                                                                <CSelect custom name="select" id="select" value={item.Reps}
                                                                    onChange={this.onChangeDividesCardReps.bind(this, item)} >
                                                                    <option value="Reps">Reps</option>
                                                                    <option value="Seconds">Seconds</option>
                                                                </CSelect>
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>Sets</div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CInput type="email" id="date-input" name="date-input" placeholder="4" style={{ width: "70px" }} value={item.Sets}
                                                                    onChange={this.onChangeDividesCardSets.bind(this, item)} />
                                                            </div>

                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rep Count</div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CInput type="email" id="date-input" name="date-input" placeholder="45" style={{ width: "70px" }} value={item.RepsCount}
                                                                    onChange={this.onChangeDividesCardRepsCount.bind(this, item)} />
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}> Rest </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CSelect custom name="select" id="select" style={{ width: "90px" }} value={item.RestTime}
                                                                    onChange={this.onChangeDividesCardRestTime.bind(this, item, "exercise")}>
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
                                                                <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "exercise")} />
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeOtherExerciseItem.bind(this, index, "exercise")}
                                                                >Del  </CButton>
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            </CListGroupItem>
                                        </div>
                                    )
                                })
                            }
                        </ReactSortable>
                    </CListGroup><br />

                    <CListGroup>
                        <ReactSortable
                            list={this.state.addVideoArray}
                            setList={newState => this.setState({ addVideoArray: newState })}
                            group={{ name: "cloning-group-name" }}
                            handle=".handle"
                            animation={150}
                            onEnd={this.printChange.bind(this, "video")}
                        >
                            {
                                this.state.addVideoArray.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <CListGroupItem   >
                                                <CRow>
                                                    <CCol lg={1}><img src={this.state.video_icon} width="35%" /></CCol>
                                                    <CCol lg={4} >
                                                        <div>
                                                            <div style={{ display: 'inline-block', marginLeft: '-15%', width: "100%" }}>
                                                                <CInput className="form-control" id="bcc2" type="email" placeholder="Video title" value={item.title}
                                                                    onChange={this.onChangeDividesCardTitle.bind(this, item, "video")} /><br />
                                                                <CTextarea
                                                                    name="textarea-input"
                                                                    id="textarea-input"
                                                                    rows="3"
                                                                    placeholder="Description"
                                                                    value={item.description}
                                                                    onChange={this.onChangeDividesCardDescription.bind(this, item)}
                                                                />
                                                                <CFormText className="help-block">300 characters max</CFormText>
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                    <CCol lg={7}>
                                                        <div style={{ float: 'right' }}>
                                                            <input id="myInput" type="file" ref={(ref) => this.myInput200 = ref} style={{ display: 'none' }} onChange={this.onChangeDividesCardFile.bind(this, item)} />
                                                            <div style={{ display: 'inline-block' }}>
                                                                <CInput className="form-control" id="bcc2" type="email" placeholder="Browse Files" style={{ width: "280px" }} value={item.fileName} onClick={(e) => this.myInput200.click()} />
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CButton type="button" color="info" onClick={(e) => this.myInput200.click()}>Upload Video</CButton>
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                                                Auto Play Next Card  </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "video")} />
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeOtherExerciseItem.bind(this, index, "video")}
                                                                >Del  </CButton>
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            </CListGroupItem>
                                        </div>
                                    )
                                })
                            }</ReactSortable>
                    </CListGroup><br /> 

                    <CListGroup>
                        <ReactSortable
                            list={this.state.addRestArray}
                            setList={newState => this.setState({ addRestArray: newState })}
                            group={{ name: "cloning-group-name" }}
                            handle=".handle"
                            animation={150}
                            onEnd={this.printChange.bind(this, "rest")}
                        >
                            {
                                this.state.addRestArray.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <CListGroupItem   >
                                                <CRow>
                                                    <CCol lg={1}><img src={this.state.rest_icon} width="35%" /></CCol>
                                                    <CCol lg={4} >
                                                        <CInput className="form-control" id="bcc2" type="email" placeholder="Timer title" style={{ marginLeft: "-15%" }}
                                                            value={item.title}
                                                            onChange={this.onChangeDividesCardTitle.bind(this, item, "rest")} /><br />
                                                    </CCol>
                                                    <CCol lg={1}>
                                                        <CSelect custom name="select" id="select" style={{ width: "87px", marginLeft: "-75%" }} value={item.RestTime}
                                                            onChange={this.onChangeDividesCardRestTime.bind(this, item, "rest")}>
                                                            <option value="5">5 Secs</option>
                                                            <option value="10">10 Secs</option>
                                                            <option value="15">15 Secs</option>
                                                            <option value="20">20 Secs</option>
                                                            <option value="30">30 Secs</option>
                                                            <option value="45">45 Secs</option>
                                                            <option value="60">1 minutes</option>
                                                            <option value="90">1 minutes 30 Secs</option>
                                                        </CSelect>
                                                    </CCol>
                                                    <CCol lg={6}>
                                                        <div style={{ float: 'right' }}>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px', textAlign: 'center' }}>
                                                                Auto Play Next Card   </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CSwitch className={'mx-1'} shape={'pill'} color={'info'} checked={item.AutoPlay == "checked"} onChange={this.onChangeDividesCardAutoPlaySwitch.bind(this, item, "rest")} />
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeOtherExerciseItem.bind(this, index, "rest")}
                                                                >Del  </CButton>
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                                                                <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            </CListGroupItem>
                                        </div>
                                    )
                                })
                            }</ReactSortable>
                    </CListGroup><br />


                    <CListGroup>
                        <ReactSortable
                            list={this.state.addNoteArray}
                            setList={newState => this.setState({ addNoteArray: newState })}
                            group={{ name: "cloning-group-name" }}
                            handle=".handle"
                            animation={150}
                            onEnd={this.printChange.bind(this)}
                        >
                            {
                                this.state.addNoteArray.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <CListGroupItem   >
                                                <CRow>
                                                    <CCol lg={1}><img src={this.state.note_icon} width="35%" /></CCol>
                                                    <CCol lg={4} >
                                                        <CTextarea
                                                            name="textarea-input"
                                                            id="textarea-input"
                                                            rows="3"
                                                            placeholder="Add Note"
                                                            style={{ marginLeft: "-15%", width: '100%' }}
                                                            value={item.title}
                                                            onChange={this.onChangeDividesCardTitle.bind(this, item, "note")}
                                                        />
                                                        <CFormText className="help-block">300 characters max</CFormText>
                                                    </CCol>
                                                    <CCol lg={7}>
                                                        <div style={{ float: 'right' }}>                                                            
                                                            <div style={{ display: 'inline-block', marginLeft: '25px' }}>
                                                                <CButton color="danger" style={{ marginBottom: 22 }} onClick={this.removeOtherExerciseItem.bind(this, index, "note")}
                                                                >Del  </CButton>
                                                            </div>
                                                            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                                                                <img className="handle" style={{ cursor: "pointer", marginBottom: 22 }} src={drop_drag_icon} />
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            </CListGroupItem>
                                        </div>
                                    )
                                })
                            }</ReactSortable>
                    </CListGroup><br /> */}



                </React.Fragment>


                <CRow className="align-items-center mt-3" style={{ marginBottom: "100px" }}>
                    <CCol col="2" className="text-center mt-3">
                        <CButton size="lg" block color="info" onClick={this.onAddCircuit}>
                            Add Circuit
                </CButton>
                    </CCol>
                    <CCol col="2" className="text-center mt-3">
                        <CButton size="lg" block color="info" onClick={this.onAddCustomArray.bind(this, "exercise")} >
                            {/* <CButton size="lg" block color="info" onClick={this.onAddExercise} > */}
                            Add Exercise Card
                </CButton>
                    </CCol>
                    <CCol col="2" className="text-center mt-3">
                        {/* <CButton size="lg" block color="info" onClick={this.onAddRest}> */}
                        <CButton size="lg" block color="info" onClick={this.onAddCustomArray.bind(this, "rest")}>
                            Add Timer Card
                </CButton>
                    </CCol>
                    <CCol col="2" className="text-center mt-3">
                        {/* <CButton size="lg" block color="info" onClick={this.onAddNote}> */}
                        <CButton size="lg" block color="info" onClick={this.onAddCustomArray.bind(this, "note")}>
                            Add Note Card
                </CButton>
                    </CCol>
                    <CCol col="2" className="text-center mt-3">
                        {/* <CButton size="lg" block color="info" onClick={this.onAddVideo}> */}
                        <CButton size="lg" block color="info" onClick={this.onAddCustomArray.bind(this, "video")}>
                            Add Video Card
                </CButton>
                    </CCol>
                </CRow>

                <CModal
                    show={this.state.modal}
                    onClose={this.onCloseExerciseModal}
                >
                    <CModalBody>
                        <CListGroup>
                            <CListGroupItem  >
                                <CRow>
                                    <CCol md="12">
                                        <CSelect custom name="select" id="select" onChange={this.onSelectTopExercise} value={this.state.selectedItem} >
                                            <option value="default" disabled >please selet a item</option>
                                            <option value="All" style={{ fontSize: "18px", fontWeight: "bold" }} >All Library</option>
                                            {
                                                this.state.ExerciseTopLevelSelectOptionsArray.map((item, key) => {
                                                    if (item.select == "") {
                                                        return (
                                                            <option value={item.option} disabled={item.select} key={key} style={{ fontSize: "18px", fontWeight: "bold" }}>{item.option}</option>
                                                        )
                                                    } else {
                                                        return (
                                                            <option value={item.option} disabled={item.select} key={key} >&nbsp;&nbsp;&nbsp;{item.option}</option>
                                                        )
                                                    }
                                                }
                                                )
                                            }
                                        </CSelect>
                                    </CCol>
                                    <CCol md="12">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <CInputGroup>
                                                    <CInputGroupPrepend>
                                                        <CButton type="button" color="info"><CIcon name="cil-magnifying-glass" /> </CButton>
                                                    </CInputGroupPrepend>
                                                    <CInput id="input1-group2" name="input1-group2" placeholder="Exercise Title" onChange={this.onSearchExerciseCardData} />
                                                </CInputGroup>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                {/* <div >
                                    <div style={{ display: 'inline-block' }}>
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <CInputGroup>
                                                    <CInputGroupPrepend>
                                                        <CButton type="button" color="info"><CIcon name="cil-magnifying-glass" /> </CButton>
                                                    </CInputGroupPrepend>
                                                    <CInput id="input1-group2" name="input1-group2" placeholder="Exercise Title" onChange={this.onSearchExerciseCardData} />
                                                </CInputGroup>
                                            </CCol>
                                        </CFormGroup>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <CSelect custom name="select" id="select" onChange={this.onSelectTopExercise} value={this.state.selectedItem} >
                                            <option value="default" disabled >please selet a item</option>
                                            <option value="All" style={{ fontSize: "18px", fontWeight: "bold" }} >All Library</option>
                                            {
                                                this.state.ExerciseTopLevelSelectOptionsArray.map((item, key) => {
                                                    if (item.select == "") {
                                                        return (
                                                            <option value={item.option} disabled={item.select} key={key} style={{ fontSize: "18px", fontWeight: "bold" }}>{item.option}</option>
                                                        )
                                                    } else {
                                                        return (
                                                            <option value={item.option} disabled={item.select} key={key} >&nbsp;&nbsp;&nbsp;{item.option}</option>
                                                        )
                                                    }
                                                }
                                                )
                                            }
                                        </CSelect>
                                    </div>
                                </div> */}
                                {/* {item.select} */}
                                <br /><br />

                                <CListGroup>
                                    {this.state.ExerciseCardSearchArray.map((item, key) => {
                                        return (
                                            <CListGroupItem href="#" onClick={this.onSelectExerciseCardImage.bind(this, item)} key={key}>
                                                {item.exerciseName}
                                                {(item.showImageFlag) && <img src={Check_icon} style={{ float: 'right' }} width="8%" />}
                                            </CListGroupItem>
                                        )
                                    })}
                                </CListGroup>

                            </CListGroupItem>
                        </CListGroup>
                    </CModalBody>
                </CModal>

            </div >
        )
    }
}

export default NewPlantask;
