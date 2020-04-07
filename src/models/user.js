const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //to filter white spaces in name
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true // gives us createdAt and updatedAt fields
})

// virtual field
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// method that eliminates user password and tokens whenever send() is called
userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    return userObj
}

// method to generate token (JWT)
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'HiBibin')
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// find user by mail and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) 
        throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) 
        throw new Error('Unable to login')

    return user
}

// hash the password before saving 
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)
    // to ensure that the save operation happens
    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User