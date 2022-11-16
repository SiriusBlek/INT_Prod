const { Router } = require('express');
const DemoComponent = require('./index');

const router = Router();

router.get('/:id', UsersComponent.findUser); 
router.post('/', UsersComponent.createUser); 
router.delete('/:id', UsersComponent.deleteUser); 
router.put('/:id', UsersComponent.updateUser); 

module.exports = router;
