export default function TodoItem(title) {
    const article = document.createElement("article")

    article.innerHTML = `
    <h1>${title}<h1/>
    `
    return article
}