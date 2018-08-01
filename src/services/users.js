const mongo = require('../mongo')
const {collections, projection} = require('../config')

const getAllUsers = async () => await mongo.db.collection(collections.USER).find({}, projection).toArray()

const getOneUser = async id => await mongo.db.collection(collections.USER).findOne({id}, projection)

/**
 * @typedef {('add' | 'remove')} actionType
 * */

/**
 * modifiable field of user info
 * @typedef {('upVoteArticles' | 'downVoteArticles' | 'upVoteComments' | 'downVoteComments' | 'commentCount')} fieldType
 * */

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
 * @param [document.count] {number} data apply on user info
 * @return {Promise}
 * */
const updateOneUser = async (id, field, type, document) => {
  const _projection = {...projection, returnOriginal: false}
  switch (field) {
    case 'upVoteArticles':
    case 'downVoteArticles':
    case 'upVoteComments':
    case 'downVoteComments':
      if (type === 'add') {
        /*
        * document: {article: '0001', timestamp: xxx}
        * or
        * document: {comment: '0001', timestamp: xxx}
        * */
        return (await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$push: {[ field ]: document}}, _projection)).value
      } else if (type === 'remove') {
        /*
        * document: {article: '0001}
        * or
        * document: {comment: '0001}
        * */
        const user = await mongo.db.collection(collections.USER).findOne({id})
        const index = user[ field ].findIndex(record => record.article || record.comment === (document.article || document.comment))
        if (index > -1) {
          const newField = [ ...user[ field ].slice(0, index), ...user[ field ].slice(index + 1) ]
          return (await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$set: {[ field ]: newField}}, _projection)).value
        } else {
          throw new Error('Cannot find record: ' + document.article || document.comment)
        }
      }
      break
    case 'commentCount':
      return await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$inc: {[field]: (type === 'add' ? 1 : -1) * document.count}})
    default:
      throw new TypeError('Illegal field: ' + field)
  }
}
module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
}