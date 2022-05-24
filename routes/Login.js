const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// User Model
const  User = require('../models/User');

router.post('/', (req,res)=>{
    const {email, password} = req.body;
    // check for existing user
    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exist!!'})
        // validate password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: 'Invalide Password'});
            jwt.sign(
                { id: user.id},
                process.env.jwt_secret,
                {expiresIn: '7d'},
                (err, token)=> {
                    if(err) throw err;
                    res.json({
                        token,
                        user
                    });
                }
            )
        })
    });
})

module.exports = router;