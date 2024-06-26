import ProjectsAndListsContainer from "./ProjectsAndListsContainer"
import { ITEM_TYPE } from "../types"

export default class SideMenu {

    constructor(projectsAndLists, handleCreateProjectClick, handleTaskListClick, assignedTasksLists, handleCreateListClick) {
        this.projectsAndLists = projectsAndLists
        this.handleCreateProjectClick = handleCreateProjectClick
        this.handleTaskListClick = handleTaskListClick
        this.assignedTasksLists = assignedTasksLists
        this.handleCreateListClick = handleCreateListClick
    }

    createSideMenu() {
        this.sideBar = document.createElement("aside")

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


        this.createListButton.addEventListener("click", () => {
            const newListInput = this.createNewItemInput(ITEM_TYPE.list)
            this.sideBar.insertBefore(newListInput, this.buttonRows)
            this.newCreationInput.focus()
            this.createListButton.disabled = true
            console.log("hola")
        })

        this.createProjectButton.addEventListener("click", () => {
            const newProjectInput = this.createNewItemInput(ITEM_TYPE.project)
            this.sideBar.insertBefore(newProjectInput, this.buttonRows)
            this.newCreationInput.focus()
            this.createProjectButton.disabled = true
        })
        this.buttonRows.appendChild(this.createProjectButton)
        return this.sideBar
    }

    createProjectsAndListsContainer() {
        this.projectsAndListsContainerInstance = new ProjectsAndListsContainer(
            this.projectsAndLists, "", "", "", this.handleTaskListClick, this.assignedTasksLists
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

    createNewItemInput(itemType) {

        this.projectInputContainer = document.createElement("div")
        this.newCreationInput = document.createElement("input")
        const cancelButton = document.createElement("button");
        const submitButton = document.createElement("button")

        cancelButton.innerText = "x"
        submitButton.innerText = "Create"

        this.projectInputContainer.appendChild(this.newCreationInput)
        this.projectInputContainer.appendChild(cancelButton)
        this.projectInputContainer.appendChild(submitButton)

        this.newCreationInput.addEventListener("change", (e) => {
            this.newItemText = e.target.value
        })

        submitButton.addEventListener("click", () => {
            if (!this.newItemText) {
                return
            }
            console.log(this)
            console.log(this.newItemText)
            this.newCreationInput.value = ""

            if (itemType === "project") {
                this.handleCreateProjectClick(this.newItemText)
            } else {
                this.handleCreateListClick(this.newItemText)
            }
            this.removeNewInputContainer()
        })

        cancelButton.addEventListener("click", () => this.removeNewInputContainer())

        return this.projectInputContainer
    }



    removeNewInputContainer() {
        console.log("input removed")

        this.sideBar.removeChild(this.projectInputContainer)
        this.createProjectButton.disabled = false

    }

}