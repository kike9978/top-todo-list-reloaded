
import "./styles/style.css"
import MainTasksContainer from "./components/TasksContainer"
import ProjectsContainer from "./components/ProjectsContainer"
import ProjectService from "./services/projectService"
import Project from "./models/Project"
import data from "./data/data"



let currentTasks = getCurrentProjectTasks()

// elems
const body = document.querySelector("body")

body.appendChild(ProjectsContainer())
body.appendChild(MainTasksContainer(currentTasks))

function getCurrentProjectTasks() {
    return data.tasks.filter(task => data.projects[ProjectService.getCurrentProjectId()].assignedTasksIds.includes(task.id))
}



function updateProjectsDisplay() {

    const asideProjectContainer = document.querySelector("aside")
    const newAsideProjectContainer = ProjectsContainer()

    body.replaceChild(newAsideProjectContainer, asideProjectContainer)
}




export { getCurrentProjectTasks, updateProjectsDisplay }