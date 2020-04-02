const express = require('express')
const Task = require('../models/task')
const router = express.Router()

// add new task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        const tasks = await task.save()
        res.status(201).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(() => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// fetch all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})

        if (!tasks)
            return res.status(404).send()

        res.status(201).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.find({}).then((tasks) => {
    //     if (!tasks || tasks.length === 0)
    //         return res.status(404).send()

    //     res.send(tasks)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// fetch task by ID
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task)
            return res.status(404).send()

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.findById(_id).then((task) => {
    //     if (!task)
    //         return res.status(404).send()
        
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// update task by ID
router.patch('/updateTaskById/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updateArr = Object.keys(req.body)

    const isValidOperation = updateArr.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid Update'
        })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task)
            return res.status(401).send()

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete task by ID
router.delete('/deleteTaskById/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) 
            return res.status(404).send()

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router