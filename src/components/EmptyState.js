export default function EmptyState(message) {
    const div = document.createElement("div")
    div.classList.add("flex-grow", "flex", "flex-col", "items-center", "justify-center")
    div.innerHTML = message

    return div
}