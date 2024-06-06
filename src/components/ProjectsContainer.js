
import ProjectItem from "./ProjectItem"


export default function ProjectsContainer(projects) {
    console.log(projects)
    const projectsSidebar = document.createElement("aside")
    projects.forEach(project => projectsSidebar.appendChild(ProjectItem(project)))
    return projectsSidebar
}
