import data from "../data/data";
import TaskList from "../models/TaskList";

export default class ListService {
    constructor() {
        this.myLists = data.lists.map(list => new TaskList({ id: list.id, title: list.title, assignedTasksIds: list.assignedTasksIds }))
    }

    createTaskList(newList) {
        this.myLists = [...this.myLists, new TaskList({ id: newList.id, title: newList.title, assignedTasksIds: newList.assignedTasksIds })]
    }

    deleteTaskList(listId) {
        this.myLists = this.myLists.filter(list => {
            return list.id !== listId
        })
    }

    getLists() {
        return this.myLists
    }

    getTaskListTasksIds(taskListId) {
        const taskList = this.getListById(taskListId)
        const taskListTasksIds = taskList.getAssignedTasksIds()
        return taskListTasksIds
    }

    getListById(listId) {
        const list = this.myLists.find(list => list.id === listId)
        if (list) {
            return list
        }
    }

    addTaskToList(taskId, listId) {

        this.myLists = this.myLists.map(list => {
            if (list.id === listId) {
                const updatedTaskList = new TaskList({ ...list, assignedTasksIds: [...list.assignedTasksIds, taskId] })
                return updatedTaskList
            }
            else {
                return list
            }
        })
    }
    removeTaskFromList(taskId, listId) {


        this.myLists = this.myLists.map(list => {
            if (list.id === listId) {

                const newAssignedTasksIds = list.assignedTasksIds.filter(id => {
                    return id !== taskId
                })

                return new TaskList({ ...list, assignedTasksIds: newAssignedTasksIds })
            }
            else {
                return list
            }
        })

    }


    updateTaskList(listData) {

        this.myLists = this.myLists.map(list => {
            if (list.id === listData.id) {
                return new TaskList({ ...listData })
            }
            else {
                return list
            }
        })
    }
}