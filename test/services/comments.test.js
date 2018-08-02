const assert = require('assert')
const mongo = require('../../src/mongo')
const services = require('../../src/services')
const {articles} = require('../../src/config')

describe('service/comments.js', function(){

    const articleId = '0001'
    const userId = '0001'

    beforeEach(async function () {
        return await mongo.init()
    })

    it('get comments by article id', async () => {
        assert((await services.comment.getCommentsByFilter({articleId})).length === 1)
    })

    it('get comments by user id', async () => {
        assert((await services.comment.getCommentsByFilter({userId})).length === 1)
    })

})