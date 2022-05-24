const express = require('express');
const router = express.Router();

// User Model
const  User = require('../models/User');

router.get('/all', (req,res)=>{
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(err =>{
        res.json(err)
    })
})

module.exports = router;