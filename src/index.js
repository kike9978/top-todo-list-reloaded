
import "./styles/style.css"
import MainTasksContainer from "./components/TasksContainer"

const data = {
    tasks: [
        {
            id: 0,
            title: "hola",
            isCompleted: false
        },
        {
            id: 1,
            title: "Adios",
            isCompleted: true
        },
        {
            id: 2,
            title: "Otra tarea",
            isCompleted: true
        },
    ],

    projects: [
        {
            id: 0,
            title: "Proyecto 1",
            assignedTasksIds: [0, 2]

        }
    ]
}


const currentTasks = data.tasks.filter(task => data.projects[0].assignedTasksIds.indexOf(task.id) >= 0)
// elems
const body = document.querySelector("body")

const projectsSidebar = document.createElement("aside")

body.appendChild(projectsSidebar)

body.appendChild(MainTasksContainer(currentTasks))

function ProjectItem(project) {
    const article = document.createElement("article")
    article.innerHTML = `
        <p>${project.title}</p>
    
    `

    return article
}

data.projects.forEach(project => projectsSidebar.appendChild(ProjectItem(project)))
