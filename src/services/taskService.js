import data from "../data/data"

export default class TaskService {
    static getPendingTasks(tasks) {

        return tasks.filter(d => d.getIsCompleted() === false)
    }

    static getCompletedTasks(tasks) {
        return tasks.filter(t => t.getIsCompleted() === true)
    }

    static setNewTask(task) {

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


}