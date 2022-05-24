const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer')

router.post('/', (req,res)=>{
    const {fname, lname, email, message, tel}= req.body
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
        html: `<body><h1>Hello! This is a contact message from ${fname}</hl>
        <h2>Full Name : ${fname} ${lname}</h2>
        <h2>Email : ${email}</h2>
        <h2>Telephone Number : ${tel}</h2>
        <h3>Message : </h3>
        <h4>${message}</h4>
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
