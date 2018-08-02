const express = require('express')
const router = express.Router()

const controllers = require('../controllers')

router
.get('/article/:id', async (req, res) => {
  try{
    res.send(await controllers.comments.getComments({articleId: req.params.id}))
  } catch (e) {
    res.status(500).send(e.message)
  }
})
.put('/add', async (req, res) => {
  try {
    const {userId, articleId, content} = req.body
    res.send(await controllers.comments.putOneComment(userId, articleId, content))
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router