const mongo = require('../mongo')
const {collections} = require('../config')

const getOneArticle = async id => {
  return await mongo.db.collection(collections.ARTICLE).findOne({id: '0001'})
}

const getAllArticle = async () => {
  return await mongo.db.collection(collections.ARTICLE).find().toArray()
}


const upVoteArticle = async ({user, article, timestamp}) => {
  await mongo.db.collection(collections.ARTICLE).findOneAndUpdate({id: article}, {$inc: {upVote: 1}})
  await mongo.db.collection(collections.USER).findOneAndUpdate({id: user}, {$push: {"upVoteArticles": {article, timestamp}}})
  return 'success'
}