const logger = require('intel').getLogger('Users|service');

function createUser(id) {
  return {
      message: 'User created successful',
  };
}

function findUser(id) {
  return {
      message: `Found user with id ${id}`,
  };
}

function deleteUser(id) {
  return {
      message: `Deleted user with id ${id}`,
  };
}

function updateUser(id) {
  return {
      message: `User ${id} updated successful.`,
  };
}

module.exports = {
  createUser,
  findUser,
  deleteUser,
  updateUser,
};