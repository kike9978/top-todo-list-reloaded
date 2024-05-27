
import "./styles/style.css"
import TodoItem from "./components/TodoItem";
import Task from "./models/Task"
import TaskService from "./services/taskService";

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
let nextTask = ""
let nextId = 2


let pendingTasks = TaskService.getPendingTasks(tasks)
let completedTasks = TaskService.getCompletedTasks(tasks)




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






function renderPendingTasks() {
    clearElemChildren(pendingTasksContainer)
    pendingTasks = TaskService.getPendingTasks(tasks)
    pendingTasks.forEach(task => {
        pendingTasksContainer.appendChild(TodoItem(task, handleTodoChange))
    })
}
function renderCompletedTasks() {
    clearElemChildren(completedTasksContainer)
    completedTasks = TaskService.getCompletedTasks(tasks)
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


    updateTasksArrays()
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