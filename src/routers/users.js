const express = require('express')
const router = express.Router()

const {users} = require('../controllers')

router
  .get('/', async (req, res) => {
    res.send(await users.getAllUsers())
  })

  .post('/upVoteArticle', async (req, res) => {
    const {userId, articleId} = req.body
    res.send(await users.updateOneUser(userId, 'upVoteArticles', 'remove', {article: articleId}))
  })
  .post('/downVoteArticle')
  .post('/upVoteComment')
  .post('/downVoteComment')
module.exports = router