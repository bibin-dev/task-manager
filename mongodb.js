// CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// 127.0.0.1 - equivalent of localhost
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// method to connect to MongoDB database
MongoClient.connect(connectionURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true //for deprecated current server discovery and monitoring engine
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB')
    }

    const db = client.db(databaseName)
    
    db.collection('users').insertOne({
        name: 'Bibin',
        age: 28
    })
})