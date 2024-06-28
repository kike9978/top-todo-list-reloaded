import ListItem from "./ListItem"

export default function ProjectItem(project, handleTaskListClick, currentProjectId, assignedTasksLists, handleUpdateProjectInput) {
    const article = document.createElement("article")
    article.innerHTML = `
        <details class="w-full project-item ">
            <summary class="marker:text-pink-500 flex ">
            
                <div class="inline-flex justify-between flex-grow">
                    <span>
                    ${project.title}
                    </span>
                    <span class="rounded-full bg-slate-200 inline-flex justify-center items-center size-5">${project.assignedListIds.length}</span>
                </div>
                </summary>
        </details>
        `

    article.className = " hover:bg-pink-100 p-3 rounded flex justify-between"

    assignedTasksLists.forEach(taskList => {
        article.querySelector("details").appendChild(ListItem({ title: taskList.title, id: taskList.id }, handleTaskListClick))
    })

    article.querySelector("summary").addEventListener("contextmenu", (e) => {
        e.preventDefault()
        console.log(article.querySelector("span"))

        const input = document.createElement("input")
        console.log(article.querySelector("summary").querySelector("span"))
        article.querySelector("summary").replaceChild(input, article.querySelector("span"))
        input.focus()

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                console.log(e.target.value)
                handleUpdateProjectInput(project.id, e.target.value)

            }
            if (e.key === "Escape") {
                input.blur()
            }
        })

    })

    if (currentProjectId === project.id) {
        article.classList.add("bg-pink-50", "text-pink-600")

    }
    console.log("Proyecto: ", project.id, "lists", assignedTasksLists)




    return article
}


