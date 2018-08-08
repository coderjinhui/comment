const mongoose = require('mongoose')

const {collections} = require('./mongoConfig')

const articleSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true, index: true},
  content: {type: String, required: true},
  createTime: {type: Number, required: true},
  title: {type: String, required: true},
  upVoteCount: {type: Number, default: 0, min: 0},
  downVoteCount: {type: Number, default: 0, min: 0},
  commentCount: {type: Number, default: 0, min: 0},
})

const commentSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true, index: true},
  createTime: {type: Number, required: true},
  content: {type: String, required: true},
  userId: String,
  commentId: String,
  articleId: String,
  isDeleted: Boolean,
  deleteTimestamp: Number,
})

const userArticleSchema = new mongoose.Schema({
  article: {type: String, required: true}, timestamp: {type: Number, required: true}
}, {_id: false})

const userCommentSchema = new mongoose.Schema({
  comment: {type: String, required: true}, timestamp: {type: Number, required: true}
}, {_id: false})

const userSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true, index: true},
  name: {type: String, required: true},
  gender: {type: String, required: true},
  upVoteArticles: [userArticleSchema],
  downVoteArticles: [userArticleSchema],
  upVoteComments: [userCommentSchema],
  downVoteComments: [userCommentSchema],
  commentCount: {type: Number, default: 0, min: 0},
})

module.exports = {
  commentModel: mongoose.model(collections.COMMENT, commentSchema, collections.COMMENT),
  userModel: mongoose.model(collections.USER, userSchema, collections.USER),
  articleModel: mongoose.model(collections.ARTICLE, articleSchema, collections.ARTICLE),
}
