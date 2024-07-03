import ListItem from "./ListItem"

export default function ProjectItem(project, handleTaskListClick, currentProjectId, handleUpdateProjectInput) {
    const article = document.createElement("article")
    article.innerHTML = `
        <details class="w-full project-item " open>
            <summary class="marker:text-pink-500 flex p-3">
            
                    <span>
                    ${project.title}
                    </span>
                   
                </summary>
        </details>
        `

    article.className = " hover:bg-pink-100 rounded flex justify-between"

    project.assignedTasksLists.forEach(taskList => {
        article.querySelector("details").appendChild(ListItem(taskList, handleTaskListClick))
    })

    article.querySelector("summary").addEventListener("contextmenu", (e) => {
        e.preventDefault()

        const input = document.createElement("input")
        const previousSpan = article.querySelector("span")

        article.querySelector("summary").replaceChild(input, previousSpan)
        input.focus()

        input.classList.add("w-full")

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleUpdateProjectInput(project.id, e.target.value)

            }
            if (e.key === "Escape") {
                input.blur()
            }
        })
        input.addEventListener("blur", () => {
            article.querySelector("summary").replaceChild(previousSpan, input)
        })

    })

    if (currentProjectId === project.id) {
        article.classList.add("bg-pink-50", "text-pink-600")

    }




    return article
}


