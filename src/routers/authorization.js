const express = require('express')
const router = express.Router()

const services = require('../services')

router
  .post('/login')
  .post('logout')

module.exports = router