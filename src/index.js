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

// const bcrypt = require('bcrypt')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc12345' }, 'this is my new course', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'this is my new course')
//     console.log(data)
// }

// myFunction()