const mongo = require('../mongo')
const {collections, projection} = require('../config')
const {genUUID} = require('../utils')

const getCommentsByFilter = async ({id, articleId, userId, commentId}) =>
  await mongo.db.collection(collections.USER).find({id, articleId, userId, commentId}, projection).toArray()

const getOneComment = async id => await mongo.db.collection(collections.COMMENT).findOne({id}, projection)

const addOneComment = async ({userId, commentId, articleId, content}) =>
  await mongo.db.collection(collections.COMMENT).insertOne({
    userId, commentId, articleId, content,
    id: genUUID(),
    createTime: Date.now(),
    isDeleted: false,
  }, projection)

const deleteOneComment = async id => await mongo.db.collection(collections.COMMENT).findOneAndUpdate({id}, projection)

const deleteCommentsByArticle = async articleId => await mongo.db.collection(collections.COMMENT).find({articleId})

const deleteCommentsByUser = async userId => await mongo.db.collection(collections.COMMENT).find({userId})

module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
}