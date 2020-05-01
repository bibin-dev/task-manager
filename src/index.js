const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user.router')
const taskRouter = require('./routers/task.router')

const app = express()
const port = process.env.PORT || 3000

//including express in file
app.use(express.json())

// using user and task route handlers in application
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})