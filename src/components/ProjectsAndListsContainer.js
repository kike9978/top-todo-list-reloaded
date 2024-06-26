
import ProjectItem from "./ProjectItem"
import ListItem from "./ListItem"
import { ITEM_TYPE } from "../types"



export default class ProjectsAndListsContainer {
    constructor(projectsAndLists, handleProjectClick, currentProjectId, handleCreateProjectClick, handleTaskListClick) {
        this.projectsAndLists = projectsAndLists
        this.handleProjectClick = handleProjectClick
        this.currentProjectId = currentProjectId
        this.handleCreateProjectClick = handleCreateProjectClick
        this.handleTaskListClick = handleTaskListClick
    }

    createProjectAndlistsContainer() {
        this.projectsAndListsContainer = document.createElement("section")
        this.projectsAndListsContainer.className = ""
        this.populateItems()
        return this.projectsAndListsContainer
    }

    populateItems() {
        this.projectsAndLists.forEach(item => {
            if (item.type === ITEM_TYPE.project) {
                this.projectsAndListsContainer.appendChild(ProjectItem(item, this.handleTaskListClick, this.currentProjectId))
                return
            }
            else {

                this.projectsAndListsContainer.appendChild(ListItem(item, this.handleTaskListClick))
            }

        })
    }

    removeProjectContainer() {
        console.log("hola")
        this.projectsAndListsContainer.innerHTML = ""

    }

    clearProjectsClassNames() {
        this.getProjectsItems().forEach(item => item.classList.remove("bg-pink-50", "text-pink-600"))
    }


    getProjectsItems() {
        return this.projectsAndListsContainer.childNodes
    }

    sayHello() {
        console.count("hola")
    }

    updateProjectsAndListsContainer(projectsAndLists) {
        this.removeProjectContainer()
        this.projectsAndLists = projectsAndLists
        this.populateItems()

    }
}