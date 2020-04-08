const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

// add new task
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
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
// UPDATE - return only tasks of the owner (logged in user)
// UPDATE - Bibin 8th April - GET /tasks?completed=true
// UPDATE - adding pagination GET /tasks?limit=10&skip=10
// skip is generally used to skip over the mentioned number of results
// SORT functionlity added (/tasks?sortBy=createdAt:desc)
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {}
        //variable for SORT functionality
        const sort = {} 
        //checking if completed param has been provided in the query string
        if (req.query.completed)
            match.completed = req.query.completed
        // commenting the following line for now
        // const tasks = await Task.find({ owner: req.user._id })

        // sort param assignment
        if (req.query.sortBy) {
            const sortParam = req.query.sortBy.split(':')
            sort[sortParam[0]] = sortParam[1] === 'desc' ? -1 : 1
        }

        // UPDATE - can also use the following commented 2 code lines
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                // sort: {
                //     // createdAt: -1, // 1 for ASC, -1 for DESC
                //     completed: 1
                // }
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)

        //comment the IF condition and send() if above 2 lines are used
        // if (!tasks)
        //     return res.status(404).send({
        //         error: 'tasks not found'
        //     })

        // res.send(tasks)
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
// Bibin - 6th April = add auth to the endpoint
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task)
            return res.status(404).send({
                error: 'No Task Found'
            })

        res.send(task)
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
// UPDATED for auth
router.patch('/tasks/:id', auth, async (req, res) => {
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
        // new way - first find and then save relevant fields
        // ensures middleware runs
        // changed function to include owner details
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task)
            return res.status(401).send()

        updateArr.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()

        // commented out - use this for a one step process without middleware
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete task by ID
// UPDATED for auth
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // changed function to include owner details
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) 
            return res.status(404).send()

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router