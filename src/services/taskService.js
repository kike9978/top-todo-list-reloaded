import Task from "../models/Task"
import LocalStorage from "../local-storage/localStorage"

export default class TaskService {
    constructor() {
        this.myLocalStorage = new LocalStorage()
        this.myTodos = JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")).map(task => new Task(task)) : []
    }

    populate() {
        this.myTodos = JSON.parse(localStorage.getItem("tasks")).map(task => new Task(task))
    }


    getTasks() {
        return this.myTodos
    }

    createTask(newTaskData) {
        const newTask = new Task(newTaskData)
        const nextTasks = [newTask, ...this.myTodos]
        this.myTodos = nextTasks
        this.myLocalStorage.updateTasks(nextTasks)
        return newTask
    }

    deleteTask(taskId) {
        const nextTasks = this.myTodos.filter(t => t.id !== taskId)
        this.myTodos = nextTasks
        this.myLocalStorage.updateTasks(nextTasks)
    }

    getTaskById(taskId) {
        const task = this.myTodos.find(t => t.id === taskId)
        if (task) {
            return task
        }
    }

    updateTask(taskId, taskData) {

        const nextTasks = this.myTodos.map(t => {
            if (taskId === t.id) {
                return new Task(taskData)
            }
            else {
                return t
            }
        })
        this.myTodos = nextTasks
        this.myLocalStorage.updateTasks(nextTasks)
    }

    getTaskListTasks(tasksListTasksIds) {
        return this.myTodos.filter(task => tasksListTasksIds.includes(task.id))
    }


    getPendingTasks(tasks) {
        return tasks.filter(t => !t.isCompleted)
    }

    getCompletedTasks(tasks) {
        return tasks.filter(t => t.isCompleted)
    }



}