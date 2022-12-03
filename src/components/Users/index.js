const logger = require('intel').getLogger('Users|Controller');
const UserService = require('./service');

async function findUser(req, res) {
    try {
        const users = await UsersService.findUser(+req.params.id);

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function createUser(req, res) {
    try {
        const createUser = await UsersService.createUser(req.body);

        return res.status(201).json({
            data: createUser,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await UsersService.deleteUser(+req.params.id);

        return res.status(201).json({
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = await UsersService.updateUser(req.body);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    findUser,
    createUser,
    deleteUser,
    updateUser,
};
