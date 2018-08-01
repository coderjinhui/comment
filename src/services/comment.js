const mongo = require('../mongo')
const {collections, projection} = require('../config')
const {genUUID} = require('../utils')

const getCommentsByFilter = async ({id, articleId, userId, commentId}) =>
  await mongo.db.collection(collections.USER).find({id, articleId, userId, commentId}, projection).toArray()

const getOneComment = async id => await mongo.db.collection(collections.COMMENT).findOne({id}, projection)

/**
 * @description 增加一个评论
 * @param userId {string}
 * @param articleId {string}
 * @param content {string}
 * @param commentId=null {string}
 * @return {promise} the comment added
 * */
const addOneComment = async (userId, articleId, content, commentId=null) =>
  await mongo.db.collection(collections.COMMENT).insertOne({
    userId, commentId, articleId, content,
    id: genUUID(),
    createTime: Date.now(),
    isDeleted: false,
  }, projection)

const deleteOneComment = async ({id, articleId, userId}) =>
  await mongo.db.collection(collections.COMMENT).findOneAndUpdate({id}, {
    $set: {
      isDeleted: true,
      deletedTime: Date.now(),
      deletedBy: articleId || userId
    }
  }, projection)

/**
 * @description 批量删除文章的评论
 * @param articleId {string} 文章的id
 * @return {Promise}
 * */
const deleteCommentsByArticle = async articleId =>
  await mongo.db.collection(collections.COMMENT).updateMany({articleId}, {
    $set: {
      isDeleted: true,
      deletedTime: Date.now()
    }
  })

// const deleteCommentsByUser = async userId => await mongo.db.collection(collections.COMMENT).find({userId})

module.exports = {
  getCommentsByFilter,
  getOneComment,
  addOneComment,
  deleteCommentsByArticle,
  // deleteCommentsByUser,
  deleteOneComment,
}