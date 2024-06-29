class TaskList {
    constructor({ id, title, assignedTasksIds }) {
        this.id = id;
        this.title = title;
        this.assignedTasksIds = assignedTasksIds || []
        this.pendingTasksCount = 0
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


}

export default TaskList