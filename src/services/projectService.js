import data from "../data/data"
import Project from "../models/Project"

export default class ProjectService {

    constructor() {
        this.myProjects = data.projects.map(project => new Project(project.id, project.title, project.assignedTasksIds))
    }

    getProjects() {
        return this.myProjects
    }

    createProject(project) {
        this.myProjects = [...this.myProjects, project]
    }

    deleteProject(title) {
        this.myProjects = this.myProjects.filter(p => title !== p)
    }

    getProjectbyId(projectId) {
        return this.myProjects.find(p => p.id === projectId)
    }

    updateProject(projectId, newProject) {
        this.myProjects = this.myProjects.map(p => {
            if (p.id === projectId) {
                return new Project(projectId, newProject.title, newProject.assignedTasksIds)
            }
            else {
                return p
            }
        })
    }

    updateProjectTitle(projectId, newTitle) {

        const projectToUpdate = this.getProjectbyId(projectId)
        const updatedProject = new Project(projectId, newTitle, projectToUpdate.assignedTasksIds)

        this.updateProject(projectId, updatedProject)

    }

    static currentProjectId = 0

    static getCurrentProjectId() {
        return ProjectService.currentProjectId
    }

    static setCurrentProjectId(nextId) {
        ProjectService.currentProjectId = nextId
    }

}