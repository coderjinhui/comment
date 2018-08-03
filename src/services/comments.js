const mongo = require('../mongo')
const {collections, projection} = require('../config')
const {genUUID} = require('../utils')

/**
 * @description get comments by some filter
 * @param [articleId] {string}
 * @param [userId] {string}
 * @param [commentId] {string}
 * @returns {Promise<comment>}
 */
const getCommentsByFilter = async ({articleId, userId, commentId}) =>{
  const query = {}
  if (articleId) query.articleId = articleId
  if (userId) query.userId = userId
  if (commentId) query.commentId = commentId
  return await mongo.db.collection(collections.COMMENT).find(query, projection).toArray()
}

const getOneComment = async id => await mongo.db.collection(collections.COMMENT).findOne({id}, projection)

/**
 * @function
 * @description 增加一个评论
 * @param userId {string}
 * @param articleId {string}
 * @param content {string}
 * @param commentId=null {string}
 * @return {promise} the comment added
 * */
const addOneComment = async (userId, articleId, content, commentId=null) =>
  (await mongo.db.collection(collections.COMMENT).insertOne({
    userId, commentId, articleId, content,
    id: genUUID(),
    createTime: Date.now(),
    isDeleted: false,
  })).ops[0]

/**
 * @function
 * @param id comment id
 * @param [articleId]
 * @param [userId]
 * @return {promise}
 */
const deleteOneComment = async (id, {articleId, userId}) => {
  const updateRole = articleId ? 'article' : 'user'
  const result = await mongo.db.collection(collections.COMMENT).findOneAndUpdate({id}, {
    $set: {
      isDeleted: true,
      deletedTime: Date.now(),
      deletedBy: articleId || userId,
      updater: updateRole
    }
  }, {...projection, returnOriginal: false})
  return result.value
}

/**
 * @description 批量删除文章的评论
 * @param articleId {string} 文章的id
 * @return {Promise}
 * */
const deleteCommentsByArticle = async articleId =>
  await mongo.db.collection(collections.COMMENT).updateMany({articleId}, {
    $set: {
      isDeleted: true,
      deletedTime: Date.now(),
      deletedBy: articleId,
      updater: 'article'
    }
  })

module.exports = {
  getCommentsByFilter,
  getOneComment,
  addOneComment,
  deleteCommentsByArticle,
  deleteOneComment,
}