export const Config = {}

Config.host = "http://127.0.0.1:3000"
// Config.host = "https://dashchallengesapi.com"
Config.authentication = {
    loginUrl: "/mobileapi/userLogin",
    tokenConfirm: "/mobileapi/TokenConfirm",
    signupUrl: "/mobileapi/userapi"
}

Config.user = {
    User_CRUD_Url: "/mobileapi/userapi",
}

Config.Challenges = {
    Challenges_CRUD_Url: "/mobileapi/challengesapi",
}

Config.Cards = {
    Cards_CRUD_Url: "/adminapi/cardapi",
    Cards_add_exercise_data_Url: "/adminapi/addCardExerciseData",
}

Config.post = {
    Posts_CRUD_Url: "/mobileapi/postapi",
    delete_Commit_Url: "/mobileapi/delPostCommit",
    edit_Commit_Url: "/mobileapi/addPostCommit",
}

Config.Plan = {
    Plans_CRUD_Url: "/adminapi/planapi",
    delete_Plan_Version_Url: "/adminapi/deletePlanNewVersionData",
    add_Plan_Version_Url: "/adminapi/addPlanNewVersionData",
    Plan_Version_CRUD_Url: "/adminapi/PlanVersionapi",
    Add_Plan_Version_Day_Task_Url: "/adminapi/addPlanVersionDayNewTask",
    Add_Plan_New_Version_Data_Url: "/adminapi/addPlanNewVersionData",
    Edit_Plan_Version_Day_Task_Url: "/adminapi/editPlanVersionDayNewTask",
    edit_All_planVersionDayTaskData_Url: "/adminapi/editAllPlanVersionDayNewTask",
    edit_All_planVersionDayTaskCardData_Url: "/adminapi/editAllPlanVersionDayTaskCard",
    delete_Commit_Url: "/mobileapi/delPostCommit",
    add_VideoExercise_file: "/adminapi/editPlanVersionDayNewTaskVideoFileSave",

}

