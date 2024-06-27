import TodoItem from "./TodoItem";



export default class TasksContainer {
    constructor(
        pendingTasks,
        completedTasks,
        handleTodoChange,
        handleAddTaskInput,
        handleAddTaskClick,
        handleDeleteTaskClick,
        taskList,
        handleUpdtateTaskList) {

        this.pendingTasks = pendingTasks;
        this.completedTasks = completedTasks;
        this.handleTodoChange = handleTodoChange;
        this.handleAddTaskInput = handleAddTaskInput;
        this.handleAddTaskClick = handleAddTaskClick;
        this.handleDeleteTaskClick = handleDeleteTaskClick;
        this.taskListTitle = taskList.title;
        this.taskListId = taskList.id
        this.handleUpdtateTaskList = handleUpdtateTaskList
        this.nextTaskListText = ""
        this.taskList = taskList
    }

    createTaskContainer() {
        this.mainTasksContainer = document.createElement("main")
        this.pendingTasksSection = this.createSection("Pending tasks")
        this.completedTasksSection = this.createSection("Completed tasks")
        this.addNewTaskInput = document.createElement("input")
        this.addNewTaskButton = document.createElement("button")

        this.addNewTaskInput.placeholder = "Recolectar papas"

        // build Dom
        this.mainTasksContainer.appendChild(this.header())

        this.mainTasksContainer.appendChild(this.addNewTaskInput)
        this.mainTasksContainer.appendChild(this.addNewTaskButton)
        this.mainTasksContainer.appendChild(this.pendingTasksSection.section)
        this.mainTasksContainer.appendChild(this.completedTasksSection.section)


        this.addNewTaskButton.innerText = "+ Add task"
        this.addNewTaskButton.className = "text-pink-500"
        this.mainTasksContainer.className = "basis-full"

        this.initEventListeners()
        this.displayPendingTasks(this.pendingTasks)
        this.displayCompletedTasks(this.completedTasks)

        return this.mainTasksContainer

    }

    header() {
        const header = document.createElement("section")
        const title = document.createElement("h2")
        const button = document.createElement("button")
        const input = document.createElement("input")

        header.appendChild(title)
        header.appendChild(input)
        header.appendChild(button)

        header.className = "flex justify-between"

        button.innerText = "⛈️"
        const titleText = this.taskListTitle ?? "Título de lista"
        title.innerText = titleText


        input.addEventListener("input", (e) => {
            this.nextTaskListText = e.target.value
        })

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (this.nextTaskListText !== "") {
                    this.handleUpdtateTaskList(this.taskListId, this.nextTaskListText)
                }
            }
        })

        button.addEventListener("click", () => {
            if (this.nextTaskListText !== "") {
                this.handleUpdtateTaskList(this.taskListId, this.nextTaskListText)
            }
        }
        )



        return header
    }

    initEventListeners() {
        this.addNewTaskInput.addEventListener("input", (e) => this.handleAddTaskInput(e.target.value))
        this.addNewTaskInput.addEventListener("keydown", e => {
            this.handleInputEnter(e)
        })
        this.addNewTaskInput.removeEventListener("blur", this.handleInputEnter)



        this.addNewTaskButton.addEventListener("click", () => {
            this.handleAddTaskClick()
            this.addNewTaskInput.value = ""
        }
        )
    }

    handleInputEnter(e) {
        if (e.key === "Enter") {
            this.handleAddTaskClick()
            this.addNewTaskInput.value = ""
        }
    }

    createSection(headingText) {
        const section = document.createElement("section")
        const heading = document.createElement("h2")
        const container = document.createElement("div")

        heading.innerText = headingText
        heading.classList.add("font-semibold")
        section.appendChild(heading)
        section.appendChild(container)

        return { section, container }
    }

    displayPendingTasks(pendingTasks) {
        const pendingTasksContainer = this.pendingTasksSection.container;
        pendingTasksContainer.innerHTML = ""
        pendingTasks.forEach(task => {
            pendingTasksContainer.appendChild(TodoItem(task, this.handleTodoChange, this.handleDeleteTaskClick))
        })
    }

    displayCompletedTasks(completedTasks) {
        const completedTasksContainer = this.completedTasksSection.container;
        completedTasksContainer.innerHTML = "";
        completedTasks.forEach(task => completedTasksContainer.appendChild(TodoItem(task, this.handleTodoChange, this.handleDeleteTaskClick)))
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
