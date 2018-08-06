const {projection, mongoModel} = require('../config')

const getOneArticle = async id => {
  return await mongoModel.articleModel.findOne({id}, projection)
}

const getAllArticles = async () => {
  return await mongoModel.articleModel.find({}, projection)
}

/**
 * @typedef {('add' | 'remove')} actionType
 * */

/**
 * modifiable field of user info
 * @typedef {('upVoteCount' | 'downVoteCount' | 'commentCount')} fieldType
 * */

/**
 * update user info
 * @method
 * @async
 * @param id {string} user id
 * @param field {fieldType} can modified field in user info
 * @param type {actionType} action type
 * @param document {object} data apply on user info
 * @param document.count {number}
 * @return {Promise}
 * */
const updateOneArticle = async (id, field, type, document) => {
  const _projection = {...projection, new: true, runValidators: true}
  document.count = type === 'add' ? document.count : -document.count
  switch (field) {
    case 'upVoteCount':
    case 'downVoteCount':
    case 'commentCount':
      const doc = await mongoModel.articleModel.findOneAndUpdate({id})
      doc[field] += document.count
      return await doc.save()
    default:
      throw new TypeError('Illegal field: ' + field)
  }
}

module.exports = {
  getOneArticle,
  getAllArticles,
  updateOneArticle,
}