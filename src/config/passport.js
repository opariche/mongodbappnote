const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const util = require('util');

const User = require('../models/Users');

passport.use(new localStrategy({
   usernameField: 'email'
}, async (email, password, done) => {
   const user = await User.findOne({email: email});
   if(!user) {
      return done(null, false, { message: 'Not User found'});
   } else {
    const match = await user.matchPassword(password);
    if(match) {
        return done(null, user);
    } else {
       return done(null, false, {message: 'Incerrect Password'}); 
    }
    
   }
   
}));
passport.serializeUser(async (user, done) => {
    try {
        done(null, user.email);
    } catch (error) {
        done(error);
    }
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email: email });
        done(null, user);
    } catch (error) {
        done(error);
    }
});




