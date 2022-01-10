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
    const email     = req.body.email
    const firstname = req.body.firstname
    const lastname  = req.body.lastname
    const moblie    = req.body.moblie
    const address   = req.body.address
    const password  = req.body.password

    const sqlInsert = "INSERT INTO USER(email, firstname, lastname, password, moblie, address) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsert,[email, firstname, lastname, password, moblie, address],
    (err, result) =>{
        console.log(err);
    })
});

export default router;


