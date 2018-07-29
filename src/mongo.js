const MongoClient = require('mongodb').MongoClient
const {collections, article, users} = require('./config')
const DB_NAME = 'comments'
const mongoUrl = 'mongodb://localhost:27017'

module.exports.init = async () => {
  const client = await new MongoClient(mongoUrl, {useNewUrlParser: true}).connect()
  const db = client.db(DB_NAME)
  await db.collection(collections.USER).createIndexes([{}])
  const articleInDB = await db.collection(collections.ARTICLE).find().toArray()
  const usersInDB = await db.collection(collections.USER).find().toArray()
  if (!articleInDB.length) {
    await db.collection(collections.ARTICLE).insertOne(article)
  }
  if (!usersInDB.length) {
    await db.collection(collections.USER).insertMany(users)
  }
  module.exports.db = db
}