
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
    }

    controlProjectDisplay() {
        const myProjects = this.projectService.getProjects()
        console.log(myProjects)
        this.view.displayProjects(myProjects)
    }
    controlGetProjects() {
        this.projectService.getProjects()
    }

    contolGetTasks() {
        this.taskService.getTasks()
    }

    controlCreateProject(projectId) {
        this.projectService.createProject(projectId)
        this.view.controlProject
    }
}