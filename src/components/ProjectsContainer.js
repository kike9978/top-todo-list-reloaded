
import ProjectItem from "./ProjectItem"
import data from "../data/data"
import Project from "../models/Project"

let projects = data.projects.map(project => new Project(project.id, project.title, project.assignedTasksIds))
export default function ProjectsContainer() {
    const projectsSidebar = document.createElement("aside")

    projects.forEach(project => projectsSidebar.appendChild(ProjectItem(project)))




    return projectsSidebar

}

