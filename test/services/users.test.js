const assert = require('assert');
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const collections = require('../../src/config')

beforeEach(function () {
  return mongo.init()
})

describe('service users.js tests', () => {
  it('all users return with no _id', async function () {
    const allUsers = await services.users.getAllUsers()
    return allUsers.every(user => user._id === undefined)
  })

  it('single user', async () => {
    const user = await services.users.getOneUser('0001')
    assert(user._id === undefined)
    assert.ok(typeof user.id === 'string', 'user id should be a string')
    assert.ok(Array.isArray(user.upVoteArticles), 'user upVoteArticles should be an array')
  })

  it('update one user', async () => {
    const wantUpdateInfo = {
      upVoteArticles: [

      ]
    }
  })

})