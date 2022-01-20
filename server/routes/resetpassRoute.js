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

router.post('/', (req,res) => {
    const email = req.body.email;
    const password = req.body.password
    const sqlUpdate = "UPDATE USER SET password = ? WHERE email = ?;"

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

    db.query(sqlUpdate, [hash,email], (err,result)=>{
        res.send({err: err})
    })
    })
})

export default router;