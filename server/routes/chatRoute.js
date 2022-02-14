import express from 'express';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import cors from 'cors'; 

const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});


router.post('/', (req, res)=> {
    const post_id = req.body.post_id;
    const uidcustomer = req.body.uid;
    let uidowner;
    const sqlSelect = "SELECT user_id FROM POST WHERE  post_id =?";
    db.query(sqlSelect, [post_id],  (err, result) => {
        uidowner=result[0].user_id;
        const sqlInsert = "INSERT INTO GOCHAT  (uidowner,uidcustomer,postid) VALUE (?,?,?);"
        db.query(sqlInsert, [uidowner,uidcustomer,post_id], (err, result) => {     
            console.log(err);   
        })  
    })
   

});

router.get('/:uid/:id', (req, res)=> {
    const uidsender = req.params.uid;
    const post_id = req.params.id;
    const sqlSelect = "SELECT * FROM GOCHAT WHERE uidsender LIKE ? AND post_id =?";
    db.query(sqlSelect, [uidsender,post_id],  (err, result) => {
        res.send(result);
    })
});





export default router;