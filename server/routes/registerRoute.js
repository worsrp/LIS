import express from 'express';
import mysql from 'mysql';

import bcrypt from "bcrypt";

const saltRounds = 10;

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

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
    db.query(
        "INSERT INTO USER(email, firstname, lastname, password, moblie, address) VALUES (?,?,?,?,?,?)"
        ,[email, firstname, lastname, hash, moblie, address],
    (err, result) =>{
        console.log(err);
        console.log(result);
    });
    });
});

export default router;


