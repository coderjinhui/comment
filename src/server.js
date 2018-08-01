const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')

const routers = require('./routers')
const mongo = require('./mongo')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/article', routers.articles)
app.use('/user', routers.users)
app.use('/comment', routers.comments)
app.use('/login', routers.authorization)

app.use(express.static(path.resolve('./static'), {index: ['index.html'],}))


mongo.init()
  .then(() => app.listen(4444))
  .then(() => console.log('app run on http://localhost:4444'))
  .catch(e => console.error('mongo init error:', e))
