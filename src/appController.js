
export default class AppController {
    constructor(view, taskService, projectService) {
        this.view = view;
        this.taskService = taskService;
        this.projectService = projectService;
        this.view.controller = this

    }

    printHola() {
        console.log("hola")
    }
    init() {
        this.controlProjectDisplay()
        this.controlTaskDisplay()
    }


    controlTaskDisplay() {
        const myTasks = this.taskService.getTasks()
        this.view.displayTasks(myTasks)
    }
    controlProjectDisplay() {
        this.upd
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

    controlCreateProject(projectId) {
        this.projectService.createProject(projectId)
        this.view.controlProject
    }
}