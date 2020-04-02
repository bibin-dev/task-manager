const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user.router')
const taskRouter = require('./routers/task.router')

const app = express()
const port = process.env.PORT || 3000

//including express in file
app.use(express.json())

// using user and task routes in application
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

const bcrypt = require('bcrypt')

const myFunction = async () => {
    const password = 'Bibin@1992'
    const hashedPassword = await bcrypt.hash(password, 8)

    const isMatch = await bcrypt.compare(password, hashedPassword) 
    console.log(isMatch)
}

myFunction()