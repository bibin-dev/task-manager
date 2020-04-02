const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
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

module.exports = User