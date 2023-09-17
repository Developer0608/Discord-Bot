const user = require("../model/users");
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const subscription = require("../model/subscriptions");

const createUser = async(username, email, password) => {
    try{
        console.log('I am inside createUser')
        const isUserALreadyExists = await user.findOne({ email });
        if (isUserALreadyExists)
            throw('User already exists');

        const userID = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            userID: userID,
            username,
            email,
            password: hashedPassword,
        });

        const update = await newUser.save();
        console.log('UPDATE ::: ', update);
        
    }catch(err){
        console.log('ERROR :::: ', err);
        return err
    }
}

const getUser = async(username) => {
    try{
        const userData = await user.findOne({ username }).lean();
        if(!userData)
            return `User Not Found`
        
        const subscriptionDetails = await subscription.find({"userID" : userData.userID});
        return `username : ${userData.username}, email : ${userData.email}, userID : ${userData.userID}, services : ${subscriptionDetails}`;
    }catch(err){
        return err;
    }
}

const createService = async(serviceName, serviceLink, monthlyFee, username) => {
    try{
        const subscriptionID = uuid.v4();

        const userDetails = await user.findOne({ username });

        if(!userDetails)
            return 'No user exists with this name'
        const subscriptionObject = new subscription({
            serviceID : subscriptionID,
            serviceName,
            serviceLink, 
            monthlyFee,
            userID : userDetails.userID
        })

        await subscriptionObject.save();
        return `${serviceName} created`;
    }catch(err){
        console.log("ERROR ::: ", err);
        return 'Service cannot be created';
    }
}
module.exports = {
    createUser,
    getUser,
    createService
}