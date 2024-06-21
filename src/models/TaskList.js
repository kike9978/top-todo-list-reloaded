class TaskList {
    constructor({ id, title, assignedTaskIds }) {
        this.id = id;
        this.title = title;
        this.assignedTaskIds = assignedTaskIds || []
    }

    getId() {
        return this.id
    }

    getTitle() {
        return this.title
    }
    getAssignedTasksIds() {
        return this.assignedTaskIds
    }

}

export default TaskList