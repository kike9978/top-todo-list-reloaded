export default function ProjectItem(project, handleProjectClick, currentProjectId) {
    const article = document.createElement("article")
    article.innerHTML = `
        <detail>
            <summary>${project.title}</summary>
            <span class="rounded-full bg-slate-200 inline-flex justify-center items-center size-5">${project.assignedListIds.length}</span>
        </detail>
        `

    article.className = "cursor-pointer hover:bg-pink-100 p-3 rounded flex justify-between"
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


