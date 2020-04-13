const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = express.Router()

// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// add new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    // console.log(req.body)
    // res.send('Testing perfect')
})

// fetch current user (will call only if the auth middleware)
router.get('/users/me', auth, async (req, res) => {
    try{
        res.send(req.user)
    } catch (e) {
        res.status(404).send(e)
    }
    
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(404).send()
    // })
})

// logging out of current session
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// logging out of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// fetch all users (will call only if the auth middleware)
router.get('/users', auth, async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(404).send(e)
    }
    
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(404).send()
    // })
})

// fetch user by ID 
// (can also use findOne() if you want to search by any criteria other than ID)
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id //for accessing the request params
    
    try { 
        const user = await User.findById(_id)

        if (!user)
            return res.status(404).send()

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
    
    // User.findById(_id).then((user) => {
    //     if (!user) 
    //         return res.status(404).send()
        
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// update user by ID
// Bibin - 6th April - refractoring code to include auth
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'] //allowed update fields
    
    // check for valid update fields
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid Update'
        })
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()

        res.status(201).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// delete user by ID
// Bibin - 6th April - refractoring code to include auth
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload = multer({
    dest: 'avatar'
})

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})

module.exports = router