const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const {users} = require('../../src/config')

describe('service users.js tests', () => {
  beforeEach(async function () {
    return await mongo.init()
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

  it('all users', async function () {
    const allUsers = await services.users.getAllUsers()
    assert.ok(allUsers.every(user => user._id === undefined))
    assert.ok(allUsers.length = users.length)
  })

  it('single user', async () => {
    const user = await services.users.getOneUser('0001')
    assert(user._id === undefined)
    assert.ok(typeof user.id === 'string', 'user id should be a string')
    assert.ok(Array.isArray(user.upVoteArticles), 'user upVoteArticles should be an array')
  })

  it('comment one article', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteArticles', 'add', fakeUpVoteArticle)
    assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) !== undefined)
  })

  it('cancel comment one article', async () => {
    try {
      const res = await services.users.updateOneUser(testUserId, 'upVoteArticles', 'remove', fakeUpVoteArticle)
      assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
    } catch ( e ) {
      assert(e.message === 'Cannot find record: ' + fakeUpVoteArticle.article)
    }
  })

  it('down Vote one article', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteArticles', 'add', fakeUpVoteArticle)
    assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  })

  it('cancel down Vote one article', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteArticles', 'remove', fakeUpVoteArticle)
    assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  })

  it('cancel down Vote without articles', async () => {
    try {
      await services.users.updateOneUser(testUserId, 'downVoteArticles', 'remove', fakeUpVoteArticle)
    } catch ( e ) {
      assert(e.message === 'Cannot find record: ' + fakeUpVoteArticle.article)
    }
  })

  it('comment one comment', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteComments', 'add', fakeUpVoteComment)
    assert(res.upVoteComments.find(record => record.comment === fakeUpVoteComment.comment) !== undefined)
  })

  it('remove comment of one comment', async () => {
    const res = await services.users.updateOneUser(testUserId, 'upVoteComments', 'remove', fakeUpVoteComment)
    assert(res.upVoteComments.find(record => record.comment === fakeUpVoteComment.comment) === undefined)
  })

  it('down Vote one comment', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteComments', 'add', fakeUpVoteComment)
    assert(res.downVoteComments.find(record => record.comment === fakeUpVoteComment.comment) !== undefined)
  })

  it('cancel down Vote one comment', async () => {
    const res = await services.users.updateOneUser(testUserId, 'downVoteComments', 'remove', fakeUpVoteComment)
    assert(res.downVoteComments.find(record => record.comment === fakeUpVoteComment.comment) === undefined)
  })

  it('error field to update', async () => {
    const field = 'aa'
    try {
      await services.users.updateOneUser(testUserId, 'downVoteArticles', field, fakeUpVoteArticle)
    } catch ( e ) {
      assert(e.message === 'Illegal field: ' + field)
    }
  })

})