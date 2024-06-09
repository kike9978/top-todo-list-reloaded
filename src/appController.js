
export default class AppController {
    constructor(view, taskService, projectService) {
        this.view = view;
        this.taskService = taskService;
        this.projectService = projectService;
        this.view.controller = this
        this.currentProjectId = null
        this.newTask = ""

    }

    init() {
        this.controlProjectDisplay()
        this.controlTaskDisplay()
    }


    controlTaskDisplay() {
        const myTasks = this.taskService.getTasks()
        this.view.displayTasksContainer(myTasks)
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
        const pendingTasks = this.taskService.getTasks()
        const completedTasks = this.taskService.getTasks()
        this.view.displayPendingTasks(pendingTasks)
        this.view.displayCompletedTasks(completedTasks)
    }

    handleTaskChange(taskId, taskData) {
        this.taskService.updateTask(taskId, taskData)
        this.updatePendingTasks()
    }

    handleAddTaskInput(newTask) {
        this.newTask = newTask
    }

    handleAddTaskClick() {
        if (this.newTask === "") {
            return
        }
        console.log("new task: ", this.newTask)
        this.newTask = ""

    }


    updatePendingTasks() {

        const pendingTasks = this.taskService.getPendingTasks()
        this.view.updatePendingTasks(pendingTasks, this.handleTaskChange.bind(this));
    }

    addNewTask(taskData, projectId) {
        this.taskService.createTask(taskData)
        this.projectService.addTaskToProject(projectId, taskData.id)
        this.updatePendingTasks()
    }
}