
import "./styles/style.css"
import TodoItem from "./components/TodoItem";
import Task from "./models/Task"

const data = [
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
]
let tasks = data.map(d => new Task(d.id, d.title, d.isCompleted))


let pendingTasks = []
const completedTasks = tasks.filter(d => d.isCompleted === true)
filterPendingTasks()



let nextTask = ""
let nextId = 2

// elems
const body = document.querySelector("body")
const pendingTasksSection = document.createElement("section")
const pendingTasksHeading = document.createElement("h2")
const pendingTasksContainer = document.createElement("div")
const completedTasksSection = document.createElement("section")
const completedTasksHeading = document.createElement("h2")
const completedTasksContainer = document.createElement("div")
const addNewTaskInput = document.createElement("input")
const addNewTaskButton = document.createElement("button")


body.appendChild(addNewTaskInput)
body.appendChild(addNewTaskButton)
body.appendChild(pendingTasksSection)
body.appendChild(completedTasksSection)

pendingTasksSection.appendChild(pendingTasksHeading)
pendingTasksSection.appendChild(pendingTasksContainer)
completedTasksSection.appendChild(completedTasksHeading)
completedTasksSection.appendChild(completedTasksContainer)


addNewTaskButton.innerText = "Add task"
pendingTasksHeading.innerText = "Pending tasks"
completedTasksHeading.innerText = "Completed tasks"

renderPendingTasks()

completedTasks.forEach(task => {
    completedTasksContainer.appendChild(TodoItem(task, handleTodoChange))
})

function filterPendingTasks() {
    pendingTasks = tasks.filter(d => d.isCompleted === false)

}

function renderPendingTasks() {
    clearElemChildren(pendingTasksContainer)
    filterPendingTasks()
    pendingTasks.forEach(task => {
        pendingTasksContainer.appendChild(TodoItem(task, handleTodoChange))
    })
}

function clearElemChildren(el) {
    el.innerHTML = ""
}

function handleTodoChange(value) {
    console.log(value)
}

function handleAddTaskInput(e) {
    nextTask = e.target.value
}

function handleAddTaskClick() {

    // Add new task to tasks
    /*     tasks = [...tasks, { id: nextId++, title: nextTask, isCompleted: false }] */
    tasks = [...tasks, new Task(nextId++, nextTask, false)]

    renderPendingTasks()
    console.table(tasks)
    // Create new todoItem
    // Update task list UI
    // Trigger a rerender
}

addNewTaskInput.addEventListener("input", handleAddTaskInput)

addNewTaskButton.addEventListener("click", handleAddTaskClick)
/* document.querySelector(`[data-todo="0"]`) */