import TasksContainer from "./components/TasksContainer"
import SideMenu from "./components/SideMenu"

export default class UIRenderer {

    constructor() {
        this.root = document.querySelector("#root")
        this.initUI()
    }

    initUI() {
        this.createSideMenu()
        this.createTasksContainer()
    }

    createTasksContainer() {
        if (!this.tasksContainer) {
            this.tasksContainer = document.createElement("main")
            this.root.appendChild(this.tasksContainer)
        }
    }

    createSideMenu() {
        if (!this.sideMenu) {
            this.sideMenu = document.createElement("aside")
            this.root.appendChild(this.sideMenu)
        }
    }

    handleTodoChange(value, currentTask) {

        this.controller.controlChangeIsCompleted()
        this.controller.controlTaskDisplay()

        const taskId = currentTask.getId()

        TaskService.updateTask(taskId, new Task(taskId, currentTask.getTitle(), value))

        tasks = getCurrentProjectTasks().map(d => new Task(d.id, d.title, d.isCompleted))

        updateTasksUI()
    }

    displayTasksContainer(pendingTasks, completedTasks, taskList, projects) {

        this.createTasksContainer();
        const taskContainerInstance = new TasksContainer(
            pendingTasks,
            completedTasks,
            this.controller.handleTaskChange.bind(this.controller),
            this.controller.handleAddTaskInput.bind(this.controller),
            this.controller.handleAddTaskClick.bind(this.controller),
            this.controller.handleDeleteTaskClick.bind(this.controller),
            taskList,
            this.controller.handleUpdtateTaskList.bind(this.controller),
            this.controller.handleUpdateListSubmit.bind(this.controller),
            projects
        )
        const newTaskContainer = taskContainerInstance.createTaskContainer();

        this.root.replaceChild(newTaskContainer, this.tasksContainer)
        this.taskContainerInstance = taskContainerInstance
        this.tasksContainer = newTaskContainer
    }

    displaySideMenu() {
        this.createSideMenu();
        const sideMenuInstance = new SideMenu(
            this.controller.projectsAndLists,
            this.controller.handleCreateProjectClick.bind(this.controller),
            this.controller.handleTaskListClick.bind(this.controller),
            this.controller.assignedTasksLists,
            this.controller.handleCreateListClick.bind(this.controller),
            this.controller.handleUpdateProjectInput.bind(this.controller)
        )
        const newSideMenu = sideMenuInstance.createSideMenu()
        this.root.replaceChild(newSideMenu, this.sideMenu)
        this.sideMenuInstance = sideMenuInstance
        this.sideMenu = newSideMenu
    }

    updatePendingTasks(pendingTasks) {
        if (this.taskContainerInstance) {
            this.taskContainerInstance.updatePendingTasks(pendingTasks)
        }
    }

    updateCompletdTasks(completedTasks) {
        if (this.taskContainerInstance) {
            this.taskContainerInstance.updateCompletedTasks(completedTasks)
        }
    }

    updateProjectsAndListsContainer() {

        this.sideMenuInstance.projectsAndListsContainerInstance.updateProjectsAndListsContainer(this.controller.projectsAndLists, this.controller.assignedTasksLists)
    }



}

