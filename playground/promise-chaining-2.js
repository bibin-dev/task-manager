require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e8432731fe0203eb201a547')
// .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log('Count of incomplete tasks ' + result)
// }).catch ((e) => {
//     console.log('Error ' + e)
// })

// modifying above function for async-await
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const incompleteCount = await Task.countDocuments({ completed: false })

    return { task, incompleteCount }
}

deleteTaskAndCount('5e844dac570f5f40b1d3759a').then((result) => {
    console.log('Deleted Task: \n' + result.task)
    console.log('Incomplete tasks: ' + result.incompleteCount)
}).catch((e) => {
    console.log('Error\n' + e)
})