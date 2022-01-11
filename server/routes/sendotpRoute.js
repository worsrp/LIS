import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
});

const mailer = (email,otp)=>{
    var nodemailer = require('nodemailer');
    var transporter = nodemail.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'arissarapiromwaree@gmail.com',
            pass: '0962217795'
        }
    });
    var mailOption = {
        from: 'no-reply@example.com',
        to:'ram@gmail.com',
        subject: 'Sending Otp for vertify',
        text: 'Please vertify'
    }
    transporter.sendMail(mailOption, function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: '+ info.response);
        }
    })
}

// const changePassword = async (req,res)=>{
//     //console.log(req.body.email)
//     var data = await user.findOne({email:req.body.email,code:req.body.otpCode});
//     //console.log(data)
//     const response = {};
//     if(data){
//         var currentTime = new Date().getTime();
//         var diff = data.expireIn - currentTime;
//         if(diff<0){
//             response.statusText ='error'
//             response.message = 'Token already expired';
//         }else{
//             var user = await user.findOne({email:req.body.email});
//             user.password = req.body.password;
//             user.save();
//             response.statusText ='Success'
//             response.message = 'Password changed successfully';
//         }
        
//     }else{
//         response.statusText ='error'
//         response.message = 'Invalid Otp';
//     }
//     res.status(200).json(response);
// }

router.post('/', (req,res) => {
    
    const email = req.body.email
    const sqlSelect = "SELECT * FROM user WHERE email = ?"

    db.query(sqlSelect,[email],(err, result) =>{
        if(result.length > 0){
            console.log(result)
            console.log(err)
            console.log(req.body.email)
            var code = Math.floor((Math.random()*1000000)+123);
            var expireIn = new Date().getTime();
            const sqlInsert = "INSERT INTO OTP(email, code, expireIn) VALUES (?,?,?);"
            db.query(sqlInsert,[email, code, expireIn],
            (err, result) =>{
                console.log(err);
            })
            res.send({message: "Please Check your Email !"});
        }else{
            res.send({err: err})
        }
        }
    )
})


export default router;