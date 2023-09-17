const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    serviceID : String,
    serviceName : String,
    serviceLink : String,
    monthlyFee : Number,
    startDate : String,
    userID : String
})

const subscription = mongoose.model('subscription', subscriptionSchema);
module.exports = subscription;