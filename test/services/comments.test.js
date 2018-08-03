const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const {articles} = require('../../src/config')

describe('service/comments.js', function () {

  const articleId = '0001'
  const userId = '0001'

  const commentContent = '1122some aad'
  let commentId

  beforeEach(async function () {
    return await mongo.init()
  })

  it('get comments by article id', async () => {
    assert((await services.comment.getCommentsByFilter({articleId})).length === 1)
  })

  it('get comments by user id', async () => {
    assert((await services.comment.getCommentsByFilter({userId})).length === 1)
  })

  it('add one comment', async () => {
    const comment = await services.comment.addOneComment(userId, articleId, commentContent)
    commentId = comment.id
    assert(comment.content === commentContent)
  })

  it('remove one comment', async () => {
    const res = await services.comment.deleteOneComment(commentId, {userId})
    assert(res.id === commentId)
    assert(res.isDeleted === true)
    assert(res.deletedBy)
  })

  it('remove all comments under article', async () => {
    const res = await services.comment.deleteCommentsByArticle(articleId)
    assert(res.result.ok === 1)
  })

})