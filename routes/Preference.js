const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer')

// Preference Model
const  Preference = require('../models/Preference');
const  User = require('../models/User');

router.post('/', (req,res)=>{
    const {username, email, colors, songs, birthdate, foods, hobbies, wordstosay, gender}= req.body
    const transporter= nodemailer.createTransport ({
        service:"gmail",
        auth: {
        user: process.env.USER,
        pass: process.env.PASS
        },
        tls:{rejectUnauthorized:false}
    })
    let mailOptions = {
        from: process.env.USER,
        to: 'arrafniagil@gmail.com',
        subject: 'Hello from 3arrafni',
        html: `<body><h1>Hello! This is a contact message from ${username}</hl>
        <h2>Username : ${username}</h2>
        <h2>Email : ${email}</h2>
        <h2>Best Colors : ${colors}</h2>
        <h2>Best Songs : ${songs}</h2>
        <h2>Birth Date : ${birthdate}</h2>
        <h2>Best Foods : ${foods}</h2>
        <h2>Hobbies : ${hobbies}</h2>
        <h2>Words That He/She like to say it : ${wordstosay}</h2>
        <h2>Gender : ${gender}</h2>
        </body>`
    }
    User.findOne({email})
    .then(user => {
        const newPreference = new Preference({
            client_id: user._id, client_username: username, email, colors, songs, birthdate, foods, hobbies, wordstosay, gender
        });
        Preference.findOne({client_id:user._id})
        .then(e=>{
            if(e){res.json({msg:"Oops You Already Sent Your Preference!"})}
            else{
                try {
                    newPreference.save()
                    .then(
                        transporter.sendMail(mailOptions, function(){
                            res.json({msg:"Mail Send Successfuly!"})
                        })
                    )
                } catch (error) {
                    res.json({msg:"Oops Something Wrong!"})
                }
            }
        })
    })        
})
module.exports = router;
