const data = {
    tasks: [
        {
            id: 0,
            title: "hola",
            isCompleted: false,
            description: "Test descripción"
        },
        {
            id: 1,
            title: "Adios",
            isCompleted: true
        },
        {
            id: 2,
            title: "Otra tarea",
            isCompleted: true,
            description: "This is a super ultra mega hyper delta jumbo xxxxxxl extra gamma omega alpha large task descriptionThis is a super ultra mega hyper delta jumbo xxxxxxl extra gamma omega alpha large task descriptionThis is a super ultra mega hyper delta jumbo xxxxxxl extra gamma omega alpha large task descriptionThis is a super ultra mega hyper delta jumbo xxxxxxl extra gamma omega alpha large task description"
        },
    ],

    projects: [
        {
            id: 0,
            title: "🦧 Projects",
            assignedListIds: [1]

        },
        {
            id: 1,
            title: "🦐 Areas",
            assignedListIds: [2]
        },
        {
            id: 2,
            title: "🍆 Resources",
            assignedListIds: []
        },
        {
            id: 3,
            title: "🥬 Archives",
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

    ],
}
export default data