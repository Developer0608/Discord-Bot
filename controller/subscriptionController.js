const subscription = require("../model/subscriptions");
const uuid = require('uuid');

const createSubscription = async(req, res) => {
    try{
        const {serviceName , serviceLink, monthlyFee, startDate } = req.body;
        const subscriptionID = uuid.v4();
        const subscriptionObject = new subscription({
            serviceID : subscriptionID,
            serviceName,
            serviceLink, 
            monthlyFee, 
            startDate,
            userID : req.user.userID
        })

        await subscriptionObject.save();
        res.status(201).json({ message: 'Subscription created successfully' });
    }catch(err){
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const getSubscriptionDetails = async(req, res) => {
    try{
        const id = req.params.id

        const subscriptionDetails = await subscription.findOne({serviceID : id}).lean();
        return res.status(200).json(subscriptionDetails);
    }catch(err){
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const getAllSubscription = async(req, res) => {
    try{
        const subscriptionDetails = await subscription.find().lean();
        return res.status(200).json(subscriptionDetails);
    }catch(err){
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const deleteSubscription = async(req, res) => {
    try{
        const id = req.params.id

        await subscription.deleteOne({serviceID : id});
        return res.status(200).json({success : 'Subscription Deleted'})
    }catch(err){
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const updateSubscription = async(req, res) => {
    try{
        const {serviceName, serviceLink, monthlyFee, id} = req.body;

        const subscriptionObject = {}

        if(serviceName)
            subscriptionObject.serviceName = serviceName

        if(serviceLink)
            subscriptionObject.serviceLink = serviceLink
        
        if(monthlyFee)
            subscriptionObject.monthlyFee = monthlyFee
        
        const update = await subscription.updateOne({serviceID : id}, {$set : subscriptionObject})
        console.log('########', update)
        return res.status(200).json({success : 'Updated'})
    }catch(err){
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    createSubscription,
    getSubscriptionDetails,
    deleteSubscription,
    updateSubscription,
    getAllSubscription
}