const GoogleStrategy = require('passport-google-oauth20').Strategy
const { response } = require('express');
const mongodb = require('../db/connect');
const createError = require('http-errors');

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try{
            let user = await mongodb
            .getMongoDb()
            .db('boardedRings')
            .collection('users')
            .findOne({ googleId: profile.id});
        
            if (user){
                done(null, user)
            } else {
                user = await mongodb
                .getMongoDb()
                .db('boardedRings')
                .collection('users')
                .insertOne(newUser);

                done(null, user);
            }

        } catch(err) {
            console.error(err)
        }
        
    }))

    passport.serializeUser(function(user, cb) {
        console.log('HELLLLOOOOOOOOOOOOO', user)
        process.nextTick(function() {
            return cb(null, {
            id: user.googleId,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
            });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });

}