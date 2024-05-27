export default class TaskService {
    static getPendingTasks(tasks) {

        return tasks.filter(d => d.getIsCompleted() === false)
    }

    static getCompletedTasks(tasks) {
        return tasks.filter(t => t.getIsCompleted() === true)
    }


}