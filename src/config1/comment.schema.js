const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: String,
  content: String,
  userId: String,
  commentId: String,
  article: String,
  createTime: Number,
})

module.exports = new schema()