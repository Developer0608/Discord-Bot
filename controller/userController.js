require('dotenv').config();

const user = require('../model/users');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isUserALreadyExists = await user.findOne({ email });

        if (isUserALreadyExists)
            return res.status(400).json({ error: 'User already exists' });

        const userID = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            userID: userID,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();


        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetails = await user.findOne({ email });

        if (!userDetails) 
            return res.status(404).json({ error: 'User not found' });

        const passwordMatch = await bcrypt.compare(password, userDetails.password);
        if (!passwordMatch) 
            return res.status(401).json({ error: 'Invalid password' });
        
        const token = jwt.sign({ email: userDetails.email }, process.env.KEY, {
            expiresIn: '24h',  
        });
        res.status(200).json({ token });
    } catch (err) {
        console.log('ERROR ::: ', err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const userDetails = async(req, res) => {
    try{
        const email = req.user.email;

        const userDetails = await user.findOne({email});

        return res.status(200).json({
            username : userDetails.username,
            email,
            userID : userDetails.userID
        })
    }catch(err){
        console.log('ERROR ::: ', err);
        return res.status(500).json({error : 'Something went wrong'});
    }
}

const updateUser = async(req, res) => {
    try{
        const {username, password} = req.body;
        const email = req.user.email;

        const userObject = {};

        if(username)
            userObject.username = username;
        
        if(password){
            const encryptedPassword = await bcrypt.hash(password, 10);
            userObject.password = encryptedPassword
        }

        await user.updateOne({email}, {$set : userObject})
        return res.status(200).json({success : 'User Updated'})
            
    }catch(err){

    }
}
  

module.exports = {
    registration,
    login,
    userDetails,
    updateUser
}