const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const collections = require('../../src/config')
const {users} = require('../../src/config')

describe('service users.js tests', () => {
  beforeEach(function () {
    return mongo.init()
  })

  const fakeUpVoteArticle = {
    article: '00020',
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

  // it('update one user with push', async () => {
  //   const res = await services.users.updateOneUserWithPush(testUserId, fakeUpVoteArticle)
  //   assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article))
  // })

  it('update one user with pop', async () => {
    const res = await services.users.updateOneUserWithPop(testUserId, fakeUpVoteArticle)
    console.log(res)
    assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  })

})