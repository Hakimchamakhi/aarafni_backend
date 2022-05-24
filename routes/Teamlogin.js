const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Team Model
const  Team = require('../models/Team');

router.post('/', (req,res)=>{
    const {email, password} = req.body;
    // check for existing team
    Team.findOne({email})
    .then(team => {
        if(!team) return res.status(400).json({msg: 'Team does not exist!!'})
        // validate password
        bcrypt.compare(password, team.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: 'Invalide Password'});
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
    });
})

module.exports = router;