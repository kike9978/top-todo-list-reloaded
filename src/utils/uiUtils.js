function openSideBar() {
    const root = document.querySelector("#root")
    root.classList.remove("grid-cols-[0px_1fr]")
    root.classList.add("grid-cols-[100%_0px]")


}
function closeSideBar() {
    const root = document.querySelector("#root")
    root.classList.remove("grid-cols-[100%_0px]")
    root.classList.add("grid-cols-[0px_1fr]")

}

export { openSideBar, closeSideBar }