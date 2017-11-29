const express = require('express');
const router=express.Router();
const {Idea}=require('../models/idea');
//import database connection
const { mongoose } = require('../db/connection');

router.get('/', (req, res) => {
    Idea.find().then((ideas)=>{
        res.render('index', {
            ideas: ideas
        });
    })
    
});

router.get('/about', (req, res) => {
    const title = "Welcome About"
    res.render('about', {
        title: title
    });
});

module.exports=router;