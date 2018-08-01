const express = require('express')
const router = express.Router()

const controllers = require('../controllers')

router.get('/', async (req, res) => {
  res.send(await controllers.users.getAllUsers())
})

module.exports = router