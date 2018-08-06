const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const {articles} = require('../../src/config')
const ValidationError = require('mongoose/lib/error/validation')

describe('service/articles.js tests', () => {
  beforeEach(async function () {
    try {
      await mongo.init()
    } catch ( e ) {
      console.log('service/articles.js tests before', e)
    }
  })

  const fakeUpVoteArticle = {
    count: 1
  }
  const testArticleId = '0001'

  let articleInfo = {}

  it('all articles', async function () {
    const allArticles = await services.articles.getAllArticles()
    assert.ok(allArticles.every(article => article._id === undefined))
    assert.ok(allArticles.length = articles.length)
  })

  it('single article', async () => {
    articleInfo = await services.articles.getOneArticle('0001')
    assert(articleInfo._id === undefined)
    assert.ok(typeof articleInfo.id === 'string', 'article id should be a string')
    assert.ok(typeof articleInfo.upVoteCount, 'article upVoteCount should be a number')
  })

  it('upVoteCount + 1', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'add', fakeUpVoteArticle)
    assert(res.upVoteCount - articleInfo.upVoteCount === 1)
  })

  it('upVoteCount - 1', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'remove', fakeUpVoteArticle)
    assert(res.upVoteCount - articleInfo.upVoteCount === 0)
  })

  it('upVoteCount < 0', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'remove', {count: articleInfo.upVoteCount + 1})
    } catch ( e ) {
      assert(e instanceof ValidationError)
    }
  })

  it('downVoteCount + 1', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'add', fakeUpVoteArticle)
    assert(res.downVoteCount - articleInfo.downVoteCount === 1)
  })

  it('downVoteCount - 1', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', fakeUpVoteArticle)
    assert(res.downVoteCount - articleInfo.downVoteCount === 0)
  })

  it('downVoteCount < 0', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', {count: articleInfo.downVoteCount + 1})
    } catch ( e ) {
      assert(e.message === 'Document failed validation')
    }
  })

  it('commentCount + 1', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'commentCount', 'add', fakeUpVoteArticle)
    assert(res.commentCount - articleInfo.commentCount === 1)
  })

  it('commentCount - 1', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'commentCount', 'remove', fakeUpVoteArticle)
    assert(res.commentCount - articleInfo.commentCount === 0)
  })

  it('commentCount < 0', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'commentCount', 'remove', {count: articleInfo.commentCount + 1})
    } catch ( e ) {
      assert(e instanceof ValidationError)
    }
  })

  it('error field to update', async () => {
    const field = 'aa'
    try {
      await services.articles.updateOneArticle(testArticleId, 'commentCount', field, fakeUpVoteArticle)
    } catch ( e ) {
      assert(e instanceof TypeError)
    }
  })

})
