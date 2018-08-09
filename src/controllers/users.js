const services = require('../services')

const {getAllUsers, getOneUser, updateOneUser} = services.users
const {updateOneArticle} = services.articles

/**
 * @param {string} userId
 * @param {string} articleId
 * @return {Promise}
 */
const upVoteArticle = async (userId, articleId) => {
  await updateOneArticle(articleId, 'upVoteCount')
  await updateOneUser(userId, 'upVoteArticles', 'add', {article: articleId})
}
module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
}

