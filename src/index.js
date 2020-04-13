const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user.router')
const taskRouter = require('./routers/task.router')

const app = express()
const port = process.env.PORT || 3000

// sample code for file upload
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000 //max file size defined in bytes
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/))
            return cb(new Error('File must be a doc or docx'))
        
        cb(undefined, true)
        
        // types of callback
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true) // no error and upload file
        // cb(undefined, false) // no error and reject upload - DON'T USE !! 
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})


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