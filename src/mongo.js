const mongoose = require('mongoose')

const {mongoUrl, mongoModel, users, articles} = require('./config')

module.exports.init = async () => {
  await mongoose.connect(mongoUrl, {useNewUrlParser: true})
  const userCount = await mongoModel.userModel.countDocuments()
  const articleCount = await mongoModel.articleModel.countDocuments()
  if (!userCount) {
    await mongoModel.userModel.insertMany(users)
  }
  if (!articleCount) {
    await mongoModel.articleModel.insertMany(articles)
  }
  return 1
}
