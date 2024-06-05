import MainTasksContainer from "./components/TasksContainer"
const body = document.querySelector("body")

function updateTaskDisplay() {
    projects = data.projects.map(project => new Project(project.id, project.title, project.assignedTasksIds))
    const mainTasksContainer = document.querySelector("main")
    const newMainTasksContainer = MainTasksContainer()
    body.replaceChild(newMainTasksContainer, mainTasksContainer)

}

export { updateTaskDisplay }