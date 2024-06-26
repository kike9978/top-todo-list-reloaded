import ListItem from "./ListItem"

export default function ProjectItem(project, handleTaskListClick, currentProjectId) {
    const article = document.createElement("article")
    article.innerHTML = `
        <details>
            <summary>${project.title}
            
            <span class="rounded-full bg-slate-200 inline-flex justify-center items-center size-5">${project.assignedListIds.length}</span>
            </summary>
        </details>
        `

    article.className = " hover:bg-pink-100 p-3 rounded flex justify-between"

    article.querySelector("details").appendChild(ListItem({ title: "Lista 23", id: 1 }, handleTaskListClick))

    if (currentProjectId === project.id) {
        article.classList.add("bg-pink-50", "text-pink-600")

    }



    return article
}


