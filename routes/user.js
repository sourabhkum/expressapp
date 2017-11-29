const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const passport=require('passport');

router.get('/users/register', (req, res) => {
    res.render('users/register')
});

router.post('/users/register', (req, res) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Please Enter Name' });
    }
    if (!req.body.email) {
        errors.push({ text: 'Please Enter Email' });
    }
    if (req.body.password != req.body.cpassword) {
        errors.push({ text: 'Password Does Not Match' });
    }
    if (req.body.password < 4) {
        errors.push({ text: 'Password Must Be At Least 4 Characters' });
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    } else {
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
               req.flash('error_msg','Enail Already Exists');
               res.redirect('/users/login');
            } else {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                user.save().then((result) => {
                    req.flash('sucess_msg', 'Registration Sucessfully');
                    res.redirect('/users/login');
                }).catch((err) => {
                    res.send(err);
                });
            }
        });

    }
});

router.get('/users/login', (req, res) => {
    res.render('users/login');
});
router.post('/users/login', (req, res,next) => {
    passport.authenticate('local',{
        successRedirect:'/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })
    (req,res,next);
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('sucess_msg','Logout Successfully');
    res.redirect('/users/login')
});
module.exports = router;