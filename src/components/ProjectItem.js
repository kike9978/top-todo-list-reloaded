export default function ProjectItem(project, handleProjectClick) {
    const article = document.createElement("article")
    article.innerHTML = `
        <p>${project.title}</p>
        <p>${project.assignedTasksIds.length}</p>
    `

    article.addEventListener("click", () => handleProjectClick(project.id))

    return article
}


