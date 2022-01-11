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
    const password = req.body.password
    const id = 1234;
    
    const sqlUpdate = "UPDATE USER SET password = ? WHERE id = ?;"
    db.query(sqlUpdate, [password,id], (err,result)=>{
        console.log(err);
    })
})

export default router;