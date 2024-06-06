import { format, isToday } from "date-fns";
import { isWithinOneWeek, makeFutureDate } from "./utility";

export default class TodoView {
    constructor() {
        this.mainContainer = document.querySelector(".main-container");
        this.detailContainer = document.querySelector(".detail-container");

        this.todoList = document.querySelector(".todo-item-list");

        this.navbarListTimeFilters = document.querySelector("#navbar-list-time-filters");
        this.navbarListProjects = document.querySelector("#navbar-list-projects");
        this.navbarAllItem = document.querySelector("#nav-item-all");

        this.addTodoButton = document.querySelector("#add-todo-button");
        this.addProjectButton = document.querySelector("#add-project-button");
        this.restoreDefaults = document.querySelector("#restore-defaults-button");

        this.todoForm = document.querySelector("#todo-form");
        this.projectForm = document.querySelector("#project-form");

        this.detailFormToHide = document.querySelector("#new-todo-form-to-hide");
        this.projectFormToHide = document.querySelector("#project-form-to-hide-id");
        this.todoConfirmButton = document.querySelector("#todo-confirm-button");
        this.todoUpdateButton = document.querySelector("#todo-update-button");
        this.projectConfirmButton = document.querySelector("#project-confirm-button");

        this.initEventListeners();
    }

