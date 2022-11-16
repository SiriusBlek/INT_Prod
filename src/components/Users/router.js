const { Router } = require('express');
const UsersComponent = require('./index');

const router = Router();

router.get('/:id', UsersComponent.findUser); 
router.post('/', UsersComponent.createUser); 
router.delete('/:id', UsersComponent.deleteUser); 
router.put('/:id', UsersComponent.updateUser); 

module.exports = router;