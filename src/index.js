
import "./styles/style.css"
import TaskService from "./services/taskService"
import ProjectService from "./services/projectService";
import UIRenderer from "./UIRenderer";
import AppController from "./appController";

const taskService = new TaskService();
const projectService = new ProjectService();
const uiRenderer = new UIRenderer()

const appController = new AppController(uiRenderer, taskService, projectService)

appController.init()

