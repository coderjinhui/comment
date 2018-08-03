const mongo = require('../src/mongo')
const {articles, users, mongoUrl, mongoModel} = require('../src/config')
const assert = require('assert')

describe('test for mongo.js', () => {

  before(async () => {
    await mongo.init()
  })

  it('should insert', async function () {
    try{
      assert.ok(await mongoModel.articleModel.countDocuments() === articles.length, 'articles length should be equal.')
      assert.ok(await mongoModel.userModel.countDocuments() === users.length, 'users length should be equal.')
    } catch (e) {
      console.error(e)
      return false
    }
  })
})
