import TodoItem from "./TodoItem";
import Task from "../models/Task";
import TaskService from "../services/taskService";
import ProjectService from "../services/projectService";



export default function MainTasksContainer(data) {
    let tasks = data.map(d => new Task(d.id, d.title, d.isCompleted))
    let nextTask = ""
    let nextId = 2


    // elems
    const mainTasksContainer = document.createElement("main")
    const pendingTasksSection = document.createElement("section")
    const pendingTasksHeading = document.createElement("h2")
    const pendingTasksContainer = document.createElement("div")
    const completedTasksSection = document.createElement("section")
    const completedTasksHeading = document.createElement("h2")
    const completedTasksContainer = document.createElement("div")
    const addNewTaskInput = document.createElement("input")
    const addNewTaskButton = document.createElement("button")



    // build Dom
    mainTasksContainer.appendChild(addNewTaskInput)
    mainTasksContainer.appendChild(addNewTaskButton)
    mainTasksContainer.appendChild(pendingTasksSection)
    mainTasksContainer.appendChild(completedTasksSection)
    pendingTasksSection.appendChild(pendingTasksHeading)
    pendingTasksSection.appendChild(pendingTasksContainer)
    completedTasksSection.appendChild(completedTasksHeading)
    completedTasksSection.appendChild(completedTasksContainer)

    addNewTaskButton.innerText = "Add task"
    pendingTasksHeading.innerText = "Pending tasks"
    completedTasksHeading.innerText = "Completed tasks"

    //Initial render
    renderPendingTasks()
    renderCompletedTasks()

    function renderPendingTasks() {
        clearElemChildren(pendingTasksContainer)
        const pendingTasks = TaskService.getPendingTasks(tasks)
        pendingTasks.forEach(task => {
            pendingTasksContainer.appendChild(TodoItem(task, handleTodoChange))
        })
    }

    function renderCompletedTasks() {
        clearElemChildren(completedTasksContainer)
        const completedTasks = TaskService.getCompletedTasks(tasks)
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


        updateTasks()
    }

    function handleAddTaskInput(e) {
        nextTask = e.target.value
    }


    function handleAddTaskClick() {
        console.log(tasks)

        // Add new task to tasks

        if (nextTask.trim() === "") return;

        tasks = [new Task(nextId++, nextTask, false), ...tasks]

        // Trigger a rerender
        // Update task list UI
        renderPendingTasks()
        nextTask = ""
        addNewTaskInput.value = "";
    }

    function updateTasks() {
        renderPendingTasks()
        renderCompletedTasks()
    }

    addNewTaskInput.addEventListener("input", handleAddTaskInput)

    addNewTaskButton.addEventListener("click", handleAddTaskClick)
    /* document.querySelector(`[data-todo="0"]`) */





    return mainTasksContainer
}
