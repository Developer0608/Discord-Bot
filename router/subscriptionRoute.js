const express = require('express');
const route = express.Router();
const {
    createSubscription,
    getSubscriptionDetails,
    deleteSubscription,
    updateSubscription,
    getAllSubscription
} = require("../controller/subscriptionController");
const userValidation = require('../middleware/userValidation');

route.post('/subscribe', userValidation, createSubscription);
route.get('/subscribe/:id', userValidation, getSubscriptionDetails);
route.get('/subscribe', userValidation, getAllSubscription);
route.patch('/subscribe', userValidation, updateSubscription);
route.delete('/subscribe/:id', userValidation, deleteSubscription);

module.exports = route;