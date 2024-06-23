import ProjectsAndListsContainer from "./ProjectsAndListsContainer"

export default class SideMenu {

    constructor(projectsAndLists) {
        this.projectsAndLists = projectsAndLists

    }

    createSideMenu() {
        this.sideBar = document.createElement("aside")
        this.sideBar.innerText = "hola"

        const buttonRows = document.createElement("div")
        this.createListButton = document.createElement("button")

        this.sideBar.className = "flex flex-col gap-2 bg-gray-50 h-full"
        this.projectsAndListsContainer = this.createProjectsAndListsContainer()
        this.sideBar.appendChild(this.projectsAndListsContainer)

        buttonRows.appendChild(this.createListButton)
        buttonRows.classList.add("flex")

        this.createListButton.innerText = "+ Create list"
        this.createListButton.classList.add("p-2", "rounded", "hover:bg-slate-200", "mx-2", "disabled:hidden")


        this.createProjectButton = document.createElement("button")
        this.createProjectButton.innerText = "+ "
        this.createProjectButton.className = "p-2 rounded hover:bg-slate-200 mx-2 disabled:hidden"

        this.sideBar.appendChild(buttonRows)


        this.createProjectButton.addEventListener("click", () => {
            const newProjectInput = this.createNewProjectInput()
            console.log("hola")
            this.sideBar.insertBefore(newProjectInput, this.createProjectButton)
            this.createProjectButton.disabled = true
        })
        buttonRows.appendChild(this.createProjectButton)
        return this.sideBar
    }

    createProjectsAndListsContainer() {
        const projectsAndListsContainerInstance = new ProjectsAndListsContainer(
            this.projectsAndLists
        )
        const newProjectsAndListsContainer = projectsAndListsContainerInstance.createProjectAndlistsContainer()
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


}