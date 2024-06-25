export default function TodoItem(task, onChange, handleDeleteTaskClick) {
    const article = document.createElement("article")
    article.className = "bg-slate-50 rounded flex justify-between relative todo-item"

    article.innerHTML = `

    <label > 
        <input type="checkbox" ${task.isCompleted ? "checked" : ""} "> 
       <span class="${task.isCompleted ? "line-through text-slate-400" : ""}"> ${task.title}</span>
    </label>
    <div class="h-full justify-center items-center absolute right-2 gap-2">
    ${createButton("D")}
    ${createButton("E")}
    <input type="checkbox" > 
        </div>
    `
    const elimButton = article.querySelectorAll("button")[0]
    elimButton.addEventListener("click", () => {
        console.log("Eliminar")
        handleDeleteTaskClick(task.id)
    })
    const editButton = article.querySelectorAll("button")[1]
    editButton.addEventListener("click", () => console.log("Editar"))

    function createButton(text) {
        const button = `

        <button class="hover:bg-slate-500 hover:text-white rounded px-2"> 
            ${text}
        </button>
      
        `
        return button
    }

    const checkbox = article.querySelector("input")

    checkbox.addEventListener("change", () => onChange(task.id, task))
    return article
}