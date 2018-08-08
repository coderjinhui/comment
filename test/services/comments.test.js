const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')

describe('service/comments.js', function () {

  const articleId = '0001'
  const userId = '0001'

  const commentContent = '1122some aad'
  let commentId

  beforeEach(async function () {
    return await mongo.init()
  })

  it('add one comment', async () => {
    const comment = await services.comments.addOneComment(userId, articleId, commentContent)
    commentId = comment.id
    assert.ok(comment.content === commentContent, 'comment content show equal')
    assert.ok(comment.userId === userId, 'comment user id show equal')
    assert.ok(comment.articleId === articleId, 'comment article id show equal')
  })

  it('get comments by article id', async () => {
    const res = await services.comments.getCommentsByFilter({articleId})
    assert(res.every(comment => comment.articleId === articleId))
  })

  it('get comments by user id', async () => {
    const res = await services.comments.getCommentsByFilter({userId})
    assert(res.every(comment => comment.userId === userId))
  })

  it('remove one comment', async () => {
    const res = await services.comments.deleteOneComment(commentId, {userId})
    assert(res.isDeleted === true)
    assert(res.deletedBy = userId)
  })

  it('remove all comments under article', async () => {
    const res = await services.comments.deleteCommentsByArticle(articleId)
    assert(res.ok === 1)
  })

})
