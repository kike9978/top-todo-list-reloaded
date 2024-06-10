export default function ProjectItem(project, handleProjectClick, currentProjectId) {
    const article = document.createElement("article")
    article.innerHTML = `
        <span>${project.title}</span>
        <span class="rounded-full bg-slate-200 inline-flex justify-center items-center size-5">${project.assignedTasksIds.length}</span>
    `

    article.className = "cursor-pointer hover:bg-pink-100 p-3 rounded"
    article.addEventListener("click", () => {
        handleProjectClick(project.id)
        article.classList.add("bg-pink-50", "text-pink-600")
    })
    console.log(currentProjectId)

    if (currentProjectId === project.id) {
        article.classList.add("bg-pink-50", "text-pink-600")

    }


    return article
}


