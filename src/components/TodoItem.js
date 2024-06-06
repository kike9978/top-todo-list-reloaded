export default function TodoItem(task, onChange) {
    const article = document.createElement("article")
    article.setAttribute("data-task", task.id)

    article.innerHTML = `

    <label > 
    <input type="checkbox" ${task.isCompleted ? "checked" : ""}> 
    ${task.title}
    <label/>
    `

    const checkbox = article.querySelector("input")

    checkbox.addEventListener("change", (e) => onChange(e.target.checked, task))
    return article
}