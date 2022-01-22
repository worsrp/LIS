import express from 'express';
import mysql from 'mysql';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
});

router.post('/', (req,res) => {

    var code = Math.floor((Math.random()*1000000)+123);
    if(code<100000){
        code=code+(Math.floor((Math.random()*10)*100000));
    }
    if(code>1000000){
        code = code%1000000;
    }
    var temp = new Date();
    if(temp.getMonth()+1<10){
        var expireIn = (temp.getFullYear()) + "-0" + ((temp.getMonth()+1)) + "-" + temp.getDate();
    }else{
        var expireIn = (temp.getFullYear()) + "-" + ((temp.getMonth()+1)) + "-" + temp.getDate();
    }
    var timeExpire = (temp.getHours()*100) + temp.getMinutes() ;

    const email = req.body.email
    const sqlSelect = "SELECT * FROM user WHERE email = ?"

    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'arissarapiromwaree@gmail.com',
            pass: 'umsgvqolzoksqipe'
        }
    });
    var mailOption = {
        from: 'no-reply@example.com',
        to: req.body.email,
        subject: 'Sending Otp for vertify',
        text: 'Code for vertify : '+code+' expire in 2 minutes'
    }

    db.query(sqlSelect,[email],(err, result) =>{
        if(result.length > 0){
            if(timeExpire==2359){
                res.send({message: "Please Try again in 1 minute"});
            }else{
                const sqlInsert = "INSERT INTO OTP(email, code, expireIn, timeExpire) VALUES (?,?,?,?);"
                db.query(sqlInsert,[email, code, expireIn, timeExpire],
                (err, result) =>{
                    console.log(err);
                })
                transporter.sendMail(mailOption, function(error,info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Email sent: '+ info.response);
                    }
                })
                res.send({message: "Please Check your Email !"});
            }
        }else{
            res.send({err: err})
        }
        }
    )
})


export default router;