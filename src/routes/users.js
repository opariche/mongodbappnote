const express = require('express');
const router = express.Router();

const User = require('../models/Users');

const passport = require('passport');

router.get('/users/singin', (req, res) => {
    res.render('users/singin');
});

router.post('/users/singin', passport.authenticate('local', {
    successRedirect: '/notas',
    failureRedirect: '/users/singin',
    failureFlash: true
}));

router.get('/users/singup', (req, res) => {
    res.render('users/singup');
});

router.post('/users/singup', async (req, res) => {
const { name, email, password, confirm_password} = req.body;
const errors = [];
if(name.length <= 0) {
errors.push({text: 'Please insert your name'});
}
if(password != confirm_password) {
errors.push({text: 'Password do not match'});
}
if(password.length < 4) {
    errors.push({text: 'Password must be at least 4 characters'});
}
if(errors.length > 0) {
    return res.render('users/singup', {errors, name, email, password, confirm_password});
} else {
    const emailUser = await User.findOne({email: email});
    if(emailUser){
        req.flash('error', 'The email is already in use');
        return res.redirect('/users/singup');
    }
  const newUser = new User({name, email, password});
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash('success_msg', 'You are registered');
  return res.redirect('/users/singin');
}
});

router.get('/users/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
    

module.exports = router;