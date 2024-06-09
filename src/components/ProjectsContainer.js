
import ProjectItem from "./ProjectItem"


export default class ProjectsContainer {
    constructor(projects, handleProjectClick) {
        this.projects = projects
        this.handleProjectClick = handleProjectClick
    }

    createProjectContainer() {
        this.projectSidebar = document.createElement("aside")
        this.projects.forEach(project => this.projectSidebar.appendChild(ProjectItem(project, this.handleProjectClick)))
        return this.projectSidebar
    }


}

