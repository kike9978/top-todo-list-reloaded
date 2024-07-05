import TaskList from "../models/TaskList";
import LocalStorage from "../local-storage/localStorage";

export default class ListService {
  constructor() {
    this.myLocalStorage = new LocalStorage();
    this.myLists = JSON.parse(localStorage.getItem("lists"))
      ? JSON.parse(localStorage.getItem("lists")).map(
          (list) =>
            new TaskList({
              id: list.id,
              title: list.title,
              assignedTasksIds: list.assignedTasksIds,
            })
        )
      : [];
  }

  populate() {
    this.myLists = JSON.parse(localStorage.getItem("lists")).map(
      (list) =>
        new TaskList({
          id: list.id,
          title: list.title,
          assignedTasksIds: list.assignedTasksIds,
        })
    );
  }

  createTaskList(newList) {
    const nextLists = [
      ...this.myLists,
      new TaskList({
        id: newList.id,
        title: newList.title,
        assignedTasksIds: newList.assignedTasksIds,
      }),
    ];
    this.myLists = nextLists;
    this.myLocalStorage.updateTaskLists(nextLists);
  }

  deleteTaskList(listId) {
    const nextLists = this.myLists.filter((list) => {
      return list.id !== listId;
    });
    this.myLists = nextLists;
    this.myLocalStorage.updateTaskLists(nextLists);
  }

  getLists() {
    return this.myLists;
  }

  getTaskListTasksIds(taskListId) {
    const taskList = this.getListById(taskListId);
    const taskListTasksIds = taskList.getAssignedTasksIds();
    return taskListTasksIds;
  }

  getListById(listId) {
    const list = this.myLists.find((list) => list.id === listId);
    if (list) {
      return list;
    }
  }

  addTaskToList(taskId, listId) {
    const nextLists = this.myLists.map((list) => {
      if (list.id === listId) {
        const updatedTaskList = new TaskList({
          ...list,
          assignedTasksIds: [...list.assignedTasksIds, taskId],
        });
        return updatedTaskList;
      } else {
        return list;
      }
    });
    this.myLists = nextLists;
    this.myLocalStorage.updateTaskLists(nextLists);
  }
  removeTaskFromList(taskId, listId) {
    const nextLists = this.myLists.map((list) => {
      if (list.id === listId) {
        const newAssignedTasksIds = list.assignedTasksIds.filter((id) => {
          return id !== taskId;
        });

        return new TaskList({ ...list, assignedTasksIds: newAssignedTasksIds });
      } else {
        return list;
      }
    });
    this.myLists = nextLists;
    this.myLocalStorage.updateTaskLists(nextLists);
  }

  updateTaskList(listData) {
    const nextLists = this.myLists.map((list) => {
      if (list.id === listData.id) {
        return new TaskList({ ...listData });
      } else {
        return list;
      }
    });
    this.myLists = nextLists;
    this.myLocalStorage.updateTaskLists(nextLists);
  }
}
