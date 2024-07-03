import data from "../data/data"
import Project from "../models/Project"

export default class ProjectService {

    constructor() {
        this.myProjects = data.projects.map(project => new Project({ assignedListIds: project.assignedListIds, id: project.id, title: project.title }))
    }

    getProjects() {
        return this.myProjects
    }

    createProject(project) {
        this.myProjects = [...this.myProjects, new Project({ id: project.id, title: project.title, assignedListIds: [] })]
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
                return new Project({ id: projectId, title: newProject.title, assignedListIds: newProject.assignedListIds })
            }
            else {
                return p
            }
        })
    }

    /*  addTaskToProject(taskId, projectId) {
 
 
         this.myProjects = this.myProjects.map(project => {
             if (project.id === projectId) {
                 return new Project({ ...project, assignedListIds: [...project.assignedListIds, taskId] })
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
 
                 return new Project({ ...project, assignedListIds: newAssignedTasksIds })
             }
             else {
                 return project
             }
         })
     } */

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
        const updatedProject = new Project({ id: projectId, title: newTitle, assignedListIds: projectToUpdate.assignedListIds })

        this.updateProject(projectId, updatedProject)

    }
    updateProject(projectData) {
        this.myProjects = this.myProjects.map(project => {
            if (project.id === projectData.id) {
                return new Project({ ...projectData })
            }
            else {
                return project
            }
        })
    }

    findProjectFromListId(listId) {
        const projectToReturn = this.myProjects.find(project => {
            return project.assignedListIds.includes(listId)
        }).id
        return projectToReturn
    }

    addTaskListToProject(listId, projectId) {
        this.myProjects = this.myProjects.map(project => {
            if (project.id === projectId && !project.assignedListIds.includes(listId)) {
                return new Project({ ...project, assignedListIds: [...project.assignedListIds, listId] })
            }
            else {
                return project
            }
        })

    }

    removeTaskListfromProject(listId) {
        this.myProjects = this.myProjects.map(project => {
            if (project.assignedListIds.includes(listId)) {
                return new Project({ ...project, assignedListIds: project.assignedListIds.filter(id => id !== listId) })
            } else {
                return project
            }
        })
    }

}