export default function TodoItem(todo, onChange) {
    const article = document.createElement("article")
    article.setAttribute("data-todo", todo.id)

    article.innerHTML = `

    <label > <input type="checkbox" ${todo.isCompleted && "checked"}> ${todo.title}<label/>
    `

    const checkbox = article.querySelector("input")

    checkbox.addEventListener("change", (e) => onChange(e.target.checked))
    return article
}