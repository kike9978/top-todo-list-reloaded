import TodoItem from "./TodoItem";
import generateId from "../utils/generateId";



export default class TasksContainer {
    constructor(pendingTasks, completedTasks, handleTodoChange, handleAddTaskInput, handleAddTaskClick) {
        this.pendingTasks = pendingTasks;
        this.completedTasks = completedTasks;
        this.handleTodoChange = handleTodoChange;
        this.handleAddTaskInput = handleAddTaskInput;
        this.handleAddTaskClick = handleAddTaskClick;
    }

    createTaskContainer() {
        this.mainTasksContainer = document.createElement("main")
        this.pendingTasksSection = this.createSection("Pending tasks")
        this.completedTasksSection = this.createSection("Completed tasks")
        this.addNewTaskInput = document.createElement("input")
        this.addNewTaskButton = document.createElement("button")

        // build Dom
        this.mainTasksContainer.appendChild(this.addNewTaskInput)
        this.mainTasksContainer.appendChild(this.addNewTaskButton)
        this.mainTasksContainer.appendChild(this.pendingTasksSection.section)
        this.mainTasksContainer.appendChild(this.completedTasksSection.section)

        this.addNewTaskButton.innerText = "Add task"

        this.initEventListeners()
        this.displayPendingTasks(this.pendingTasks)
        this.displayCompletedTasks(this.completedTasks)

        return this.mainTasksContainer

    }

    initEventListeners() {
        this.addNewTaskInput.addEventListener("change", (e) => this.handleAddTaskInput(e.target.value))
        this.addNewTaskButton.addEventListener("click", () => {
            this.handleAddTaskClick()
            this.addNewTaskInput.value = ""
        }
        )
    }

    createSection(headingText) {
        const section = document.createElement("section")
        const heading = document.createElement("h2")
        const container = document.createElement("div")

        heading.innerText = headingText
        section.appendChild(heading)
        section.appendChild(container)

        return { section, container }
    }

    displayPendingTasks(pendingTasks) {
        const pendingTasksContainer = this.pendingTasksSection.container;
        pendingTasksContainer.innerHTML = ""
        pendingTasks.forEach(task => {
            pendingTasksContainer.appendChild(TodoItem(task, this.handleTodoChange))
        })
    }

    displayCompletedTasks(completedTasks) {
        const completedTasksContainer = this.completedTasksSection.container;
        completedTasksContainer.innerHTML = "";
        completedTasks.forEach(task => completedTasksContainer.appendChild(TodoItem(task, this.handleTodoChange)))
    }

    updatePendingTasks(pendingTasks) {
        this.displayPendingTasks(pendingTasks)
    }

    updateCompletedTasks(completedTasks) {
        this.displayCompletedTasks(completedTasks)
    }

    /* //Initial render
    this.renderPendingTasks()
    this.renderCompletedTasks()

    renderPendingTasks() {
        clearElemChildren(pendingTasksSection.container)
        const pendingTasks = TaskService.getPendingTasks(tasks)
        pendingTasks.forEach(task => {
            pendingTasksSection.container.appendChild(TodoItem(task, handleTodoChange))
        })
    }
    
    renderCompletedTasks() {
        clearElemChildren(completedTasksSection.container)
        const completedTasks = TaskService.getCompletedTasks(tasks)
        completedTasks.forEach(task => {
            completedTasksSection.container.appendChild(TodoItem(task, handleTodoChange))
        })
    }
    
    clearElemChildren(el) {
        el.innerHTML = ""
    }
    
    
    handleAddTaskInput(e) {
        nextTask = e.target.value
    }
    
    handleAddTaskClick() {
    
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
    
    updateTasksUI() {
        renderPendingTasks()
        renderCompletedTasks()
    }
    
    
    addNewTaskInput.addEventListener("input", handleAddTaskInput)
    addNewTaskButton.addEventListener("click", handleAddTaskClick)
    
     */
}
