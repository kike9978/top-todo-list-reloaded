class Task {
  constructor({ id, title, isCompleted, description }) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
    this.description = description || "";
  }

  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getIsCompleted() {
    return this.isCompleted;
  }

  changeCompleted() {
    this.isCompleted = !this.getIsCompleted;
  }
}

export default Task;
