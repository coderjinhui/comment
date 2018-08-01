const services = require('../services')

const {getAllUsers, getOneUser, updateOneUser} = services.users
module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
}

