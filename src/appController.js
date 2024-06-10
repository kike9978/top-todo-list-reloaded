
export default class AppController {
    constructor(view, taskService, projectService) {
        this.view = view;
        this.taskService = taskService;
        this.projectService = projectService;
        this.view.controller = this
        this.currentProjectId = 0
        this.newTask = ""

    }

    init() {
        this.controlProjectDisplay()
        this.controlTaskDisplay()
    }


    controlTaskDisplay() {
        if (this.currentProjectId !== null) {
            const currentProjectIds = this.projectService.getCurrentProjectTasksIds(this.currentProjectId)
            console.log(currentProjectIds)
            const tasks = this.taskService.getCurrentProjectTasks(currentProjectIds)
            const pendingTasks = this.taskService.getPendingTasks(tasks)
            const completedTasks = this.taskService.getCompletedTasks(tasks)
            this.view.displayTasksContainer(pendingTasks, completedTasks)
        }
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

        this.addNewTask(this.taskService.createTask({ id: 3, title: "test", isCompleted: false }), 0)
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
        const currentProjecTasks = this.taskService.getCurrentProjectTasks(currentProjectTasksIds)
        this.updatePendingTasks(currentProjecTasks)
    }
}