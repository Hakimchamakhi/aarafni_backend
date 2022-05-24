const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// User Model
const  User = require('../models/User');

router.post('/', (req,res)=>{
    const {username, email, password} = req.body;
    // check for existing user
    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'User already exist!!'})
        const newUser = new User({
            username,
            email,
            password
        });
        //create salt & hash
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) res.json(err) ;
                newUser.password = hash;
                newUser.save()
                .then(user => {
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
            })
        })
    });
})

module.exports = router;