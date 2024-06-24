export default class Project {
    constructor({ id, title, assignedListIds }) {
        this.id = id;
        this.title = title;
        this.assignedListIds = assignedListIds
    }

    getId() {
        return this.id
    }

    getTitle() {
        return this.title
    }

    getAssignedListIds() {
        return this.assignedListIds
    }

    addAssignTaskId(taskId) {
        this.assignedListIds = [this.assignedListIds, taskId]
    }

    removeAssignedTaskId(taskId) {
        this.assignedListIds = this.assignedListIds.filter(id => id !== taskId)
    }

    setTitle(newTitle) {
        this.title = newTitle
    }


}