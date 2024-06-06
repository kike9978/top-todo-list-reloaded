import data from "../data/data"

import Task from "../models/Task"

export default class TaskService {
    constructor() {
        this.myTodos = []
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

    getTodoById(taskId) {
        const task = this.myTodos.find(t => t.id === taskId)
        if (task) {
            return task
        }
    }

    updateTodo(taskId, taskData) {
        this.myTodos = this.myTodos.map(t => {
            if (taskId === t.id) {
                return new Task(taskData.id, taskData.title, taskData.isCompleted)
            }
            else {
                return t
            }
        })
    }


    static getPendingTasks(tasks) {

        return tasks.filter(d => d.isCompleted === false)
    }

    static getCompletedTasks(tasks) {
        return tasks.filter(t => t.isCompleted === true)
    }

    static updateTask(taskId, newTask) {
        data.tasks = data.tasks.map(t => {
            if (taskId === t.id) {
                return { ...t, ...newTask }
            }
            else {
                return t
            }
        })
    }

    static createTask(newTask, projectId) {

        data.tasks = [newTask, ...data.tasks]

        data.projects = data.projects.map(p => {
            if (p.id === projectId) {
                return { ...p, assignedTasksIds: [...p.assignedTasksIds, newTask.id] }
            }
            else {
                return p
            }
        })


    }


}