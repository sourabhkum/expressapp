const express = require('express');
const router=express.Router();

router.get('/', (req, res) => {
    const title = 'Welcome Home'
    res.render('index', {
        title: title
    });
});

router.get('/about', (req, res) => {
    const title = "Welcome About"
    res.render('about', {
        title: title
    });
});

module.exports=router;