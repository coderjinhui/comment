const services = require('../services')

const {getOneComment, getCommentsByFilter, addOneComment, deleteOneComment, deleteCommentsByArticle} = services.comment
const {updateOneArticle} = services.articles
const {updateOneUser} = services.users

/**
 * 用户点反对的时候，首先要去已点赞的里面看看，是不是已经点过赞了，这次是取消的动作。反之亦然。
 * */

const putOneComment = async (userId, articleId, content, commentId = null) => {
  await updateOneUser(userId, 'commentCount', 'add', {count: 1})
  await updateOneArticle(articleId, 'commentCount', 'add', {count: 1})
  return await addOneComment(userId, articleId, content, commentId)
}

// const upVoteOneComment = async (userId, articleId, commentId) => {
//   await ontimeupdate
// }

const getComments = async ({userId, articleId}) => {
  return await getCommentsByFilter({articleId, userId})
}

module.exports = {
  putOneComment,
  getComments,
}


