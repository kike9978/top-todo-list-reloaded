
import "./styles/style.css"
import MainTasksContainer from "./components/TasksContainer"
import ProjectService from "./services/projectService"
import Project from "./models/Project"
import data from "./data/data"




let projects = data.projects.map(project => new Project(project.id, project.title, project.assignedTasksIds))
let currentTasks = getCurrentProjectTasks()
// elems
const body = document.querySelector("body")
const projectsSidebar = document.createElement("aside")

body.appendChild(projectsSidebar)
body.appendChild(MainTasksContainer(currentTasks))

function getCurrentProjectTasks() {
    return data.tasks.filter(task => projects[ProjectService.getCurrentProjectId()].assignedTasksIds.includes(task.id))
}

function ProjectItem(project) {
    const article = document.createElement("article")
    article.innerHTML = `
        <p>${project.title}</p>
        <p>${project.assignedTasksIds.length}</p>
    `
    article.addEventListener("click", () => {
        ProjectService.setCurrentProjectId(project.id)
        console.log(ProjectService.getCurrentProjectId())
        updateTaskDisplay()

    })

    return article
}

projects.forEach(project => projectsSidebar.appendChild(ProjectItem(project)))

function updateTaskDisplay() {
    projects = data.projects.map(project => new Project(project.id, project.title, project.assignedTasksIds))
    const currentProject = projects[ProjectService.getCurrentProjectId()];
    const currentTasks = data.tasks.filter(task => currentProject.assignedTasksIds.includes(task.id))
    console.table(currentTasks)
    console.table(data.tasks)
    console.log(currentProject.assignedTasksIds)
    console.log(currentProject)
    console.log(data.projects[0])

    const mainTasksContainer = document.querySelector("main")
    const newMainTasksContainer = MainTasksContainer(currentTasks)
    console.log(body.children)
    body.replaceChild(newMainTasksContainer, mainTasksContainer)

}

