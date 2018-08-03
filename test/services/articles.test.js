const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const {articles} = require('../../src/config')

describe('service articles.js tests', () => {
  beforeEach(async function () {
    return await mongo.init()
  })

  const fakeUpVoteArticle = {
    count: 1
  }
  const testArticleId = '0001'

  let articleInfo = {}

  it('all articles', async function () {
    const allArticles = await services.articles.getAllArticle()
    assert.ok(allArticles.every(article => article._id === undefined))
    assert.ok(allArticles.length = articles.length)
  })

  it('single article', async () => {
    articleInfo = await services.articles.getOneArticle('0001')
    assert(articleInfo._id === undefined)
    assert.ok(typeof articleInfo.id === 'string', 'article id should be a string')
    assert.ok(typeof articleInfo.upVoteCount, 'article upVoteCount should be a number')
  })

  it('increase up vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'add', fakeUpVoteArticle)
    assert(res.upVoteCount - articleInfo.upVoteCount === 1)
  })

  it('decrease up vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'remove', fakeUpVoteArticle)
    assert(res.upVoteCount - articleInfo.upVoteCount === 0)
  })

  it('decrease up Vote under zero', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'remove', {count: articleInfo.upVoteCount + 1})
    } catch ( e ) {
      assert(e.message === 'Document failed validation')
    }
  })

  it('increase down vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'add', fakeUpVoteArticle)
    console.log(res, articleInfo)
    assert(res.downVoteCount - articleInfo.downVoteCount === 1)
  })

  it('decrease down vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', fakeUpVoteArticle)
    assert(res.downVoteCount - articleInfo.downVoteCount === 0)
  })

  it('decrease down Vote under zero', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', {count: articleInfo.downVoteCount + 1})
    } catch ( e ) {
      assert(e.message === 'Document failed validation')
    }
  })

  it('increase comment', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'commentCount', 'add', fakeUpVoteArticle)
    assert(res.commentCount - articleInfo.commentCount === 1)
  })

  it('decrease comment', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'commentCount', 'remove', fakeUpVoteArticle)
    assert(res.commentCount - articleInfo.commentCount === 0)
  })

  it('decrease comment under zero', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'commentCount', 'remove', {count: articleInfo.commentCount + 1})
    } catch ( e ) {
      assert(e.message === 'Document failed validation')
    }
  })

  it('error field to update', async () => {
    const field = 'aa'
    try {
      await services.articles.updateOneArticle(testArticleId, 'commentCount', field, fakeUpVoteArticle)
    } catch ( e ) {
      assert(e.message === 'Illegal field: ' + field)
    }
  })

})
