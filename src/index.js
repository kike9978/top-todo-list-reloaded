
import "./styles/style.css"
import TaskService from "./services/taskService"
import ProjectService from "./services/projectService";
import UIRenderer from "./UIRenderer";
import AppController from "./appController";
import ListService from "./services/listService";

const taskService = new TaskService();
const projectService = new ProjectService();
const uiRenderer = new UIRenderer()
const listService = new ListService()

const appController = new AppController(uiRenderer, taskService, projectService, listService)

appController.init()

