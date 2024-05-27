export default class TaskService {
    static filterPendingTasks(tasks) {

        const pendingTasks = tasks.filter(d => d.getIsCompleted() === false)
        return pendingTasks
    }

    static filterCompletedTasks(tasks) {
        const completedTasks = tasks.filter(t => t.getIsCompleted() === true)
        return completedTasks
    }


}