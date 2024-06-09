import ProjectsContainer from "./components/ProjectsContainer"
import TasksContainer from "./components/TasksContainer"

export default class UIRenderer {

    constructor() {

        this.initUI()
        this.initEventListeners()
    }

    initUI() {
        this.body = document.querySelector("body")
        this.projectContainer = document.querySelector("aside")
        this.tasksContainer = document.querySelector("main")
        this.button = document.createElement("button")
        this.body.appendChild(this.button)
        this.button.innerText = "Imprimir"
    }

    initEventListeners() {

        this.button.addEventListener("click", () => {
            this.controller.controlUpdateProjectTitle(0, "Carnaval de Veracruz")
            this.controller.controlProjectDisplay()
        })

    }


    handleProjectClick() {
        this.projectService.setCurrentProjectId(project.id)
    }

    handleTodoChange(value, currentTask) {

        this.controller.controlChangeIsCompleted()
        this.controller.controlTaskDisplay()

        const taskId = currentTask.getId()

        TaskService.updateTask(taskId, new Task(taskId, currentTask.getTitle(), value))

        console.log("hola")
        console.log(data)
        tasks = getCurrentProjectTasks().map(d => new Task(d.id, d.title, d.isCompleted))

        updateTasksUI()
    }
    updateProjectsDisplay(projects) {

        const asideProjectContainer = document.querySelector("aside")
        const newAsideProjectContainer = ProjectsContainer(projects, this.handleProjectClick)

        this.body.replaceChild(newAsideProjectContainer, asideProjectContainer)
        this.projectContainer = newAsideProjectContainer
    }

    displayPendingTasks(pendingTasks) {
        const pendingTaskContainer = document.querySelector("[data-container:pending-tasks]")
        pendingTasks.forEach(t => {
            this.tasksContainer
        })
    }
    displayCompletedTasks(completedTasks) {

    }

    displayProjects(projects) {
        const newProjectContainerInstance = new ProjectsContainer(projects, this.handleProjectClick.bind(this))
        const newProjectContainer = newProjectContainerInstance.createProjectContainer()
        this.body.replaceChild(newProjectContainer, this.projectContainer)
        this.projectContainer = newProjectContainer
    }

    displayTasksContainer(tasks) {
        const taskContainerInstance = new TasksContainer(tasks,
            this.controller.handleTaskChange.bind(this.controller),
            this.controller.handleAddTaskInput.bind(this.controller),
            this.controller.handleAddTaskClick.bind(this.controller)
        )
        const newTaskContainer = taskContainerInstance.createTaskContainer();

        const mainTaskContainer = document.querySelector("main")

        this.body.replaceChild(newTaskContainer, mainTaskContainer)
        this.tasksContainer = newTaskContainer
    }

    updatePendingTasks(pendingTasks, onChange) {
        const pendingTasksContainer = document.querySelector("[data-container:pending-tasks]");
        pendingTasksContainer.innerHtml = ""
        pendingTasks.forEach(t => pendingTasksContainer.appendChild())
    }

}

