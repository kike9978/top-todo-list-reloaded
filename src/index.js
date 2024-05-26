
import "./styles/style.css"
import TodoItem from "./components/TodoItem";

const data = [
    {
        id: 0,
        title: "hola",
        isCompleted: false
    },
    {
        id: 1,
        title: "Adios",
        isCompleted: false
    },
]
// document.querySelector("body").appendChild(TodoItem("Hola que tal", ))

const todosItems = data.map(d => TodoItem(d.title))
console.log(Object.entries(todosItems))
console.log(Object.entries(todosItems)[0][1])

document.querySelector("body").appendChild(Object.entries(todosItems)[0][1])