const express = require('express');
const router = express.Router();
const {ensureAuthenticated}=require('../helper/auth')


//import database connection
const { mongoose } = require('../db/connection');
//import databse models
const { Idea } = require('../models/idea');

router.use(function (req, res, next) {
    var log = req.originalUrl;
    console.log(log, Date.now());
    next();
});
//get idea list
router.get('/ideas',ensureAuthenticated,(req,res)=>{
    Idea.find({creator:req.user.id}).then((ideas)=>{
        res.render('ideas/index',{
            ideas:ideas
        });
    }).catch((err)=>{
        res.send(err)
    });
});

router.get('/add/idea',ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

router.post('/ideas',ensureAuthenticated, (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add a Title' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add some Details' });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const idea = new Idea({
            title: req.body.title,
            details: req.body.details,
            creator:req.user.id,
        });
        idea.save().then((result) => {
            req.flash('sucess_msg','Idea Add Sucessfully');
            res.redirect('/ideas');
        }).catch((err) => {
            res.send(err);
        });
    }
});

router.get('/edit/idea/:id',ensureAuthenticated, (req, res) => {

    Idea.findOne({_id:req.params.id}).then((idea)=>{
        if(idea.creator!=req.user.id){
            req.flash('error_msg','Not Authorised');
            res.redirect('/ideas');
        }else{
            res.render('ideas/edit',{
                idea:idea
            });
        }
    });
});
router.put('/ideas/:id',ensureAuthenticated,(req,res)=>{
    const id=req.params.id;
    Idea.findOne({_id:id}).then((idea)=>{
        idea.title=req.body.title;
        idea.details=req.body.details;
        idea.save().then((ides)=>{
            req.flash('sucess_msg','Idea Update Sucessfully')
            res.redirect('/ideas')
        }).catch((err)=>{
            req.send(err);
        });
    });
});
router.delete('/ideas/:id',ensureAuthenticated,(req,res)=>{
    const id=req.params.id;
    Idea.findOneAndRemove({_id:id}).then((idea)=>{
        if(!idea){
            res.send('Not found')
        }else{
            req.flash('error_msg','Idea Delete Sucessfully');
            res.redirect('/ideas');
        }
    });
});

module.exports=router;