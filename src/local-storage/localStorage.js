import data from "../data/data"
export default class LocalStorage {

    test() {
        localStorage.setItem("test", "hola")
    }
    getValue(key) {
        return localStorage.getItem(key)
    }

    populateWithMockData() {

        localStorage.setItem("projects", JSON.stringify(data.projects))
        localStorage.setItem("lists", JSON.stringify(data.lists))
        localStorage.setItem("tasks", JSON.stringify(data.tasks))
    }

}