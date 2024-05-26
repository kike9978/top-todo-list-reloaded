export default function TodoItem(title) {
    const article = document.createElement("article")

    article.innerHTML = `
    <h1 class="font-bold">${title}<h1/>
    `
    return article
}