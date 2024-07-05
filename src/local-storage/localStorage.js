import data from "../data/data";
export default class LocalStorage {
  test() {
    localStorage.setItem("test", "hola");
  }
  getValue(key) {
    return localStorage.getItem(key);
  }

  populateWithMockData() {
    if (
      localStorage.getItem("projects") ||
      localStorage.getItem("lists") ||
      localStorage.getItem("tasks") ||
      localStorage.getItem("order")
    ) {
      return;
    }
    localStorage.setItem("projects", JSON.stringify(data.projects));
    localStorage.setItem("lists", JSON.stringify(data.lists));
    localStorage.setItem("tasks", JSON.stringify(data.tasks));
    localStorage.setItem("order", JSON.stringify(data.order));
  }

  updateTasks(nextTasks) {
    localStorage.setItem("tasks", JSON.stringify(nextTasks));
  }

  updateProjects(nextProjects) {
    localStorage.setItem("projects", JSON.stringify(nextProjects));
  }
  updateTaskLists(nextLists) {
    localStorage.setItem("lists", JSON.stringify(nextLists));
  }

  updateOrder(nextOrder) {
    localStorage.setItem("order", JSON.stringify(nextOrder));
  }
}
