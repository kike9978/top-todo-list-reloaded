import ProjectsAndListsContainer from "./ProjectsAndListsContainer";
import { ITEM_TYPE } from "../types";
import { closeSideBar } from "../utils/uiUtils";
import MaterialIcon from "./MaterialIcon";

export default class SideMenu {
  constructor(
    projectsAndLists,
    handleCreateProjectClick,
    handleTaskListClick,
    handleCreateListClick,
    handleUpdateProjectInput
  ) {
    this.projectsAndLists = projectsAndLists;
    this.handleCreateProjectClick = handleCreateProjectClick;
    this.handleTaskListClick = handleTaskListClick;
    this.handleCreateListClick = handleCreateListClick;
    this.handleUpdateProjectInput = handleUpdateProjectInput;
  }

  createSideMenu() {
    this.sideBar = document.createElement("aside");
    this.closeSideButton = document.createElement("button");

    this.buttonRows = document.createElement("div");
    this.createListButton = document.createElement("button");

    this.sideBar.className =
      "flex flex-col gap-2 bg-gray-50 h-full overflow-hidden";
    this.projectsAndListsContainer = this.createProjectsAndListsContainer();

    this.closeSideButton.innerHTML = MaterialIcon("menu");
    this.closeSideButton.className = "md:hidden";

    this.sideBar.appendChild(this.closeSideButton);
    this.sideBar.appendChild(this.projectsAndListsContainer);

    this.buttonRows.appendChild(this.createListButton);
    this.buttonRows.classList.add("flex", "justify-between");

    this.createListButton.innerText = "+ Create list";
    this.createListButton.classList.add(
      "p-2",
      "rounded",
      "hover:bg-slate-200",
      "mx-2",
      "disabled:hidden"
    );

    this.createProjectButton = document.createElement("button");
    this.createProjectButton.innerText = "+ ";
    this.createProjectButton.className =
      "p-2 rounded hover:bg-slate-200 mx-2 disabled:hidden";
    this.createProjectButton.title = "Create Project";

    this.sideBar.appendChild(this.buttonRows);

    this.closeSideButton.addEventListener("click", closeSideBar);
    this.createListButton.addEventListener("click", () => {
      this.handleCreateInputClick(ITEM_TYPE.list);
    });

    this.createProjectButton.addEventListener("click", () => {
      this.handleCreateInputClick(ITEM_TYPE.project);
    });
    this.buttonRows.appendChild(this.createProjectButton);
    return this.sideBar;
  }

  handleCreateInputClick(itemType) {
    const newCreationInput = this.createNewItemInput(itemType);
    this.sideBar.insertBefore(newCreationInput, this.buttonRows);
    this.createListButton.disabled = true;
    this.createProjectButton.disabled = true;
    this.newCreationInput.focus();
  }

  createProjectsAndListsContainer() {
    this.projectsAndListsContainerInstance = new ProjectsAndListsContainer(
      this.projectsAndLists,
      "",
      "",
      "",
      this.handleTaskListClick,
      this.handleUpdateProjectInput
    );
    const newProjectsAndListsContainer =
      this.projectsAndListsContainerInstance.createProjectAndlistsContainer();
    return newProjectsAndListsContainer;
  }

  updateProjectsAndListsContainer() {
    const newProjectsAndListsContainer = this.createProjectsAndListsContainer();
    this.sideBar.replaceChild(
      newProjectsAndListsContainer,
      this.projectsAndListsContainer
    );
    this.projectsAndListsContainerInstance = projectsAndListsContainerInstance;
    this.projectsAndListsContainer = newProjectsAndListsContainer;
  }

  createNewItemInput(itemType) {
    this.projectInputContainer = document.createElement("div");
    this.newCreationInput = document.createElement("input");
    const cancelButton = document.createElement("button");
    const submitButton = document.createElement("button");

    cancelButton.innerText = "x";
    submitButton.innerText = "Create";

    this.projectInputContainer.appendChild(this.newCreationInput);
    this.projectInputContainer.appendChild(cancelButton);
    this.projectInputContainer.appendChild(submitButton);

    this.projectInputContainer.classList.add("flex", "gap-2");
    this.newCreationInput.classList.add("min-w-0");

    this.newCreationInput.addEventListener("input", (e) => {
      this.newItemText = e.target.value;
    });

    this.newCreationInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        onSubmitClick();
      }
    });

    submitButton.addEventListener("click", () => onSubmitClick());
    const onSubmitClick = () => {
      if (!this.newItemText) {
        return;
      }
      this.newCreationInput.value = "";

      if (itemType === "project") {
        this.handleCreateProjectClick(this.newItemText);
      } else {
        this.handleCreateListClick(this.newItemText);
      }
      this.removeNewInputContainer();
    };

    cancelButton.addEventListener("click", () =>
      this.removeNewInputContainer()
    );

    return this.projectInputContainer;
  }

  removeNewInputContainer() {
    this.sideBar.removeChild(this.projectInputContainer);
    this.createProjectButton.disabled = false;
    this.createListButton.disabled = false;
  }
}
