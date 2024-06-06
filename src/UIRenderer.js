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
            this.controller.control
            this.controller.controlProjectDisplay()
        })

    }



    updateProjectsDisplay(projects) {

        const asideProjectContainer = document.querySelector("aside")
        const newAsideProjectContainer = ProjectsContainer(projects)

        this.body.replaceChild(newAsideProjectContainer, asideProjectContainer)
        this.projectContainer = newAsideProjectContainer
    }

    displayProjects(projects) {
        const asideProjectContainer = document.querySelector("aside")
        const newAsideProjectContainer = ProjectsContainer(projects)

        this.body.replaceChild(newAsideProjectContainer, asideProjectContainer)
        this.projectContainer = newAsideProjectContainer
    }

    displayTasks(tasks) {
        const mainTaskContainer = document.querySelector("main")
        const newTaskContainer = TasksContainer(tasks)

        this.body.replaceChild(newTaskContainer, mainTaskContainer)
        this.tasksContainer = newTaskContainer
    }

}

