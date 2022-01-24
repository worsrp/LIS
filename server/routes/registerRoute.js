import express from 'express';
import mysql from 'mysql';

import bcrypt from "bcrypt";

const saltRounds = 10;

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "LISDatabase"
})


router.post('/', (req,res) => {
    const email     = req.body.email
    const firstname = req.body.firstname
    const lastname  = req.body.lastname
    const mobile    = req.body.mobile
    const address   = req.body.address
    const password  = req.body.password
    const uid = req.body.uid
    const IMAGE = ''

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
    db.query(
        "INSERT INTO USER(email, firstname, lastname, password, mobile, address, image, uid) VALUES (?,?,?,?,?,?,?,?)"
        ,[email, firstname, lastname, hash, mobile, address, IMAGE ,uid],
    (err, result) =>{
        console.log(err);
        console.log(result);
    });
    });
});

export default router;


