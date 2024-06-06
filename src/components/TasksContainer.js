import TodoItem from "./TodoItem";
import Task from "../models/Task";
import TaskService from "../services/taskService";
import data from "../data/data";
import ProjectService from "../services/projectService";
import generateId from "../utils/generateId";



export default function TasksContainer() {
    let tasks = data.tasks.filter(task => data.projects[ProjectService.getCurrentProjectId()].assignedTasksIds.includes(task.id))


    data.projects.findIndex
    let nextTask = ""


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

    function handleTodoChange(value, currentTask) {
        const taskId = currentTask.getId()

        TaskService.updateTask(taskId, new Task(taskId, currentTask.getTitle(), value))

        console.log("hola")
        console.log(data)
        tasks = getCurrentProjectTasks().map(d => new Task(d.id, d.title, d.isCompleted))

        updateTasksUI()
    }

    function handleAddTaskInput(e) {
        nextTask = e.target.value
    }


    function handleAddTaskClick() {

        // Add new task to tasks

        if (nextTask.trim() === "") return;

        TaskService.createTask(new Task(generateId(), nextTask, false), ProjectService.getCurrentProjectId())

        // Trigger a rerender
        // Update task list UI
        tasks = getCurrentProjectTasks().map(d => new Task(d.id, d.title, d.isCompleted))
        renderPendingTasks()
        nextTask = ""
        addNewTaskInput.value = "";
        updateProjectsDisplay()

    }

    function updateTasksUI() {
        renderPendingTasks()
        renderCompletedTasks()
    }



    addNewTaskInput.addEventListener("input", handleAddTaskInput)
    addNewTaskButton.addEventListener("click", handleAddTaskClick)




    return mainTasksContainer
}

