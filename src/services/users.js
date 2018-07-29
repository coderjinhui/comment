const mongo = require('../mongo')
const {collections, projection} = require('../config')

const getAllUsers = async () => await mongo.db.collection(collections.USER).find({}, projection).toArray()

const getOneUser = async id => (await mongo.db.collection(collections.USER).find({id}, projection).toArray())[0]

const updateOneUserWithSet = async (id, fields) => await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$set: {...fields}}, {...projection, returnOriginal: false})

const updateOneUserWithPush = async (id, fields) => await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$push: {upVoteArticles: fields}}, {...projection, returnOriginal: false})

const updateOneUserWithPop = async (id, fields) => await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$pop: {upVoteArticles: fields}}, {...projection, returnOriginal: false})
module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUserWithSet,
  updateOneUserWithPush,
  updateOneUserWithPop,
}