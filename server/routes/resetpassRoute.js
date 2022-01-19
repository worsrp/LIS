import express from 'express';
import mysql from 'mysql';

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
    db.query(sqlUpdate, [password,email], (err,result)=>{
        res.send({err: err})
    })
})

export default router;