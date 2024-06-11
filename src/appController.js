import generateId from "./utils/generateId";

export default class AppController {
    constructor(view, taskService, projectService) {
        this.view = view;
        this.taskService = taskService;
        this.projectService = projectService;
        this.view.controller = this
        this.currentProjectId = 0
        this.newTaskText = ""

    }

    init() {
        this.controlProjectDisplay()
        this.controlTaskDisplay()
    }


    controlTaskDisplay() {
        if (this.currentProjectId !== null) {
            const currentTasks = this.getCurrentProjectTasksSeparated()
            this.view.displayTasksContainer(currentTasks.pendingTasks, currentTasks.completedTasks)
        }
    }

    getCurrentProjectTasksSeparated() {
        const currentProjectIds = this.projectService.getCurrentProjectTasksIds(this.currentProjectId)
        const tasks = this.taskService.getCurrentProjectTasks(currentProjectIds)
        const pendingTasks = this.taskService.getPendingTasks(tasks)
        const completedTasks = this.taskService.getCompletedTasks(tasks)
        console.log()

        return { pendingTasks, completedTasks }
    }


    controlProjectDisplay() {
        const myProjects = this.projectService.getProjects()
        this.view.displayProjects(myProjects)
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
        this.view.displayTasksContainer(currentTasks.pendingTasks, currentTasks.completedTasks)
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
        this.addNewTask(newTask, this.currentProjectId)
        console.log(this.taskService.myTodos)
        this.newTaskText = ""
        console.log(this.projectService.getProjectbyId(this.currentProjectId))
        console.log(this.getCurrentProjectTasks())
        this.controlProjectDisplay()

    }
    updatePendingTasks(tasks) {

        const pendingTasks = this.taskService.getPendingTasks(tasks)
        this.view.updatePendingTasks(pendingTasks, this.handleTaskChange.bind(this));
    }

    addNewTask(taskData, projectId) {
        this.taskService.createTask(taskData)
        this.projectService.addTaskToProject(taskData.id, projectId)
        const currentProjectTasksIds = this.projectService.getCurrentProjectTasksIds(projectId)
        const currentProjectTasks = this.taskService.getCurrentProjectTasks(currentProjectTasksIds)
        this.updatePendingTasks(currentProjectTasks)
    }

    handleProjectClick(projectId) {
        this.currentProjectId = projectId
        this.controlTaskDisplay()
    }

    handleCreateProjectClick(project) {
        const nextId = generateId()

        const newProject = { id: nextId, title: project, assignedTasksIds: [] }
        this.controlCreateProject(newProject)
        this.controlProjectDisplay()
    }

    getCurrentProjectTasks() {
        const currentProjectTasksIds = this.projectService.getCurrentProjectTasksIds(this.currentProjectId)
        return this.taskService.getCurrentProjectTasks(currentProjectTasksIds)
    }

    handleDeleteTaskClick(taskId) {
        console.log(taskId)
        this.taskService.deleteTask(taskId)
        this.controlTaskDisplay()
        //delete task id from project
    }
}