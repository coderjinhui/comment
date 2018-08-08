const assert = require('assert')
const mongoose = require('mongoose')
const services = require('../../src/services')
const {users, mongoUrl, mongoModel} = require('../../src/config')

describe('service users.js tests', () => {

  before(async () => {
    await mongoose.connect(mongoUrl, {useNewUrlParser: true})
  })

  const fakeUpVoteArticle = {
    article: '00020',
    timestamp: new Date() * 1
  }
  const fakeUpVoteComment = {
    comment: '00020',
    timestamp: new Date() * 1
  }
  const testUserId = '0005'

  let testUserInfo

  it('get all users', async function () {
    const allUsers = await services.users.getAllUsers()
    assert.ok(allUsers.every(user => user._id === undefined))
    assert.ok(allUsers.length = users.length)
  })

  it('get single user', async () => {
    testUserInfo = await services.users.getOneUser(testUserId)
    assert(testUserInfo._id === undefined)
    assert.ok(typeof testUserInfo.id === 'string', 'user id should be a string')
    assert.ok(Array.isArray(testUserInfo.upVoteArticles), 'user upVoteArticles should be an array')
  })

  it('upVoteArticles + 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteArticles', 'add', fakeUpVoteArticle)
    const aa = await mongoModel.userModel.findOneAndUpdate({testUserId}, {$push: {upVoteArticles: fakeUpVoteArticle}})
    console.log(aa)
    assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) !== undefined)
  })

  it('upVoteArticles - 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteArticles', 'remove', fakeUpVoteArticle)
    assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  })

  it('downVoteArticles + 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteArticles', 'add', fakeUpVoteArticle)
    assert(res.downVoteArticles.find(record => record.article === fakeUpVoteArticle.article) !== undefined)
  })

  it('downVoteArticles - 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteArticles', 'remove', fakeUpVoteArticle)
    assert(res.downVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  })

  it('make downVoteArticles < 0', async () => {
    try {
      await services.users.updateOneUser(testUserId, 'downVoteArticles', 'remove', fakeUpVoteArticle)
    } catch ( e ) {
      console.log(e)
      assert(e instanceof RangeError)
    }
  })

  it('upVoteComments + 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteComments', 'add', fakeUpVoteComment)
    assert(res.upVoteComments.find(record => record.comment === fakeUpVoteComment.comment) !== undefined)
  })

  it('upVoteComments - 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteComments', 'remove', fakeUpVoteComment)
    assert(res.upVoteComments.find(record => record.comment === fakeUpVoteComment.comment) === undefined)
  })

  it('downVoteComments + 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteComments', 'add', fakeUpVoteComment)
    console.log(res)
    assert(res.downVoteComments.find(record => record.comment === fakeUpVoteComment.comment) !== undefined)
  })

  it('downVoteComments - 1', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteComments', 'remove', fakeUpVoteComment)
    assert(res.downVoteComments.find(record => record.comment === fakeUpVoteComment.comment) === undefined)
  })

  it('update illegal field', async () => {
    const field = 'aa'
    try {
      await services.users.updateOneUser(testUserId, 'downVoteArticles', field, fakeUpVoteArticle)
    } catch ( e ) {
      assert(e.message === 'Illegal field: ' + field)
    }
  })

})
