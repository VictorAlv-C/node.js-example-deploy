const express = require('express');
const router = express.Router();

//Controllers
const {getAllUsers, getUserByID, saveUser, updateUserPut, updateUserPatch} = require('../controllers/users.controller');

router.get('/', getAllUsers);

router.get('/:id', getUserByID);

router.post('/', saveUser);

router.put('/:id', updateUserPut);

router.patch('/:id', updateUserPatch);



module.exports = {usersRouter: router}