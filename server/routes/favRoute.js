import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});

router.get('/', (req, res)=> {
    const userId = 1234;

    const sqlSelect = "SELECT DISTINCT * FROM POST JOIN FAVLIST ON POST.post_id = FAVLIST.post_id WHERE post_status Like 'Available' " 
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

router.post('/', (req,res)=> {
    const user_id = 1234;

    const post_id = req.body.post_id;

    const sqlInsert = "INSERT INTO FAVLIST (user_id,post_id) VALUE (?,?);"
    db.query(sqlInsert, [user_id,post_id], (err, result) => {
        console.log(err);
    })
});

export default router;