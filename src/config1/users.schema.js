const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: String,
  content: String,
  userId: String,
  createTime: Number,
  isDeleted: Boolean,
  deleteTimestamp: Number,
  title: String,
  upVoteCount: Number,
  downVoteCount: Number,
  commentCount: Number,
})

module.exports = new schema()