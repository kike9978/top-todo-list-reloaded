export default function TodoItem(task, onChange, handleDeleteTaskClick) {
  const article = document.createElement("article");
  article.className =
    "bg-slate-50 rounded flex justify-between relative todo-item h-14 px-3 items-center";

  article.innerHTML = `

        <div class="flex items-center gap-2 w-full">
            <input type="checkbox" ${
              task.isCompleted ? "checked" : ""
            } " class="appearance-none border-solid border-2  border-blue-400 size-6 rounded-full cursor-pointer inline-grid place-content-center before:content-[''] before:size-3 before:bg-blue-400 before:scale-0 before:transition-transform before:rounded-full hover:before:scale-100 hover:before:bg-blue-300 checked:before:scale-100 "> 
            
                   <div class="w-11/12">
               <p class="${
                 task.isCompleted ? "line-through text-slate-400" : ""
               }"> ${task.title}</p>
               <p class="text-slate-500 text-xs truncate">${
                 task.description
               }</p>
                   </div>
        </div>
    <div class="h-full justify-center items-center absolute right-2 gap-2">
    ${createButton("D")}
    ${createButton("E")}
    <input type="checkbox" id="star" class="appearance-none star-checkbox"> 
        </div>
    `;
  const elimButton = article.querySelectorAll("button")[0];
  elimButton.addEventListener("click", () => {
    handleDeleteTaskClick(task.id);
  });
  const editButton = article.querySelectorAll("button")[1];
  editButton.addEventListener("click", () => console.log("Editar"));

  function createButton(text) {
    const button = `
 
        <button class="hover:bg-slate-500 hover:text-white rounded px-2"> 
            ${text}
        </button>
      
        `;
    return button;
  }

  const checkbox = article.querySelector("input");

  checkbox.addEventListener("change", () => {
    onChange(task.id, task);
  });

  const favoriteCheck = article.querySelector("#star");

  return article;
}
