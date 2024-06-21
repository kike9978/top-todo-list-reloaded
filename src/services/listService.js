import data from "../data/data";
import TaskList from "../models/TaskList";

export default class ListService {
    constructor() {
        this.myLists = data.lists.map(list => new TaskList({ id: list.id, title: list.title, assignedTaskIds: list.assignedTasksIds }))
    }

    createTaskList(newList) {
        this.myLists = [...this.myLists, new TaskList({ id: newList.id, title: newList.title, assignedTaskIds: newList.assignedTasksIds })]
    }

    deleteTaskList(listId) {
        this.myLists = this.myLists.filter(list => {
            return list.id !== listId
        })
    }

    getLists() {
        return this.myLists
    }

    getListById(listId) {
        const list = this.myLists.find(list => list.id === listId)
        if (list) {
            return list
        }
    }







}