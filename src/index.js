
import "./styles/style.css"
import TodoItem from "./components/TodoItem";

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
let tasks = data

const completedTasks = tasks.filter(d => d.isCompleted === true)
const pendingTasks = tasks.filter(d => d.isCompleted === false)


let nextTask = ""
let nextId = 2

// elems
const body = document.querySelector("body")
const pendingTasksSection = document.createElement("section")
const pendingTasksHeading = document.createElement("h2")
const completedTasksSection = document.createElement("section")
const completedTasksHeading = document.createElement("h2")
const addNewTaskInput = document.createElement("input")
const addNewTaskButton = document.createElement("button")


body.appendChild(addNewTaskInput)
body.appendChild(addNewTaskButton)
body.appendChild(pendingTasksSection)
body.appendChild(completedTasksSection)

pendingTasksSection.appendChild(pendingTasksHeading)
completedTasksSection.appendChild(completedTasksHeading)


addNewTaskButton.innerText = "Add task"
pendingTasksHeading.innerText = "Pending tasks"
completedTasksHeading.innerText = "Completed tasks"

pendingTasks.forEach(task => {
    pendingTasksSection.appendChild(TodoItem(task, handleTodoChange))
})

completedTasks.forEach(task => {
    completedTasksSection.appendChild(TodoItem(task, handleTodoChange))
})



function handleTodoChange(value) {
    console.log(value)
}

function handleAddTaskInput(e) {
    nextTask = e.target.value
}

function handleAddTaskClick() {

    // Add new task to tasks
    tasks = [...tasks, { id: nextId++, title: nextTask, isCompleted: false }]
    console.table(tasks)
    // Create new todoItem
    // Update task list UI
    // Trigger a rerender
}

addNewTaskInput.addEventListener("input", handleAddTaskInput)

addNewTaskButton.addEventListener("click", handleAddTaskClick)
/* document.querySelector(`[data-todo="0"]`) */