
import ProjectItem from "./ProjectItem"


export default class ProjectsContainer {
    constructor(projects, handleProjectClick, currentProjectId) {
        this.projects = projects
        this.handleProjectClick = handleProjectClick
        this.currentProjectId = currentProjectId
    }

    createProjectContainer() {
        this.projectSidebar = document.createElement("aside")
        this.projectSidebar.className = "flex flex-col gap-2"
        this.projects.forEach(project => this.projectSidebar.appendChild(ProjectItem(project, this.handleProjectClick, this.currentProjectId)))
        return this.projectSidebar
    }

    clearProjectsClassNames() {
        this.getProjectsItems().forEach(item => item.classList.remove("bg-pink-50", "text-pink-600"))
    }


    getProjectsItems() {
        return this.projectSidebar.childNodes
    }
}

