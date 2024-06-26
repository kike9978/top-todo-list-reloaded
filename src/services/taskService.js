import data from "../data/data"
import Task from "../models/Task"

export default class TaskService {
    constructor() {
        this.myTodos = data.tasks.map(task => new Task(task))
    }

    getTasks() {
        return this.myTodos
    }

    createTask(newTaskData) {
        const newTask = new Task(newTaskData)
        this.myTodos = [newTask, ...this.myTodos]

        return newTask
    }

    deleteTask(taskId) {
        this.myTodos = this.myTodos.filter(t => t.id !== taskId)
    }

    getTaskById(taskId) {
        const task = this.myTodos.find(t => t.id === taskId)
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

    /*  getCurrentProjectTasks(projectTaskListsIds) {
         
 
         return this.myTodos.filter(task => projectTasksIds.includes(task.id))
     } */

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