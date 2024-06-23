import ProjectsAndListsContainer from "./ProjectsAndListsContainer"

export default class SideMenu {

    constructor(projectsAndLists, handleCreateProjectClick) {
        this.projectsAndLists = projectsAndLists
        this.handleCreateProjectClick = handleCreateProjectClick

    }

    createSideMenu() {
        this.sideBar = document.createElement("aside")
        this.sideBar.innerText = "hola"

        this.buttonRows = document.createElement("div")
        this.createListButton = document.createElement("button")

        this.sideBar.className = "flex flex-col gap-2 bg-gray-50 h-full"
        this.projectsAndListsContainer = this.createProjectsAndListsContainer()
        this.sideBar.appendChild(this.projectsAndListsContainer)

        this.buttonRows.appendChild(this.createListButton)
        this.buttonRows.classList.add("flex")

        this.createListButton.innerText = "+ Create list"
        this.createListButton.classList.add("p-2", "rounded", "hover:bg-slate-200", "mx-2", "disabled:hidden")


        this.createProjectButton = document.createElement("button")
        this.createProjectButton.innerText = "+ "
        this.createProjectButton.className = "p-2 rounded hover:bg-slate-200 mx-2 disabled:hidden"

        this.sideBar.appendChild(this.buttonRows)


        this.createProjectButton.addEventListener("click", () => {
            const newProjectInput = this.createNewProjectInput()
            this.sideBar.insertBefore(newProjectInput, this.buttonRows)
            this.createProjectButton.disabled = true
        })
        this.buttonRows.appendChild(this.createProjectButton)
        return this.sideBar
    }

    createProjectsAndListsContainer() {
        this.projectsAndListsContainerInstance = new ProjectsAndListsContainer(
            this.projectsAndLists
        )
        const newProjectsAndListsContainer = this.projectsAndListsContainerInstance.createProjectAndlistsContainer()
        return newProjectsAndListsContainer
    }

    updateProjectsAndListsContainer() {
        const newProjectsAndListsContainer = this.createProjectsAndListsContainer()
        this.sideBar.replaceChild(newProjectsAndListsContainer, this.projectsAndListsContainer)
        this.projectsAndListsContainerInstance = projectsAndListsContainerInstance
        this.projectsAndListsContainer = newProjectsAndListsContainer
    }


    displaySideMenu() {
        this.createSideMenu();
        const sideMenuInstance = new SideMenu([{ hola: "adios" }])
        const newSideMenu = sideMenuInstance.createSideMenu()
        this.body.replaceChild(newSideMenu, this.sideMenu)
        this.sideMenuInstance = sideMenuInstance
        this.sideMenu = newSideMenu
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
        submitButton.addEventListener("click", () => {
            if (!this.newProject) {
                return
            }
            console.log(this)
            console.log(this.newProject)
            newProjectInput.value = ""
            this.handleCreateProjectClick(this.newProject)
            this.removeNewProjectInputContainer()
        })
        cancelButton.addEventListener("click", () => this.removeNewProjectInputContainer())



        return this.projectInputContainer
    }

    removeNewProjectInputContainer() {
        console.log("input removed")

        // this.projectsAndListsContainer.removeChild(this.projectInputContainer)
        this.createProjectButton.disabled = false

    }



}