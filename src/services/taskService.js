import data from "../data/data"

export default class TaskService {
    static getPendingTasks(tasks) {

        return tasks.filter(d => d.getIsCompleted() === false)
    }

    static getCompletedTasks(tasks) {
        return tasks.filter(t => t.getIsCompleted() === true)
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