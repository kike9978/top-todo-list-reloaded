import "./styles/style.css";
import TaskService from "./services/taskService";
import ProjectService from "./services/projectService";
import UIRenderer from "./UIRenderer";
import AppController from "./appController";
import ListService from "./services/listService";
import LocalStorage from "./local-storage/localStorage";

const taskService = new TaskService();
const projectService = new ProjectService();
const uiRenderer = new UIRenderer();
const listService = new ListService();
const localStorageService = new LocalStorage();

const appController = new AppController(
  uiRenderer,
  taskService,
  projectService,
  listService,
  localStorageService
);

appController.init();
