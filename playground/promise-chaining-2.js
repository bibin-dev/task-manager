require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e8432731fe0203eb201a547')
.then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log('Count of incomplete tasks ' + result)
}).catch ((e) => {
    console.log('Error ' + e)
})