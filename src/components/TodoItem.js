export default function TodoItem(task, onChange) {
    const article = document.createElement("article")
    article.setAttribute("data-task", task.getId())

    article.innerHTML = `

    <label > 
    <input type="checkbox" ${task.getIsCompleted() && "checked"}> 
    ${task.getTitle()}
    <label/>
    `

    const checkbox = article.querySelector("input")

    checkbox.addEventListener("change", (e) => onChange(e.target.checked, task.getId()))
    return article
}