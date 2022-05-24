const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Team Model
const  Team = require('../models/Team');

router.post('/', (req,res)=>{
    const {username, email, password} = req.body;
    // check for existing team
    Team.findOne({email})
    .then(team => {
        if(team) return res.status(400).json({msg: 'Team already exist!!'})
        const newUser = new Team({
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
                .then(team => {
                    jwt.sign(
                        { id: team.id},
                        process.env.jwt_secret,
                        {expiresIn: '7d'},
                        (err, token)=> {
                            if(err) throw err;
                            res.json({
                                token,
                                team
                            });
                        }
                    )
                })
            })
        })
    });
})

module.exports = router;