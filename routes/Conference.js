const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer')

router.post('/', (req,res)=>{
    const {username, email, meetingdate, meetingtime}= req.body
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
        <h2>Meeting Date : ${meetingdate}</h2>
        <h2>Meeting Time : ${meetingtime}</h2>
        </body>`
    }
    transporter.sendMail(mailOptions, function(err, success){
        if(err) {
            res.json({msg:"Oops Something Wrong!"})
        } else {
            res.json({msg:"Mail Send Successfuly!"})
        }
    })
        
})


module.exports = router;
