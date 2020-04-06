const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user.router')
const taskRouter = require('./routers/task.router')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

// Express middleware function
// app.use((req, res, next) => {
//     if (req.method === 'GET')
//         res.send('GET requests are disabled')
//     else 
//         next()
// })

// Express middleware function for maintenance
// app.use((req, res, next) => {
//     res.status(503).send('Site maintenance on!!')
// })

//including express in file
app.use(express.json())

// using user and task route handlers in application
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

// const main = async () => {
//     // const task = await Task.findById('5e8b03d5736e48635fcc84ed')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5e8af1593c223d630600400a')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()