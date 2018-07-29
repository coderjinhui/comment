const mongo = require('../mongo')
const {collections, projection} = require('../config')

const getAllUsers = async () => await mongo.db.collection(collections.USER).find({}, projection).toArray()

const getOneUser = async id => (await mongo.db.collection(collections.USER).find({id}, projection).toArray())[0]

const updateOneUserWithSet = async (id, fields) => await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$set: {...fields}}, {...projection, returnOriginal: false})

// todo 更新用户信息分为： 1，直接设置一个值；2，递增一个值；3，递减一个值；4，子域为数组，push一个值

const updateOneUserWithPush = async (id, fields) => await mongo.db.collection(collections.USER).findOneAndUpdate({id}, {$push: {fields}}, {...projection, returnOriginal: false})

module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUserWithSet,
}