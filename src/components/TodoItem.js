export default function TodoItem(task, onChange) {
    const article = document.createElement("article")
    article.setAttribute("data-task", task.id)
    article.className = "bg-slate-50 rounded flex justify-between"

    article.innerHTML = `

    <label > 
        <input type="checkbox" ${task.isCompleted ? "checked" : ""} "> 
       <span class="${task.isCompleted ? "line-through" : ""}"> ${task.title}</span>
    </label>
    <input type="checkbox" > 


    `

    const checkbox = article.querySelector("input")

    checkbox.addEventListener("change", () => onChange(task.id, task))
    return article
}