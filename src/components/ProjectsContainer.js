
import ProjectItem from "./ProjectItem"


export default class ProjectsContainer {
    constructor(projects, handleProjectClick, currentProjectId, handleCreateProjectClick) {
        this.projects = projects
        this.handleProjectClick = handleProjectClick
        this.currentProjectId = currentProjectId
        this.handleCreateProjectClick = handleCreateProjectClick
    }

    createProjectContainer() {
        this.projectSidebar = document.createElement("aside")
        this.projectSidebar.className = "flex flex-col gap-2"
        this.projects.forEach(project => this.projectSidebar.appendChild(ProjectItem(project, this.handleProjectClick, this.currentProjectId)))

        this.createProjectButton = document.createElement("button")
        this.createProjectButton.innerText = "Crear Proyecto"
        this.createProjectButton.addEventListener("click", () => {
            const newProjectInput = this.createNewProjectInput()
            console.log("hola")
            this.projectSidebar.insertBefore(newProjectInput, this.createProjectButton)
            this.createProjectButton.disabled = true
        })
        this.projectSidebar.appendChild(this.createProjectButton)
        return this.projectSidebar
    }

    createNewProjectInput() {

        this.projectInputContainer = document.createElement("div")
        const newProjectInput = document.createElement("input")
        const cancelButton = document.createElement("button");
        const submitButton = document.createElement("button")

        cancelButton.innerText = "x"
        submitButton.innerText = "Create"

        this.projectInputContainer.appendChild(newProjectInput)
        this.projectInputContainer.appendChild(cancelButton)
        this.projectInputContainer.appendChild(submitButton)

        newProjectInput.addEventListener("change", (e) => {
            this.newProject = e.target.value
        })
        submitButton.addEventListener("click", (e) => {
            if (!this.newProject) {
                return
            }
            console.log(this)
            console.log(this.newProject)
            newProjectInput.value = ""
            this.handleCreateProjectClick(this.newProject)
            this.removeProjectContainer()
        })
        cancelButton.addEventListener("click", () => this.removeProjectContainer())



        return this.projectInputContainer
    }

    removeProjectContainer() {
        console.log("hola")

        this.projectSidebar.removeChild(this.projectInputContainer)
        this.createProjectButton.disabled = false

    }

    clearProjectsClassNames() {
        this.getProjectsItems().forEach(item => item.classList.remove("bg-pink-50", "text-pink-600"))
    }




    getProjectsItems() {
        return this.projectSidebar.childNodes
    }
}

