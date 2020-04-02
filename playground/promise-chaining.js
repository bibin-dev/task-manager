require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e847f8b9245c84678175658', { age: 89 })
// .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 89 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// same as above, with async and await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('5e847f8b9245c84678175658', 104).then((count) => {
    console.log('Printing count\n' + count)
}).catch((e) => {
    console.log('error\n' + e)
})