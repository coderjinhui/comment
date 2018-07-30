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

  // it('increase comment', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'upVoteCount', 'add', fakeUpVoteArticle)
  //   assert(res.upVoteCount === 1)
  // })
  //
  // it('decrease comment', async () => {
  //   try {
  //     const res = await services.articles.updateOneArticle(testArticleId, 'downVoteCount', 'remove', fakeUpVoteArticle)
  //     assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  //   } catch ( e ) {
  //     assert(e.message === 'Cannot find record: ' + fakeUpVoteArticle.article)
  //   }
  // })
  //
  // it('down Vote one article', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'downVoteArticles', 'add', fakeUpVoteArticle)
  //   assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  // })
  //
  // it('cancel down Vote one article', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'downVoteArticles', 'remove', fakeUpVoteArticle)
  //   assert(res.upVoteArticles.find(record => record.article === fakeUpVoteArticle.article) === undefined)
  // })
  //
  // it('cancel down Vote without articles', async () => {
  //   try {
  //     await services.articles.updateOneArticle(testArticleId, 'downVoteArticles', 'remove', fakeUpVoteArticle)
  //   } catch ( e ) {
  //     assert(e.message === 'Cannot find record: ' + fakeUpVoteArticle.article)
  //   }
  // })
  //
  // it('comment one comment', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'upVoteComments', 'add', fakeArticleDoc)
  //   assert(res.upVoteComments.find(record => record.comment === fakeArticleDoc.comment) !== undefined)
  // })
  //
  // it('remove comment of one comment', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'upVoteComments', 'remove', fakeArticleDoc)
  //   assert(res.upVoteComments.find(record => record.comment === fakeArticleDoc.comment) === undefined)
  // })
  //
  // it('down Vote one comment', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'downVoteComments', 'add', fakeArticleDoc)
  //   assert(res.downVoteComments.find(record => record.comment === fakeArticleDoc.comment) !== undefined)
  // })
  //
  // it('cancel down Vote one comment', async () => {
  //   const res = await services.articles.updateOneArticle(testArticleId, 'downVoteComments', 'remove', fakeArticleDoc)
  //   assert(res.downVoteComments.find(record => record.comment === fakeArticleDoc.comment) === undefined)
  // })
  //
  // it('error field to update', async () => {
  //   const field = 'aa'
  //   try {
  //     await services.articles.updateOneArticle(testArticleId, 'downVoteArticles', field, fakeUpVoteArticle)
  //   } catch ( e ) {
  //     assert(e.message === 'Illegal field: ' + field)
  //   }
  // })

})