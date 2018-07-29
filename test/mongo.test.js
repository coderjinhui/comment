const MongoClient = require('mongodb').MongoClient
const {collections, articles, users, indexes} = require('../src/config')
const DB_NAME = 'comments'
const mongoUrl = 'mongodb://localhost:27017'
const mongo = require('../src/mongo')
const assert = require('assert')

describe('test for mongo.js', () => {

  before(async () => {
    try {
      const client = await new MongoClient(mongoUrl, {useNewUrlParser: true}).connect()
      const db = client.db(DB_NAME)
      const _collections = (await db.listCollections().toArray()).map(d => d.name)
      if (_collections.includes(collections.USER)) {
        await db.collection(collections.USER).drop()
      }
      if (_collections.includes(collections.ARTICLE)) {
      await db.collection(collections.ARTICLE).drop()
      }
    }catch (e) {
      console.error('test for mongo.js', e)
    }
  })

  it('should insert', async function () {
    try{
      await mongo.init()
      assert.ok( await mongo.db.collection(collections.ARTICLE).find().count() === articles.length, 'articles length should be equal.')
      assert.ok( await mongo.db.collection(collections.USER).find().count() === users.length, 'users length should be equal.')
    } catch (e) {
      console.error(e)
      return false
    }
  })
})