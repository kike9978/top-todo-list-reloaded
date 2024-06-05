import ProjectService from "../services/projectService"
import { updateTaskDisplay } from "../UIRenderer"

export default function ProjectItem(project) {
    const article = document.createElement("article")
    article.innerHTML = `
        <p>${project.title}</p>
        <p>${project.assignedTasksIds.length}</p>
    `
    article.addEventListener("click", () => {
        ProjectService.setCurrentProjectId(project.id)
        console.log(ProjectService.getCurrentProjectId())

        updateTaskDisplay()

    })

    return article
}

