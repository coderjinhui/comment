const {projection, mongoModel} = require('../config')

const getAllUsers = async () => await mongoModel.userModel.find({}, projection)

const getOneUser = async id => await mongoModel.userModel.findOne({id}, projection)

/**
 * @typedef {('add' | 'remove')} actionType
 * */

/**
 * modifiable field of user info
 * @enum {string}
 * @readonly
 * */
const fieldType = {
  upVoteArticles: 'upVoteArticles',
  downVoteArticles: 'downVoteArticles',
  upVoteComments: 'upVoteComments',
  commentCount: 'commentCount',
}

/**
 * update user info
 * @method
 * @async
 * @param id {string} user id
 * @param field {fieldType} can modified field in user info
 * @param type {actionType} action type
 * @param document {object} data apply on user info
 * @param [document.article] {string} data apply on user info
 * @param [document.comment] {string} data apply on user info
 * @param {number} [document.count = 1] data apply on user info
 * @return {Promise}
 * */
const updateOneUser = async (id, field, type, document) => {
  const _projection = {...projection, new: true}
  switch (field) {
    case 'upVoteArticles':
    case 'downVoteArticles':
    case 'upVoteComments':
    case 'downVoteComments':
      /*
      * document: {article: '0001', timestamp: xxx}
      * or
      * document: {comment: '0001', timestamp: xxx}
      * */
      if (type === 'add') {
        return await mongoModel.userModel.findOneAndUpdate({id}, {$push: {[field]: document}}, _projection)
      } else if (type === 'remove') {
        const user = await mongoModel.userModel.findOne({id})
        const index = user[field].findIndex(record => (record.article || record.comment) === (document.article || document.comment))
        if (index > -1) {
          const newField = [...user[field].slice(0, index), ...user[field].slice(index + 1)]
          return await mongoModel.userModel.findOneAndUpdate({id}, {$set: {[field]: newField}}, _projection)
        } else {
          throw new RangeError('Cannot find record: ' + (document.article || document.comment))
        }
      }
      break
    case 'commentCount':
      document.count = document.count || 1
      /*
      * document: {article: '0001'}
      * or
      * document: {comment: '0001'}
      * */
      const doc = await mongoModel.userModel.findOneAndUpdate({id}, {$inc: {[field]: (type === 'add' ? 1 : -1) * document.count}}, _projection)
      doc.commentCount += (type === 'add' ? 1 : -1) * document.count
      return await doc.save()
    default:
      throw new TypeError('Illegal field: ' + field)
  }
}
module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
}
