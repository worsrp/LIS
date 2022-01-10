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
    const email = req.body.email
    const password= req.body.password

    const sqlSelect = "SELECT * FROM user WHERE email = ? AND password = ?"

    db.query(sqlSelect,[email, password],(err, result) =>{
            if (err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "invalid email/password"});
            }
        }
    )
});

export default router;