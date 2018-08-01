const services = require('../services')

const {getAllUsers, getOneUser, updateOneUser} = services.comment


/**
 * 用户点反对的时候，首先要去已点赞的里面看看，是不是已经点过赞了，这次是取消的动作。反之亦然。
 * */




module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
}


