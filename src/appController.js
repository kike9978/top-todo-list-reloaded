import generateId from "./utils/generateId";

export default class AppController {
    constructor(view, taskService, projectService, taskListService) {
        this.view = view;
        this.taskService = taskService;
        this.projectService = projectService;
        this.taskListService = taskListService
        this.view.controller = this
        this.currentProjectId = 0
        this.newTaskText = ""
        this.currentTaskListId = 0
        this.projectsAndLists = []
        this.projectsAndListsOrder = [
            {
                type: "project",
                id: 0,

            },
            {
                type: "taskList",
                id: 0
            },
            {
                type: "project",
                id: 1,
            }
        ]


    }


    init() {
        /*  this.controlProjectDisplay() */
        this.generateProjectAndListArr()
        this.controlTaskDisplay()
        this.controlSideMenuDisplay()
    }

    generateProjectAndListArr() {
        this.projectsAndLists = this.projectsAndListsOrder.map(item => {

            if (item.type === "project") {
                return { ...this.projectService.getProjectbyId(item.id), type: "project" }
            }
            return { ...this.taskListService.getListById(item.id), type: "list" }
        })
    }



    controlTaskDisplay() {
        if (this.currentProjectId !== null) {
            const currentTasks = this.getCurrentProjectTasksSeparated()
            this.view.displayTasksContainer(currentTasks.pendingTasks, currentTasks.completedTasks, this.taskListService.getListById(this.currentTaskListId).title)
        }
    }


    controlSideMenuDisplay() {
        console.log(this.projectsAndLists)
        this.view.displaySideMenu(this.projectsAndLists)
    }


    getCurrentProjectTasksSeparated() {
        console.log(this.taskListService)
        const currentTaskListsTasksIds = this.taskListService.getListById(this.currentTaskListId).getAssignedTasksIds()
        const tasks = this.taskService.getTaskListTasks(currentTaskListsTasksIds)
        const pendingTasks = this.taskService.getPendingTasks(tasks)
        const completedTasks = this.taskService.getCompletedTasks(tasks)
        return { pendingTasks, completedTasks }
    }




    controlGetProjects() {
        this.projectService.getProjects()
    }

    contolGetTasks() {
        this.taskService.getTasks()
    }

    controlUpdateProjectTitle(projectId, newTitle) {
        this.projectService.updateProjectTitle(projectId, newTitle)
    }

    controlUpdateTask(taskId, taskData) {
        this.taskService.updateTask(taskId, taskData)
    }

    controlCreateProject(projectId) {
        this.projectService.createProject(projectId)
        this.view.controlProject
    }
    controlTest() {
        this.view.taskContainer.test()
    }

    controlToggleTask(taskId) {
        this.taskService.toggleTask(taskId)
        const tasks = this.taskService.getTasks()
        const pendingTasks = this.taskService.getPendingTasks(tasks)
        const completedTasks = this.taskService.getCompletedTasks(tasks)
        this.view.displayPendingTasks(pendingTasks)
        this.view.displayCompletedTasks(completedTasks)
    }

    handleTaskChange(taskId, taskData) {
        const updatedTask = {
            ...taskData, isCompleted: !taskData.isCompleted
        }
        this.taskService.updateTask(taskId, updatedTask)
        const currentTasks = this.getCurrentProjectTasksSeparated()
        this.view.displayTasksContainer(currentTasks.pendingTasks, currentTasks.completedTasks, this.taskListService.getListById(this.currentTaskListId).title)
    }

    handleAddTaskInput(newTask) {
        this.newTaskText = newTask
    }

    handleAddTaskClick() {
        if (this.newTaskText === "") {
            return
        }
        const nextId = generateId()
        const newTask = { id: nextId, title: this.newTaskText, isCompleted: false }
        this.addNewTask(newTask, this.currentTaskListId)
        console.log("myTodos: ", this.taskService.myTodos)
        this.newTaskText = ""
        console.log(this.projectService.getProjectbyId(this.currentProjectId))
        /* console.log(this.getCurrentProjectTasks()) */
        this.view.updateProjectsAndListsContainer()

    }
    updatePendingTasks(tasks) {

        const pendingTasks = this.taskService.getPendingTasks(tasks)
        this.view.updatePendingTasks(pendingTasks, this.handleTaskChange.bind(this));
    }

    addNewTask(taskData, taskListId) {
        this.taskService.createTask(taskData)
        this.taskListService.addTaskToList(taskData.id, taskListId)
        const currentTaskListTasksIds = this.taskListService.getTaskListTasksIds(this.currentTaskListId)
        console.log(currentTaskListTasksIds)
        this.updatePendingTasks(currentTaskListTasksIds)
    }

    handleProjectClick(projectId) {
        this.currentProjectId = projectId
        this.controlTaskDisplay()
    }

    handleCreateProjectClick(project) {
        const nextId = generateId()
        this.currentProjectId = nextId
        const newProject = { id: nextId, title: project, assignedTasksIds: [] }
        this.controlCreateProject(newProject)
        this.projectsAndListsOrder = [...this.projectsAndListsOrder, { type: "project", id: nextId }]
        this.generateProjectAndListArr()
        console.log(this.projectService.getProjects())
        console.log(this.projectsAndLists)
        this.controlUpdateProjectsAndListsContainer()
    }
    /*  controlProjectDisplay() {
         const myProjects = this.projectService.getProjects()
         this.view.displayProjects(myProjects)
     } */

    controlUpdateProjectsAndListsContainer() {
        this.view.updateProjectsAndListsContainer()
    }

    getCurrentProjectTasks() {
        const currentProjectTasksIds = this.projectService.getCurrentProjectTasksIds(this.currentProjectId)
        return this.taskService.getCurrentProjectTasks(currentProjectTasksIds)
    }

    handleDeleteTaskClick(taskId) {
        console.log(taskId)
        this.taskService.deleteTask(taskId)
        this.taskListService.removeTaskFromList(taskId, this.currentTaskListId)
        console.log(this.taskListService.getListById(this.currentProjectId))
        this.controlTaskDisplay()
        this.controlUpdateProjectsAndListsContainer()
    }
}