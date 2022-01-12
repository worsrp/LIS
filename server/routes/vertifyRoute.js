import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
});

router.post('/', (req,res) => {
    
    const email = 'sarinyapamontree@gmail.com';
    const otp = req.body.code
    const temp = new Date();
    const date = temp.getFullYear() + "-" + temp.getMonth() + "-" + temp.getDay();
    const time = temp.getHours() + ":" + temp.getMinutes() + ":" + temp.getSeconds();
    const sqlSelect = "SELECT * FROM otp WHERE email = ? ORDER BY expireIn DESC LIMIT 1"
    var expireIn,timeExpire,code;

    db.query(sqlSelect,[email,otp],(err, result) =>{
        console.log(email);
        if(result.length > 0){
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                expireIn=row.expireIn;
                timeExpire=row.timeExpire;
                code=row.code;
            })
            console.log(otp);
            console.log(code);        
            console.log(date);
            console.log(expireIn);
            // if(compare_dates(date,expireIn)){
            //     
            // //     if(time-timeExpire<3){
                    
                    if(otp==code){
                        console
                        res.send({message: "Reset Password"})
                    }else{
                        res.send({err: err})
                    }
            //     }else{
            //         res.send({err: err})
            //     }
            // }else{
            //     res.send({err: err})
            // }
        }else{
            res.send({err: err})
        }
    });
})

export default router;