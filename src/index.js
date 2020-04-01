const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
    // console.log(req.body)
    // res.send('Testing perfect')
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

// fetch all users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

// fetch user by ID 
// (can also use findOne() if you want to search by any criteria other than ID)
app.get('/users/:id', (req, res) => {
    const _id = req.params.id //for accessing the request params
    User.findById(_id).then((user) => {
        if (!user) 
            return res.status(404).send()
        
        res.send(user)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

// fetch all tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        if (!tasks || tasks.length === 0)
            return res.status(404).send([])

        res.send(tasks)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

// fetch task by ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task)
            return res.status(404).send()
        
        res.send(task)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

