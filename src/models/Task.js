class Task {
    constructor(id, title, isCompleted) {
        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted
    }

    getId() {
        return this.id
    }
    getTitle() {
        return this.title
    }
    getIsCompleted() {
        return this.isCompleted
    }

}

export default Task