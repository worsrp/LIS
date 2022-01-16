import express from 'express';
import mysql from 'mysql';
import bcrypt from "bcrypt";
import {body, validationResult} from "express-validator";
import path from 'path';

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
});

// DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login-register');
    }
    next();
}
const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE



router.get('/', (req, res,) => {
    console.log("0")
            if (req.session.user) {
                console.log("1")
            res.send({ loggedIn: true, user : req.session.user});
            } else {
                console.log("2")
            res.send({ loggedIn: false });
            }
    
    });

router.post('/', (req,res) => {
    const email = req.body.email
    const password= req.body.password

    db.query(
        "SELECT * FROM user WHERE email = ?;",
        email,
        (err, result) =>{
            if (err) {
                res.send({err: err})
            }
            
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    }else{
                        res.send({message: "invalid email/password!!!"});
                    }
                });
            } else {
                res.send({ message: "User doesn't exits"});
            }
        }
    )
});

export default router;