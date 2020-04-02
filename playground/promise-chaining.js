require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e847f8b9245c84678175658', { age: 89 })
.then((user) => {
    console.log(user)
    return User.countDocuments({ age: 89 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})