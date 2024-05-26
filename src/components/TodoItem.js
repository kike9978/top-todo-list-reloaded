export default function TodoItem(title) {
    const article = document.createElement("article")

    article.innerHTML = `

    <label> <input type="checkbox"> ${title}<label/>
    `
    return article
}