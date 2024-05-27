
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
let completedTasks = tasks.filter(d => d.isCompleted === true)
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
renderCompletedTasks()


function filterPendingTasks() {
    pendingTasks = tasks.filter(d => d.getIsCompleted() === false)

}

function filterCompletedTasks() {
    completedTasks = tasks.filter(t => t.getIsCompleted() === true)
}

function renderPendingTasks() {
    clearElemChildren(pendingTasksContainer)
    filterPendingTasks()
    pendingTasks.forEach(task => {
        pendingTasksContainer.appendChild(TodoItem(task, handleTodoChange))
    })
}
function renderCompletedTasks() {
    clearElemChildren(completedTasksContainer)
    filterCompletedTasks()
    completedTasks.forEach(task => {
        completedTasksContainer.appendChild(TodoItem(task, handleTodoChange))
    })
}

function clearElemChildren(el) {
    el.innerHTML = ""
}

function handleTodoChange(value, taskId) {

    tasks = tasks.map(t => {
        if (taskId === t.getId()) {
            return new Task(taskId, t.getTitle(), value)
        }
        else {
            return t
        }
    }
    )


    renderPendingTasks()
    renderCompletedTasks()
}

function handleAddTaskInput(e) {
    nextTask = e.target.value
}
function resetInput() {
    addNewTaskInput.value = nextTask;
}

function handleAddTaskClick() {

    // Add new task to tasks
    tasks = [new Task(nextId++, nextTask, false), ...tasks]

    // Trigger a rerender
    // Update task list UI
    renderPendingTasks()
    nextTask = ""
    resetInput();
}

function updateTasksArrays() {
    renderPendingTasks()
    renderCompletedTasks()
}

addNewTaskInput.addEventListener("input", handleAddTaskInput)

addNewTaskButton.addEventListener("click", handleAddTaskClick)
/* document.querySelector(`[data-todo="0"]`) */