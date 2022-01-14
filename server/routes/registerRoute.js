import express from 'express';
import mysql from 'mysql';

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
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
    
    const sqlInsert = "INSERT INTO USER(email, firstname, lastname, password, moblie, address) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsert,[email, firstname, lastname, hash, moblie, address],
    (err, result) =>{
        console.log(err);
    });
});
});

export default router;


