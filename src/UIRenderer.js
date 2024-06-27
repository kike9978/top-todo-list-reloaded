import TasksContainer from "./components/TasksContainer"
import SideMenu from "./components/SideMenu"

export default class UIRenderer {

    constructor() {
        this.body = document.querySelector("body")
        this.initUI()
    }

    initUI() {
        this.createSideMenu()
        this.createTasksContainer()
    }

    /*  createProjectContainer() {
         if (!this.projectContainer) {
             this.projectContainer = document.createElement("aside")
             this.body.appendChild(this.projectContainer)
 
         }
     } */
    createTasksContainer() {
        if (!this.tasksContainer) {
            this.tasksContainer = document.createElement("main")
            this.body.appendChild(this.tasksContainer)
        }
    }

    createSideMenu() {
        if (!this.sideMenu) {
            this.sideMenu = document.createElement("aside")
            this.body.appendChild(this.sideMenu)
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
    /*  updateProjectsDisplay(projects) {
         this.displayProjects(projects)
     } */

    /*    displayProjects(projects) {
           this.createProjectContainer()
           const newProjectContainerInstance = new ProjectsContainer(
               projects,
               this.controller.handleProjectClick.bind(this.controller),
               this.controller.currentProjectId,
               this.controller.handleCreateProjectClick.bind(this.controller))
           const newProjectContainer = newProjectContainerInstance.createProjectContainer()
           this.body.replaceChild(newProjectContainer, this.projectContainer)
           this.projectContainer = newProjectContainer
       }
    */
    displayTasksContainer(pendingTasks, completedTasks, taskList) {

        this.createTasksContainer();
        const taskContainerInstance = new TasksContainer(
            pendingTasks,
            completedTasks,
            this.controller.handleTaskChange.bind(this.controller),
            this.controller.handleAddTaskInput.bind(this.controller),
            this.controller.handleAddTaskClick.bind(this.controller),
            this.controller.handleDeleteTaskClick.bind(this.controller),
            taskList,
            this.controller.handleUpdtateTaskList.bind(this.controller)
        )
        const newTaskContainer = taskContainerInstance.createTaskContainer();

        this.body.replaceChild(newTaskContainer, this.tasksContainer)
        this.taskContainerInstance = taskContainerInstance
        this.tasksContainer = newTaskContainer
    }

    displaySideMenu() {
        this.createSideMenu();
        console.table(this.controller.projectsAndLists)
        const sideMenuInstance = new SideMenu(
            this.controller.projectsAndLists,
            this.controller.handleCreateProjectClick.bind(this.controller),
            this.controller.handleTaskListClick.bind(this.controller),
            this.controller.assignedTasksLists,
            this.controller.handleCreateListClick.bind(this.controller),
            this.controller.handleUpdateProjectInput.bind(this.controller)
        )
        const newSideMenu = sideMenuInstance.createSideMenu()
        this.body.replaceChild(newSideMenu, this.sideMenu)
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

