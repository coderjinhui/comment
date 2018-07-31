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

  it('all articles', async function () {
    const allArticles = await services.articles.getAllArticle()
    assert.ok(allArticles.every(article => article._id === undefined))
    assert.ok(allArticles.length = articles.length)
  })

  it('single article', async () => {
    const article = await services.articles.getOneArticle('0001')
    assert(article._id === undefined)
    assert.ok(typeof article.id === 'string', 'article id should be a string')
    assert.ok(typeof article.upVoteCount, 'article upVoteCount should be a number')
  })

  it('increase up vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'add', fakeUpVoteArticle)
    assert(res.upVoteCount === 1)
  })

  it('decrease up vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'remove', fakeUpVoteArticle)
    assert(res.upVoteCount === 0)
  })

  it('decrease up Vote under zero', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'remove', fakeUpVoteArticle)
    } catch ( e ) {
      assert(e.message === 'Document failed validation')
    }
  })

  it('increase down vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'add', fakeUpVoteArticle)
    assert(res.downVoteCount === 1)
  })

  it('decrease down vote', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', fakeUpVoteArticle)
    assert(res.downVoteCount === 0)
  })

  it('decrease down Vote under zero', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', fakeUpVoteArticle)
    } catch ( e ) {
      assert(e.message === 'Document failed validation')
    }
  })

  it('increase comment', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'commentCount', 'add', fakeUpVoteArticle)
    assert(res.commentCount === 1)
  })

  it('decrease comment', async () => {
    const res = await services.articles.updateOneArticle(testArticleId, 'commentCount', 'remove', fakeUpVoteArticle)
    assert(res.commentCount === 0)
  })

  it('decrease comment under zero', async () => {
    try {
      await services.articles.updateOneArticle(testArticleId, 'commentCount', 'remove', fakeUpVoteArticle)
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