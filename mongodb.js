// CRUD operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require('mongodb')

// 127.0.0.1 - equivalent of localhost
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

// method to connect to MongoDB database
MongoClient.connect(connectionURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true //for deprecated current server discovery and monitoring engine
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB')
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 28
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({ 
    //     _id: new ObjectID("5e8329946ca9053392219a9f")
    // }, {
    //     $set: {
    //         name: "Monkey"
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').findOne({ name: "Vikram" }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find item in collection')
    //     }

    //     console.log(user)
    // })

    // use toArray() to get the result array
    // db.collection('users').find({ age: 28 }).toArray((error, userArr) => {
    //     console.log(userArr)
    // })

    // use count() to get the count of items matching the query object
    // db.collection('users').find({ age: 28 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').find({ completed: true }).toArray((error, result) => {
    //     if (error) {
    //         return console.log('Unable to find items correctly')
    //     }

    //     console.log(result)
    // })

    // db.collection('users').insertOne({
    //     name: 'Vikram',
    //     age: 28
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert item correctly')
    //     }

    //     // print all docs using ops; returns an array
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jenny',
    //         age: 30
    //     }, {
    //         name: "Gunther",
    //         age: 72
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert docs')
    //     }

    //     console.log(result.ops)
    // })

    // insert 3 tasks documents into tasks collection
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'walk dog',
    //         completed: true
    //     }, {
    //         description: 'wash clothes',
    //         completed: true
    //     }, {
    //         description: 'prepare lunch',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents correctly in tasks collection')
    //     }

    //     console.log(result.ops)
    // })
})