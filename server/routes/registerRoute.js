import express from 'express';
import mysql from 'mysql';
import bcrypt from "bcrypt";

const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

const saltRounds = 10;

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
})


router.post('/', async (req,res) => {
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
        "INSERT INTO user(email, firstname, lastname, password, moblie, address) VALUES (?,?,?,?,?,?)"
        ,[email, firstname, lastname, hash, moblie, address],
    (err, result) =>{
        res.json("SUCCESS");
        console.log(err);
    });
    });
});

export default router;


