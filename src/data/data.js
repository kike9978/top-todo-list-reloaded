const data = {
    tasks: [
        {
            id: 0,
            title: "hola",
            isCompleted: false
        },
        {
            id: 1,
            title: "Adios",
            isCompleted: true
        },
        {
            id: 2,
            title: "Otra tarea",
            isCompleted: true
        },
    ],

    projects: [
        {
            id: 0,
            title: "🦧 Proyecto 1",
            assignedListIds: [1, 3]

        },
        {
            id: 1,
            title: "🦐 Proyecto 2",
            assignedListIds: [2]
        },
        {
            id: 2,
            title: "🦐 Proyecto 3",
            assignedListIds: []
        },
    ],
    lists: [
        {
            id: 0,
            title: "Lista 1",
            assignedTasksIds: [0, 2]
        },
        {

            id: 1,
            title: "Lista 2",
            assignedTasksIds: [1]
        },
        {

            id: 2,
            title: "Lista 3",
            assignedTasksIds: []
        },
        {

            id: 3,
            title: "Lista 4",
            assignedTasksIds: []
        }

    ],
}
export default data