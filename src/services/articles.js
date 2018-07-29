const mongo = require('../mongo')
const {collections} = require('../config')


const getArticle = async id => {
  return await mongo.db.collection(collections.ARTICLE).find({id: '0001'})
}


const upVoteArticle = async ({user, article, timestamp}) => {
  await mongo.db.collection(collections.ARTICLE).findOneAndUpdate({id: article}, {$inc: {upVote: 1}})
  await mongo.db.collection(collections.USER).findOneAndUpdate({id: user}, {$push: {"upVoteArticles": {article, timestamp}}})
  return 'success'
}