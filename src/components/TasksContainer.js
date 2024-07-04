import TodoItem from "./TodoItem";
import { openSideBar } from "../utils/uiUtils";
import MaterialIcon from "./MaterialIcon";
import EmptyState from "./EmptyState";

export default class TasksContainer {
    constructor(
        pendingTasks,
        completedTasks,
        handleTodoChange,
        handleAddTaskInput,
        handleAddTaskClick,
        handleDeleteTaskClick,
        taskList,
        handleUpdtateTaskList,
        handleUpdateListSubmit,
        projects,
        handleDeleteListClick,
    ) {

        this.pendingTasks = pendingTasks;
        this.completedTasks = completedTasks;
        this.handleTodoChange = handleTodoChange;
        this.handleAddTaskInput = handleAddTaskInput;
        this.handleAddTaskClick = handleAddTaskClick;
        this.handleDeleteTaskClick = handleDeleteTaskClick;
        this.taskListTitle = taskList.title;
        this.taskListId = taskList.id
        this.handleUpdtateTaskList = handleUpdtateTaskList
        this.handleUpdateListSubmit = handleUpdateListSubmit
        this.projects = projects
        this.handleDeleteListClick = handleDeleteListClick

        const parentProject = this.projects.find(project => project.assignedListIds.includes(this.taskListId))
        this.parentProjectId = parentProject ? parentProject.id : "none"
    }

    createTaskContainer() {
        this.mainTasksContainer = document.createElement("main")
        this.pendingTasksSection = this.createSection("Pending tasks")
        this.completedTasksSection = this.createSection("Completed tasks")
        this.addNewTaskInput = document.createElement("input")
        this.addNewTaskButton = document.createElement("button")

        this.addNewTaskInput.placeholder = "Recolectar papas"

        const openSideBarButton = document.createElement("button")
        openSideBarButton.className = "md:hidden"
        openSideBarButton.innerHTML = MaterialIcon("menu")

        // build Dom
        this.mainTasksContainer.appendChild(openSideBarButton)
        this.mainTasksContainer.appendChild(this.header())

        this.mainTasksContainer.appendChild(this.addNewTaskInput)
        this.mainTasksContainer.appendChild(this.addNewTaskButton)

        if (this.pendingTasks.length > 0) {
            this.mainTasksContainer.appendChild(this.pendingTasksSection.section)
        }
        if (this.completedTasks.length > 0) {

            this.mainTasksContainer.appendChild(this.completedTasksSection.section)
        }

        this.addNewTaskButton.innerText = "+ Add task"
        this.addNewTaskButton.className = "text-pink-500"
        this.mainTasksContainer.className = "basis-full overflow-y-auto flex flex-col"

        this.initEventListeners()
        this.displayPendingTasks(this.pendingTasks)
        this.displayCompletedTasks(this.completedTasks)

        openSideBarButton.addEventListener("click", openSideBar)

        if (!this.completedTasks.length > 0 && !this.pendingTasks.length > 0) {
            this.mainTasksContainer.appendChild(EmptyState("No hay tareas"))
        }

        return this.mainTasksContainer

    }

    header() {
        const header = document.createElement("header")
        const title = document.createElement("h2")
        const button = document.createElement("button")

        header.appendChild(title)
        header.appendChild(button)

        header.className = "flex justify-between"
        title.className = "text-3xl"

        button.innerHTML = MaterialIcon("more_vert")
        const titleText = this.taskListTitle ?? "Título de lista"
        title.innerText = titleText

        button.addEventListener("click", () => {
            const dialog = document.querySelector("dialog")

            dialog.innerHTML = ""
            dialog.appendChild(this.createEditTaskListForm())
            dialog.showModal()

        })
        return header
    }

    createEditTaskListForm() {
        const form = document.createElement("form")
        form.className = "flex flex-col"

        form.innerHTML = `
        <h1>Edit Task List</h1>
        <label>
        Título
        <input placeholder="Title" value="${this.taskListTitle}" name="title"/>
        </label>
        <label >
        Project
            <select name="assignedProjectId">
            <option value="none">None</option>
            </select>
        </label>
        <button type="button">Delete list</button>
        <button type="button">Cancel</button>
        <button>Ok</button>
        `

        this.projects.forEach(project => {

            form.querySelector("select").innerHTML += `
            <option value="${project.id}" ${this.parentProjectId === project.id && "selected"}>${project.title}</option>
            `
        })

        form.addEventListener("submit", (e) => {
            e.preventDefault()

            const newListData = generateNewTaskInfo(e)
            if (newListData.title === this.taskListTitle && newListData.assignedProjectId === this.parentProjectId) {
                document.querySelector("dialog").close()
                return
            }
            this.handleUpdateListSubmit({ ...newListData, id: this.taskListId })
            document.querySelector("dialog").close()
        })

        form.querySelectorAll("button")[0].addEventListener("click", () => {
            this.handleDeleteListClick(this.taskListId)
            document.querySelector("dialog").close()
        }
        )
        form.querySelectorAll("button")[1].addEventListener("click", () => document.querySelector("dialog").close())

        function generateNewTaskInfo(e) {
            const formData = new FormData(e.target)
            const formObj = Object.fromEntries(formData.entries())
            return formObj
        }

        return form
    }

    initEventListeners() {
        this.addNewTaskInput.addEventListener("input", (e) => {
            this.handleAddTaskInput(e.target.value)
        })
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

        section.classList.add("px-2", "mb-4")
        heading.classList.add("mb-2")
        container.classList.add("flex", "flex-col", "gap-1")


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

    displayEmptyList() {
        this.mainTasksContainer.innerHTML = `
        <div class="flex items-center justify-center h-full">No List selected</div>
        `
    }

    updatePendingTasks(pendingTasks) {
        this.displayPendingTasks(pendingTasks)
    }

    updateCompletedTasks(completedTasks) {
        this.displayCompletedTasks(completedTasks)
    }


}
