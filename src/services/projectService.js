export default class ProjectService {

    static currentProjectId = 0

    static getCurrentProjectId() {
        return ProjectService.currentProjectId
    }

    static setCurrentProjectId(nextId) {
        ProjectService.currentProjectId = nextId
    }

    /*  static addTaskToProject(projects,projectId, taskId) {
         const project = project.find(p=> project.id === projectId)
     } */

}