const express = require('express');
const app = express();
require("./database/mongoConfig");
require('dotenv').config();
const PORT = process.env.PORT

const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');

const userRoute = require("./router/userRoute");
const subscriptionRoute = require("./router/subscriptionRoute");
app.use(express.json());

const {client, channel} = require("./lib/discord");
const CommandHandler = require("./lib/discord/commandHandler");

const handler = new CommandHandler(client);
handler.init();

const token = process.env.CLIENT_TOKEN;

client.login(token);

app.use(session({
    secret: 'Test@#123', 
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/discord/callback', 
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/success');
    }
);

app.use(userRoute);
app.use(subscriptionRoute)
app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`)
})