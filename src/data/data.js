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
            assignedTasksIds: [0, 2]

        },
        {
            id: 1,
            title: "🦐 Proyecto 2",
            assignedTasksIds: [1]

        },
    ]
}
export default data