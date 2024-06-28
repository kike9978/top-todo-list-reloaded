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
            },
            {
                type: "project",
                id: 2,
            },
            {
                type: "project",
                id: 3,
            },
        ]
        this.assignedTasksLists = []


    }


    init() {
        /*  this.controlProjectDisplay() */
        this.generateAssignedTasksLists()
        this.generateProjectAndListArr()
        this.controlTaskDisplay()
        this.controlSideMenuDisplay()
    }

    generateProjectAndListArr() {
        this.projectsAndLists = this.projectsAndListsOrder.map(item => {

            if (item.type === "project") {
                return { ...this.projectService.getProjectbyId(item.id), type: "project" }
            }
            return { ...this.taskListService.getListById(item.id), type: "taskList" }
        })
    }

    generateAssignedTasksLists() {
        const projects = this.projectService.getProjects();

        const newAssignedTasksLists = projects.map(project => {
            const currentProjectTasksLists = project.assignedListIds.map(listId => {
                return this.taskListService.getListById(listId)
            })

            return { projectId: project.id, lists: currentProjectTasksLists }
        })

        this.assignedTasksLists = newAssignedTasksLists

    }



    controlTaskDisplay() {

        if (this.currentTaskListId !== null) {
            const currentTasks = this.getCurrentProjectTasksSeparated()
            this.view.displayTasksContainer(
                currentTasks.pendingTasks,
                currentTasks.completedTasks,
                { title: this.taskListService.getListById(this.currentTaskListId).title, id: this.currentTaskListId },
                this.projectService.getProjects()
            )
        }
    }


    controlSideMenuDisplay() {
        this.view.displaySideMenu(this.projectsAndLists)
    }


    getCurrentProjectTasksSeparated() {
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
        this.controlTaskDisplay()
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
        this.newTaskText = ""
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
        const currentTaskListTasks = this.taskService.getTaskListTasks(currentTaskListTasksIds)
        this.updatePendingTasks(currentTaskListTasks)
    }




    handleCreateProjectClick(project) {
        const nextId = generateId()
        this.currentProjectId = nextId
        const newProject = { id: nextId, title: project, assignedListIds: [] }
        this.controlCreateProject(newProject)
        this.projectsAndListsOrder = [...this.projectsAndListsOrder, { type: "project", id: nextId }]
        this.generateProjectAndListArr()
        this.generateAssignedTasksLists()
        this.controlUpdateProjectsAndListsContainer()
    }

    handleCreateListClick(list) {
        const nextId = generateId()
        const newTaskList = { id: nextId, title: list, assignedTasksIds: [] }
        this.currentTaskListId = nextId
        this.taskListService.createTaskList(newTaskList)
        this.projectsAndListsOrder = [...this.projectsAndListsOrder, { type: "taskList", id: nextId }]
        this.generateProjectAndListArr()
        this.generateAssignedTasksLists()
        this.controlTaskDisplay()
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
        this.taskService.deleteTask(taskId)
        this.taskListService.removeTaskFromList(taskId, this.currentTaskListId)
        this.controlTaskDisplay()
        this.controlUpdateProjectsAndListsContainer()
    }

    handleTaskListClick(taskListId) {
        this.currentTaskListId = taskListId
        this.controlTaskDisplay()
    }

    handleUpdtateTaskList(taskListId, newTaskListTitle = "Pompis") {

        const taskToUpdate = this.taskListService.getListById(taskListId)
        taskToUpdate.title = newTaskListTitle
        this.taskListService.updateTaskList({ ...taskToUpdate })
        this.generateProjectAndListArr()
        this.controlTaskDisplay()
        this.controlUpdateProjectsAndListsContainer()
    }

    handleUpdateProjectInput(projectId, newTitle) {
        const projectToUpdate = { ...this.projectService.getProjectbyId(projectId) }
        projectToUpdate.title = newTitle
        this.projectService.updateProject(projectToUpdate)
        this.generateProjectAndListArr()
        this.controlUpdateProjectsAndListsContainer()
    }

    handleUpdateListSubmit(listAndProjectAssignationData) {

        const updatedList = this.taskListService.getListById(listAndProjectAssignationData.id)
        updatedList.title = listAndProjectAssignationData.title
        this.taskListService.updateTaskList(updatedList)
        this.projectService.addTaskListToProject(listAndProjectAssignationData.id, Number(listAndProjectAssignationData.assignedProjectId))

        const isInProjectsAndLists = this.projectsAndListsOrder.some(item => {
            return item.id === listAndProjectAssignationData.id && item.type === "taskList"
        })

        if (isInProjectsAndLists) {
            this.removeItemFromProjectsAndListsOrder("taskList", listAndProjectAssignationData.id)
        }
        this.generateProjectAndListArr()
        this.generateAssignedTasksLists()
        this.controlUpdateProjectsAndListsContainer()
    }

    removeItemFromProjectsAndListsOrder(type, id) {
        this.projectsAndListsOrder = this.projectsAndListsOrder.filter(item => {

            return !(item.type === type && item.id === id)
        })

    }
}