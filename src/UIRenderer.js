import ProjectsContainer from "./components/ProjectsContainer"
import TasksContainer from "./components/TasksContainer"

export default class UIRenderer {

    constructor() {
        this.body = document.querySelector("body")
        this.initUI()
    }

    initUI() {
        this.createProjectContainer()
        this.createTasksContainer()
    }

    createProjectContainer() {
        if (!this.projectContainer) {
            this.projectContainer = document.createElement("aside")
            this.body.appendChild(this.projectContainer)

        }
    }
    createTasksContainer() {
        if (!this.tasksContainer) {
            this.tasksContainer = document.createElement("main")
            this.body.appendChild(this.tasksContainer)
        }
    }



    handleTodoChange(value, currentTask) {

        this.controller.controlChangeIsCompleted()
        this.controller.controlTaskDisplay()

        const taskId = currentTask.getId()

        TaskService.updateTask(taskId, new Task(taskId, currentTask.getTitle(), value))

        tasks = getCurrentProjectTasks().map(d => new Task(d.id, d.title, d.isCompleted))

        updateTasksUI()
    }
    updateProjectsDisplay(projects) {
        this.displayProjects(projects)
    }

    displayProjects(projects) {
        this.createProjectContainer()
        const newProjectContainerInstance = new ProjectsContainer(projects, this.controller.handleProjectClick.bind(this.controller))
        const newProjectContainer = newProjectContainerInstance.createProjectContainer()
        this.body.replaceChild(newProjectContainer, this.projectContainer)
        this.projectContainer = newProjectContainer
    }

    displayTasksContainer(pendingTasks, completedTasks) {

        this.createTasksContainer();
        const taskContainerInstance = new TasksContainer(
            pendingTasks,
            completedTasks,
            this.controller.handleTaskChange.bind(this.controller),
            this.controller.handleAddTaskInput.bind(this.controller),
            this.controller.handleAddTaskClick.bind(this.controller)
        )
        const newTaskContainer = taskContainerInstance.createTaskContainer();

        this.body.replaceChild(newTaskContainer, this.tasksContainer)
        this.taskContainerInstance = taskContainerInstance
        this.tasksContainer = newTaskContainer
    }

    updatePendingTasks(pendingTasks) {
        if (this.taskContainerInstance) {
            this.taskContainerInstance.updatePendingTasks(pendingTasks)
        }
    }

    updateCompletdTasks(completedTasks) {
        if (this.taskContainerInstance) {
            this.taskContainerInstance.updateCompletedTasks(completedTasks)
        }
    }

}

