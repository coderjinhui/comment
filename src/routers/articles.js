const express = require('express')
const router = express.Router()

const services = require('../services')

router
  .get('/', async (req, res) => {
    res.send(await services.articles.getAllArticle())
  })
  // .use('/:id', function (req, res, next) {
  //   console.log(req.params, req.method)
  //   next()
  // })
  .get('/:id', async (req, res) => {
    res.send(await services.articles.getOneArticle(req.params.id))
  })
// .delete('/:id', async (req, res) => {
//   res.send(await services.articles.deleteOneArticle(req.params.id))
// })
// .put('/:id', async (req, res) => {
//   res.send(await services.articles.deleteOneArticle(req.params.id))
// })
// .post('/:id', async (req, res) => {
//   res.send(await services.articles.deleteOneArticle(req.params.id))
// })

module.exports = router