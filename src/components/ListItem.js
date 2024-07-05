import { closeSideBar } from "../utils/uiUtils";

export default function ListItem(list, handleTaskListClick) {
  const length = list.pendingTasksCount;
  const article = document.createElement("article");
  article.className =
    "hover:bg-pink-100 p-3 rounded flex justify-between cursor-pointer";
  article.innerHTML = `
           <span>${list.title}</span>
            
            <span class="rounded-full bg-slate-200 inline-flex justify-center items-center size-5">
          ${length}
            </span>
           
        `;

  article.addEventListener("click", () => {
    handleTaskListClick(list.id);
    article.classList.add("bg-pink-50", "text-pink-600");
    closeSideBar();
  });

  return article;
}
