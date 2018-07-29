const MongoClient = require('mongodb').MongoClient
const {collections, articles, users, indexes} = require('./config')
const DB_NAME = 'comments'
const mongoUrl = 'mongodb://localhost:27017'

module.exports.init = async () => {
  const client = await new MongoClient(mongoUrl, {useNewUrlParser: true}).connect()
  const db = client.db(DB_NAME)

  const articleInDB = await db.collection(collections.ARTICLE).find().toArray()
  const usersInDB = await db.collection(collections.USER).find().toArray()
  if (!articleInDB || !articleInDB.length) {
    await db.collection(collections.ARTICLE).insertMany(articles)
    await db.collection(collections.USER).createIndexes(indexes.users)
  }
  if (!usersInDB || !usersInDB.length) {
    await db.collection(collections.USER).insertMany(users)
    await db.collection(collections.ARTICLE).createIndexes(indexes.articles)
  }
  module.exports.db = db
}