    initEventListeners() {
        this.navbarListTimeFilters.addEventListener("click", (e) => {
            if (e.target.classList.contains("nav-item")) {
                this.handleTimeFilterClick(e.target);
            }
        })

        this.navbarListProjects.addEventListener("click", (e) => {
            if (e.target.classList.contains("nav-item")) {
                this.handleProjectClickFilter(e.target);
            }
        })

        this.addTodoButton.addEventListener("click", (e) => {
            this.handleAddTodoButton();
        })

        this.addProjectButton.addEventListener("click", (e) => {
            this.handleAddProjectButton();
        })

        this.todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitter = e.submitter;
            if (submitter.id === "todo-confirm-button") {
                this.handleSubmitTodo();
            } else if (submitter.id === "todo-update-button") {
                this.handleUpdateTodo();
            }
        })

        this.projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleSubmitProject();
        })

        this.restoreDefaults.addEventListener("click", (e) => {
            this.handleRestoreDefaults();
        })

        this.todoList.addEventListener("click", (e) => {
            const clickedItem = e.target.closest(".todo-item");

            if (clickedItem) {
                const deleteButton = e.target.closest(".delete-button");
                // Handle edit todo
                if (!e.target.classList.contains("checkbox") && !e.target.classList.contains("delete-button")) {
                    this.handleEditTodo(clickedItem);
                }

                // Handle checkbox toggle
                if (e.target.classList.contains("checkbox")) {
                    this.handleCheckbox(e.target);
                }

                // Handle delete button
                if (deleteButton) {
                    this.handleDeleteTodo(deleteButton);
                }
            }
        });
    }

    handleTimeFilterClick(target) {
        this.hideFormDivs();
        this.clearNavItemSelector();
        this.showNavItemSelector(target);

        // Filter by time
        const navSelection = target.textContent;
        const myTodos = this.controller.controlGetTodos();
        switch (navSelection) {
            case "All":
                this.displayTodoItems(myTodos);
                break;

            case "Today":
                const todaysTodos = myTodos.filter(todo => isToday(todo.dueDate));
                this.displayTodoItems(todaysTodos);
                break;

            case "Week":
                const currentDate = new Date();
                const oneWeekLater = makeFutureDate(7);
                const weeksTodos = myTodos.filter(todo => {
                    return isWithinOneWeek(currentDate, oneWeekLater, todo.dueDate)
                })

                this.displayTodoItems(weeksTodos);
                break;
        }
    }

    handleProjectClickFilter(target) {
        this.hideFormDivs();
        this.clearNavItemSelector();
        this.showNavItemSelector(target);

        // Filter by project
        const projectTitle = target.textContent;
        this.controller.getFilteredProjects(projectTitle);
    }

    handleAddTodoButton() {
        this.hideFormDivs();
        document.querySelector("#todo-form").reset();


        const detailFormHeader = document.querySelector("#todo-detail-title");
        detailFormHeader.textContent = "Create New Todo";

        // Display available projects in dropdown
        this.displayAvailableProjects();

        this.todoConfirmButton.hidden = false;
        this.todoUpdateButton.hidden = true;

        this.detailFormToHide.hidden = false;
    }

    handleAddProjectButton() {
        this.hideFormDivs();
        document.querySelector("#project-form").reset();
        this.projectFormToHide.hidden = false;
    }

    handleSubmitTodo() {
        const todoForm = document.querySelector("#todo-form")

        const todoData = this.getTodoFormInputs();
        this.controller.controlCreateTodo(todoData);

        this.hideFormDivs();
        todoForm.reset();
    }

    handleUpdateTodo() {
        const todoForm = document.querySelector("#todo-form");
        const selectedTodoItem = document.querySelector(".todo-item-selected");

        const todoId = selectedTodoItem.getAttribute("data-id");
        const todoData = this.getTodoFormInputs();
        this.controller.controlUpdateTodo(todoId, todoData);

        this.hideFormDivs();
        todoForm.reset();
    }

    handleSubmitProject() {
        const projectForm = document.querySelector("#project-form");
        const projectTitle = document.querySelector("#project-title");

        this.controller.controlCreateProject(projectTitle.value);

        this.hideFormDivs();
        projectForm.reset();
    }

    handleEditTodo(target) {
        this.hideFormDivs();

        // Remove todo highlights
        const todos = document.querySelectorAll(".todo-item");
        todos.forEach((todo) => {
            todo.classList.remove("todo-item-selected");
        })
        target.classList.add("todo-item-selected");


        const todoId = target.getAttribute("data-id");
        const todoData = this.getSelectedTodoData(todoId);
        this.populateSelectedTodoInputs(todoData);

        const detailFormHeader = document.querySelector("#todo-detail-title");
        detailFormHeader.textContent = "Update Todo";

        this.todoConfirmButton.hidden = true;
        this.todoUpdateButton.hidden = false;

        this.detailFormToHide.hidden = false;
    }

    getTodoFormInputs() {
        const formTodoTitle = document.querySelector("#form-title");
        const formTodoDescription = document.querySelector("#form-description");
        const formTodoDate = document.querySelector("#input-date");
        const formTodoPriority = document.querySelector("#form-priority");
        const formTodoProject = document.querySelector("#form-project");

        const todoData = {
            title: formTodoTitle.value,
            description: formTodoDescription.value,
            dueDate: formTodoDate.value,
            priority: formTodoPriority.value,
            project: formTodoProject.value
        }

        return todoData;
    }

    getSelectedTodoData(todoId) {
        return this.controller.controlGetTodoById(todoId);
    }

    // Display available projects in dropdown
    displayAvailableProjects() {
        // Clear all projects from dropdown except "None"
        const formTodoProjectDropdown = document.querySelector("#form-project");
        while (formTodoProjectDropdown.children[1]) {
            formTodoProjectDropdown.removeChild(formTodoProjectDropdown.children[1]);
        }

        const myProjects = this.controller.controlGetProjects();
        myProjects.forEach((project) => {
            const selectOption = document.createElement("option");
            selectOption.setAttribute("value", project);
            selectOption.textContent = project;
            formTodoProjectDropdown.appendChild(selectOption);
        })
    }

    populateSelectedTodoInputs(todoData) {
        const formTodoTitle = document.querySelector("#form-title");
        const formTodoDescription = document.querySelector("#form-description");
        const formTodoDate = document.querySelector("#input-date");
        const formTodoPriority = document.querySelector("#form-priority");
        const formTodoProject = document.querySelector("#form-project");

        this.displayAvailableProjects();

        formTodoTitle.value = todoData.title;


        formTodoDescription.value = todoData.description;

        formTodoDate.value = format(todoData.dueDate, 'yyyy-MM-dd');


        formTodoPriority.value = todoData.priority;
        formTodoProject.value = todoData.project;
    }

    handleCheckbox(target) {
        const todoId = target.parentElement.getAttribute("data-id");
        this.controller.controlToggleFinished(todoId);
    }

    handleDeleteTodo(target) {
        const todoId = target.parentElement.getAttribute("data-id");
        this.controller.controlDeleteTodo(todoId);

        this.hideFormDivs();
        this.clearNavItemSelector();
        this.showNavItemSelector(this.navbarAllItem);
    }

    handleRestoreDefaults() {
        this.controller.controlRestoreDefaults();
        this.clearNavItemSelector();
        this.showNavItemSelector(this.navbarAllItem);
        this.hideFormDivs();
    }

    clearNavItemSelector() {
        const navbarItems = document.querySelectorAll(".nav-item");
        navbarItems.forEach((item) => {
            item.classList.remove("nav-item-selected");
        })
    }

    showNavItemSelector(target) {
        target.classList.add("nav-item-selected");
    }

    hideFormDivs() {
        this.detailFormToHide.hidden = true;
        this.projectFormToHide.hidden = true;
    }

    displayTodoItems(myTodos) {
        this.todoList.innerHTML = "";

        console.log(myTodos);
        // Sort todos
        myTodos.sort((todo1, todo2) => todo1.dueDate - todo2.dueDate);

        console.log(myTodos);

        myTodos.map((todo) => {
            const todoItem = document.createElement("li");
            todoItem.classList.add("todo-item");

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "finished");
            checkbox.setAttribute("id", "finished");
            checkbox.classList.add("checkbox");
            if (todo.finished) {
                console.log({ todo });
                checkbox.checked = todo.finished;
                todoItem.classList.add("todo-item-finished");
            }
            todoItem.appendChild(checkbox);

            const itemDate = document.createElement("span");
            itemDate.classList.add("item-date");
            itemDate.textContent = format(todo.dueDate, 'MMMM do') || "No date";
            todoItem.appendChild(itemDate);

            const itemTitle = document.createElement("span");
            itemTitle.classList.add("item-title");
            itemTitle.textContent = todo.title || "No title";
            todoItem.appendChild(itemTitle);

            const itemPriority = document.createElement("span");
            itemPriority.classList.add("priority");
            itemPriority.textContent = todo.priority === "NONE" ? "" : todo.priority;
            switch (todo.priority) {
                case "HIGH":
                    itemPriority.classList.add("priority-high");
                    break;
                case "MEDIUM":
                    itemPriority.classList.add("priority-medium");
                    break;
                case "LOW":
                    itemPriority.classList.add("priority-low");
                    break;
                default:
                    break;
            }
            todoItem.appendChild(itemPriority);

            const deleteButton = document.createElement("button");
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("aria-label", "Delete");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="30" height="30">
                    <g transform="translate(1.41 1.41) scale(2.81)">
                        <path d="M76.777 2.881H57.333V2.412C57.333 1.08 56.253 0 54.921 0H35.079c-1.332 0-2.412 1.08-2.412 2.412v0.469H13.223c-1.332 0-2.412 1.08-2.412 2.412v9.526c0 1.332 1.08 2.412 2.412 2.412h63.554c1.332 0 2.412-1.08 2.412-2.412V5.293c0-1.332-1.08-2.412-2.412-2.412z"/>
                        <path d="M 73.153 22.119 H 16.847 c -1.332 0 -2.412 1.08 -2.412 2.412 v 63.057 c 0 1.332 1.08 2.412 2.412 2.412 h 56.306 c 1.332 0 2.412 -1.08 2.412 -2.412 V 24.531 C 75.565 23.199 74.485 22.119 73.153 22.119 z M 33.543 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z M 48.535 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z M 63.526 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z"/>
                    </g>
                </svg>`
            todoItem.appendChild(deleteButton);

            todoItem.setAttribute("data-id", todo.id);

            this.todoList.appendChild(todoItem);
        })
    }

    displayProjects(myProjects) {
        this.navbarListProjects.innerHTML = "";
        myProjects.forEach((project) => {
            const projectNavItem = document.createElement("li");
            projectNavItem.classList.add("nav-item");
            projectNavItem.setAttribute("data-navbar", project);
            projectNavItem.textContent = project;
            this.navbarListProjects.appendChild(projectNavItem);
        })
    }
}