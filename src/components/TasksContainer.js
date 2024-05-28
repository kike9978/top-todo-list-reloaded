import TodoItem from "./TodoItem";
import Task from "../models/Task";
import TaskService from "../services/taskService";



export default function MainTasksContainer(data) {
    let tasks = data.map(d => new Task(d.id, d.title, d.isCompleted))
    let nextTask = ""
    let nextId = 3


    // elems
    const mainTasksContainer = document.createElement("main")
    const pendingTasksSection = createSection("Pending tasks")
    const completedTasksSection = createSection("Completed tasks")
    const addNewTaskInput = document.createElement("input")
    const addNewTaskButton = document.createElement("button")



    // build Dom
    mainTasksContainer.appendChild(addNewTaskInput)
    mainTasksContainer.appendChild(addNewTaskButton)
    mainTasksContainer.appendChild(pendingTasksSection.section)
    mainTasksContainer.appendChild(completedTasksSection.section)

    addNewTaskButton.innerText = "Add task"

    //Initial render
    renderPendingTasks()
    renderCompletedTasks()


    function createSection(headingText) {
        const section = document.createElement("section")
        const heading = document.createElement("h2")
        const container = document.createElement("div")

        heading.innerText = headingText
        section.appendChild(heading)
        section.appendChild(container)

        return { section, container }
    }

    function renderPendingTasks() {
        clearElemChildren(pendingTasksSection.container)
        const pendingTasks = TaskService.getPendingTasks(tasks)
        pendingTasks.forEach(task => {
            pendingTasksSection.container.appendChild(TodoItem(task, handleTodoChange))
        })
    }

    function renderCompletedTasks() {
        clearElemChildren(completedTasksSection.container)
        const completedTasks = TaskService.getCompletedTasks(tasks)
        completedTasks.forEach(task => {
            completedTasksSection.container.appendChild(TodoItem(task, handleTodoChange))
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
