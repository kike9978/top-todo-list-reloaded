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
            assignedListIds: [1]

        },
        {
            id: 1,
            title: "🦐 Proyecto 2",
            assignedListIds: [2]

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
        }

    ],
}
export default data