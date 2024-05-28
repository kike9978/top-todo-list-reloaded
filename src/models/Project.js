export default class Project {
    constructor(id, title, assignedTasksIds) {
        this.id = id;
        this.title = title;
        this.assignedTasksIds = assignedTasksIds
    }

    getId() {
        return this.id
    }

    getTitle() {
        return this.title
    }

    getAssignedTasksIds() {
        return this.assignedTasksIds
    }

    addAssignTaskId(taskId) {
        this.assignedTasksIds = [this.assignedTasksIds, taskId]
    }

    removeAssignedTaskId(taskId) {
        this.assignedTasksIds = this.assignedTasksIds.filter(id => id !== taskId)
    }
}