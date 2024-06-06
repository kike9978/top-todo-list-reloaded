export default class ProjectService {

    constructor() {
        this.myProjects = ["hola", "adios"]
    }

    getProjcets() {
        return this.myProjects
    }

    createProject(title) {
        this.myProjects = [...this.myProjects, title]
    }

    deleteProject(title) {
        this.myProjects = this.myProjects.filter(p => title !== p)
    }

    static currentProjectId = 0

    static getCurrentProjectId() {
        return ProjectService.currentProjectId
    }

    static setCurrentProjectId(nextId) {
        ProjectService.currentProjectId = nextId
    }

}