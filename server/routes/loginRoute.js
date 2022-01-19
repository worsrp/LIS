import express from 'express';
import mysql from 'mysql';
import bcrypt from "bcrypt";
const { sign } = require("jsonwebtoken");

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
});


    router.get("/", (req, res) => {
        if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
        } else {
        res.send({ loggedIn: false });
        }
    });
    

router.post('/',async (req,res) => {
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
                        req.session.user = id;
                        console.log(req.session.user);
                        res.send(result);
                    }else{
                        res.send({message: "invalid email/password!!!"});
                        res.json({ error:"invalid email/password!!!"});
                    }
                });
            } else {
                res.send({ message: "User doesn't exits"});
                res.json({error: "User doesn't exits"})
            }
            const accessToken = sign(
                { username: user.username, id: user.id },
                "importantsecret"
              );
              res.json({ token: accessToken, username: username, id: user.id });
        });    
});

export default router;