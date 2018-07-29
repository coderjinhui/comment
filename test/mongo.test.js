const mongo = require('../src/mongo')
const {collections} = require('../src/config')

describe('test for mongo.js', () => {

  beforeEach(async () => {
    await mongo.db.collection(collections.USER).drop()
    await mongo.db.collection(collections.ARTICLE).drop()
  })

  it('should insert ', function () {
    return true
  })
})