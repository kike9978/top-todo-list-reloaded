import data from "../data/data"

import Task from "../models/Task"

export default class TaskService {
    constructor() {
        this.myTodos = data.tasks
    }

    getTasks() {
        return this.myTodos
    }

    createTask(newTaskData) {
        const newTask = new Task(newTaskData)
        this.myTodos = [...this.myTodos, newTask]

        return newTask
    }

    deleteTodo(taskId) {
        this.myTodos = this.myTodos.filter(t => t.id !== taskId)
    }

    getTaskById(taskId) {
        console.log("taskId: ", taskId)
        const task = this.myTodos.find(t => t.id === taskId)
        console.log("getTaskById")
        if (task) {
            return task
        }
    }

    updateTask(taskId, taskData) {
        this.myTodos = this.myTodos.map(t => {
            if (taskId === t.id) {
                return new Task(taskData)
            }
            else {
                return t
            }
        })
    }

    getCurrentProjectTasks(currentProjectIds) {
        return this.myTodos.filter(task => currentProjectIds.includes(task.id))
    }


    getPendingTasks(tasks) {
        return tasks.filter(t => !t.isCompleted)
    }

    getCompletedTasks(tasks) {
        return tasks.filter(t => t.isCompleted)
    }



}