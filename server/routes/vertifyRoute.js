import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
});

router.post('/:email', (req,res) => {

    const email = req.params.email;
    const otp = req.body.code
    const temp = new Date();
    const sqlSelect = "SELECT * FROM otp WHERE email = ? AND code = ? ORDER BY expireIn DESC LIMIT 1"
    var expireIn,timeExpire,code;
    if(temp.getMonth()+1<10){
        var date = (temp.getFullYear()) + "-0" + ((temp.getMonth()+1)) + "-" + temp.getDate();
    }else{
        var date = (temp.getFullYear()) + "-" + ((temp.getMonth()+1)) + "-" + temp.getDate();
    }
    db.query(sqlSelect,[email,otp],(err, result) =>{
        console.log(email);
        if(result.length > 0){
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                expireIn=row.expireIn;
                timeExpire=row.timeExpire;
                code=row.code;
            })
            console.log(email);
                if(String(date)==expireIn){
                    if(temp.getHours()==((timeExpire)-(timeExpire%100))/100 && temp.getMinutes()>=(timeExpire%100) && 
                    temp.getMinutes()-(timeExpire%100)<=2){
                        res.send({message: "Reset Password"})
                    }else{
                        if(temp.getHours()==((((timeExpire)-(timeExpire%100))/100)+1) && temp.getMinutes()<(timeExpire%100) && 
                        (timeExpire%100)-temp.getMinutes()>=58){
                            res.send({message: "Reset Password"})
                        }
                        else{
                            res.send({message: "OTP is already expired"})
                        }
                    }
                }else{
                res.send({message: "OTP is already expired"})
                }
        }else{
            res.send({message: "Invalid OTP"})
        }
    });
})

export default router;