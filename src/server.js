const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const mongo = require('./mongo')
const {getArticle, getAllUsers, upVoteArticle} = require('./services')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.path, req.params, req.query, req.body)
  next()
})

app.get('/article', async (req, res) => {
  try{
    res.send(await getArticle())
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.get('/users', async (req, res) => {
  try{
    res.send(await getAllUsers())
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.put('/comment', async (req, res) => {

})

app.post('/upVoteArticle', async (req, res) => {
  try {
    await upVoteArticle(req.body)
    res.sendStatus(202)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.post('/downVoteArticle', async (req, res) => {

})
app.post('/upVoteComment', async (req, res) => {

})

app.use(express.static(path.resolve('./static'), {index: ['index.html'],}))


mongo.init()
  .then(() => app.listen(4444))
  .then(() => console.log('app run on http://localhost:4444'))
  .catch(e => console.error('mongo init error:', e))
