const express = require('express');
const route = express.Router();

const {
    registration,
    login,
    userDetails,
    updateUser
} = require("../controller/userController");
const userValidation = require('../middleware/userValidation');

route.post('/register', registration);
route.post('/login', login);
route.get('/user', userValidation, userDetails);
route.patch('/user', userValidation, updateUser)
module.exports = route;