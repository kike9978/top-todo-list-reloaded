
import ProjectItem from "./ProjectItem"

const ITEM_TYPE = Object.freeze({
    project: "project",
    list: "list"
})


export default class ProjectsAndListsContainer {
    constructor(projectsAndLists, handleProjectClick, currentProjectId, handleCreateProjectClick) {
        this.projectsAndLists = projectsAndLists
        this.handleProjectClick = handleProjectClick
        this.currentProjectId = currentProjectId
        this.handleCreateProjectClick = handleCreateProjectClick
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
                this.projectsAndListsContainer.appendChild(ProjectItem(item, this.handleProjectClick, this.currentProjectId))
                return
            }
            else {
                const el = document.createElement("p")
                el.innerText = item.title
                this.projectsAndListsContainer.appendChild(el)
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