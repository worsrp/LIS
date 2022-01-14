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

router.get('/', (req, res) => {
        if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
        } else {
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