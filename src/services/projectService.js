import data from "../data/data"
import Project from "../models/Project"

export default class ProjectService {

    constructor() {
        this.myProjects = data.projects.map(project => new Project(project.id, project.title, project.assignedListIds))
    }

    getProjects() {
        return this.myProjects
    }

    createProject(project) {
        this.myProjects = [...this.myProjects, new Project(project.id, project.title, [])]
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
                return new Project(projectId, newProject.title, newProject.assignedListIds)
            }
            else {
                return p
            }
        })
    }

    addTaskToProject(taskId, projectId) {


        this.myProjects = this.myProjects.map(project => {
            if (project.id === projectId) {
                return { ...project, assignedListIds: [...project.assignedListIds, taskId] }
            }
            else {
                return project
            }
        })

    }
    removeTaskFromProject(taskId, projectId) {
        this.myProjects = this.myProjects.map(project => {
            if (project.id === projectId) {

                const newAssignedTasksIds = project.assignedListIds.filter(id => {
                    return id !== taskId
                })

                return { ...project, assignedListIds: newAssignedTasksIds }
            }
            else {
                return project
            }
        })
    }

    /* getCurrentProjectTasksIds(projectId) {
        const currentProjectTasksIds = this.getProjectbyId(projectId).assignedListIds
        return currentProjectTasksIds
    } */

    getProjectTaskListsIds(projectId) {
        const currentProject = this.getProjectbyId(projectId)
        const projectTasksListsIds = currentProject.assignedListIds
        return projectTasksListsIds
    }

    updateProjectTitle(projectId, newTitle) {

        const projectToUpdate = this.getProjectbyId(projectId)
        const updatedProject = new Project(projectId, newTitle, projectToUpdate.assignedListIds)

        this.updateProject(projectId, updatedProject)

    }

}