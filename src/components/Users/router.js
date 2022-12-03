const logger = require('intel').getLogger('Users|Router');
const validation = require('./validation');
const { Router } = require('express');
const UsersComponent = require('./index');
const path = '/users';
const router = Router();

router.use((req, res, next) => {
    logger.debug(req.method, `${path}${req.path}`, 'HEADERS:', req.headers, 'BODY:', req.body, 'PARAMS:', req.params);
    next();
});

router.get('/:id', UsersComponent.findUser); 
router.post('/', UsersComponent.createUser); 
router.delete('/:id', UsersComponent.deleteUser); 
router.put('/:id', UsersComponent.updateUser); 

module.exports = router;