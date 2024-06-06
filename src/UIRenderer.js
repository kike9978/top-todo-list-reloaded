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
        this.body.appendChild(this.projectContainer)
        this.tasksContainer = TasksContainer()
        this.body.appendChild(this.tasksContainer)
        this.button = document.querySelector("button")
        this.body.appendChild(this.button)
        this.button.innerText = "Imprimir"
    }
    initEventListeners() {

        this.button.addEventListener("click", () => this.displayProjects())

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

}

