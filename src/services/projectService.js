import Project from "../models/Project"
import LocalStorage from "../local-storage/localStorage"


export default class ProjectService {

    constructor() {
        this.myLocalStorage = new LocalStorage()
        this.myProjects = JSON.parse(localStorage.getItem("projects")).map(project => new Project({ assignedListIds: project.assignedListIds, id: project.id, title: project.title }))
    }

    getProjects() {
        return this.myProjects
    }

    createProject(project) {
        const nextProjects = [...this.myProjects, new Project({ id: project.id, title: project.title, assignedListIds: [] })]
        this.myProjects = nextProjects
        this.myLocalStorage.updateProjects(nextProjects)
    }

    deleteProject(title) {
        const nextProjects = this.myProjects.filter(p => title !== p)
        this.myProjects = nextProjects
        this.myLocalStorage.updateProjects(nextProjects)
    }

    getProjectbyId(projectId) {
        return this.myProjects.find(p => p.id === projectId)
    }

    updateProject(projectId, newProject) {
        const nextProjects = this.myProjects.map(p => {
            if (p.id === projectId) {
                return new Project({ id: projectId, title: newProject.title, assignedListIds: newProject.assignedListIds })
            }
            else {
                return p
            }
        })
        this.myProjects = nextProjects
        this.myLocalStorage.updateProjects(nextProjects)
    }

    getProjectTaskListsIds(projectId) {
        const currentProject = this.getProjectbyId(projectId)
        const projectTasksListsIds = currentProject.assignedListIds
        return projectTasksListsIds
    }

    updateProjectTitle(projectId, newTitle) {
        const projectToUpdate = this.getProjectbyId(projectId)
        const updatedProject = new Project({ id: projectId, title: newTitle, assignedListIds: projectToUpdate.assignedListIds })
        this.updateProject(projectId, updatedProject)

    }
    updateProject(projectData) {
        const nextProjects = this.myProjects.map(project => {
            if (project.id === projectData.id) {
                return new Project({ ...projectData })
            }
            else {
                return project
            }
        })
        this.myProjects = nextProjects
        this.myLocalStorage.updateProjects(nextProjects)
    }

    findProjectFromListId(listId) {
        const projectToReturn = this.myProjects.find(project => {
            return project.assignedListIds.includes(listId)
        }).id
        return projectToReturn
    }

    addTaskListToProject(listId, projectId) {

        const nextProjects = this.myProjects.map(project => {
            if (project.id === projectId && !project.assignedListIds.includes(listId)) {
                return new Project({ ...project, assignedListIds: [...project.assignedListIds, listId] })
            }
            else {
                return project
            }
        })
        this.myProjects = nextProjects
        this.myLocalStorage.updateProjects(nextProjects)
    }

    removeTaskListfromProject(listId) {
        const nextProjects = this.myProjects.map(project => {
            if (project.assignedListIds.includes(listId)) {
                const newProject = new Project({ ...project, assignedListIds: project.assignedListIds.filter(id => id !== listId) })
                return newProject
            } else {
                return project
            }
        })
        this.myProjects = nextProjects
        this.myLocalStorage.updateProjects(nextProjects)
    }

}