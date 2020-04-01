const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     }, 
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: 'Walk the dog   '
// })

// task.save().then(() => {
//     console.log('Success!! \n' + task)
// }).catch((error) => {
//     console.log('Error!! \n' + error)
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true //to filter white spaces in name
//     }, 
//     email: {
//         type: String,
//         required: true,
//         lowercase: true, //for lowercase
//         validate(value) {
//             if (!validator.isEmail(value))
//                 throw new Error('Invalid email entered')
//         }
//     },
//     age: {
//         type: Number,
//         default: 18, //default value for age
//         validate(value) {
//             if (value < 18) {
//                 throw new Error('Age must be at least 18')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             console.log(value)
//             if (value.toLowerCase().includes('password'))
//                 throw new Error('Password cannot include \'password\'')
//         }
//     }
// })

// const me = new User({
//     name: 'Shuchi   ',
//     email: 'shuchi.tm@gmail.com',
//     password: 'Password'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('error\n' + error)
// })