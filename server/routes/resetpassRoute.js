import express from 'express';
import mysql from 'mysql';
import bcrypt from "bcrypt";

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
})
const saltRounds = 10;

router.post('/', (req,res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

    db.query("UPDATE USER SET password = ? WHERE email = ?", [hash,email], (err,result)=>{
        console.log(email)
        console.log(hash);
        res.send({err: err})
    })
    })
})

export default router;