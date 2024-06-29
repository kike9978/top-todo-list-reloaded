
import ProjectItem from "./ProjectItem"
import ListItem from "./ListItem"
import { ITEM_TYPE } from "../types"



export default class ProjectsAndListsContainer {
    constructor(projectsAndLists,
        handleProjectClick,
        currentProjectId,
        handleCreateProjectClick,
        handleTaskListClick,
        assignedTasksLists,
        handleUpdateProjectInput) {
        this.projectsAndLists = projectsAndLists
        this.handleProjectClick = handleProjectClick
        this.currentProjectId = currentProjectId
        this.handleCreateProjectClick = handleCreateProjectClick
        this.handleTaskListClick = handleTaskListClick
        this.assignedTasksLists = assignedTasksLists
        this.handleUpdateProjectInput = handleUpdateProjectInput
    }

    createProjectAndlistsContainer() {
        this.projectsAndListsContainer = document.createElement("section")
        this.projectsAndListsContainer.className = "basis-full overflow-y-auto"
        this.populateItems()
        return this.projectsAndListsContainer
    }

    populateItems() {
        this.projectsAndLists.forEach(item => {
            if (item.type === ITEM_TYPE.project) {
                const assignedTasksLists = this.assignedTasksLists.find(a => a.projectId === item.id).lists
                this.projectsAndListsContainer.appendChild(ProjectItem(item, this.handleTaskListClick, this.currentProjectId, assignedTasksLists, this.handleUpdateProjectInput))
                return
            }
            else {
                this.projectsAndListsContainer.appendChild(ListItem(item, this.handleTaskListClick))
            }

        })
    }

    removeProjectContainer() {
        this.projectsAndListsContainer.innerHTML = ""

    }

    clearProjectsClassNames() {
        this.getProjectsItems().forEach(item => item.classList.remove("bg-pink-50", "text-pink-600"))
    }


    getProjectsItems() {
        return this.projectsAndListsContainer.childNodes
    }

    sayHello() {
    }

    updateProjectsAndListsContainer(projectsAndLists, newAssignedTasksLists) {
        this.removeProjectContainer()
        this.projectsAndLists = projectsAndLists
        this.assignedTasksLists = newAssignedTasksLists
        this.populateItems()

    }

}