const mongo = require('../mongo')
const {collections, projection} = require('../config')

const getOneArticle = async id => {
  return await mongo.db.collection(collections.ARTICLE).findOne({id}, projection)
}

const getAllArticle = async () => {
  return await mongo.db.collection(collections.ARTICLE).find({}, projection).toArray()
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
  const _projection = {...projection, returnOriginal: false}
  document.count = type === 'add' ? document.count : -document.count
  switch (field) {
    case 'upVoteCount':
    case 'downVoteCount':
    case 'commentCount':
      return (await mongo.db.collection(collections.ARTICLE).findOneAndUpdate({id}, {$inc: {[ field ]: document.count}}, _projection)).value
    default:
      throw new TypeError('Illegal field: ' + field)
  }
}

module.exports = {
  getOneArticle,
  getAllArticle,
  updateOneArticle,
}