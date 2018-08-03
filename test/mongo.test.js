const MongoClient = require('mongodb').MongoClient
const {collections, articles, users, indexes, mongoUrl, mongoDBName} = require('../src/config')
const assert = require('assert')

describe('test for mongo.js', () => {

  let db

  before(async () => {
    try {
      const client = await new MongoClient(mongoUrl, {useNewUrlParser: true}).connect()
      db = client.db(mongoDBName)
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
      assert.ok(await db.collection(collections.ARTICLE).find().count() === articles.length, 'articles length should be equal.')
      assert.ok(await db.collection(collections.USER).find().count() === users.length, 'users length should be equal.')
    } catch (e) {
      console.error(e)
      return false
    }
  })
})
