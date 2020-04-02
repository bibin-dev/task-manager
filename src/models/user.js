const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //to filter white spaces in name
    }, 
    email: {
        type: String,
        required: true,
        lowercase: true, //for lowercase
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid email entered')
        }
    },
    age: {
        type: Number,
        default: 18, //default value for age
        validate(value) {
            if (value < 18) {
                throw new Error('Age must be at least 18')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('Password cannot include \'password\'')
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)
    // to ensure that the save operation happens
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User