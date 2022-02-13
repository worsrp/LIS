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

router.get('/:id', (req, res)=> {
    const post_id = req.params.id;
    const sqlSelect = "SELECT * FROM POST WHERE  post_id =?";
    db.query(sqlSelect, [post_id],  (err, result) => {
        res.send(result);
    })

});

router.get('/:uid/:id', (req, res)=> {
    const uidsender = req.params.uid;
    const post_id = req.params.id;
    const sqlSelect = "SELECT * FROM CHAT WHERE uidsender LIKE ? AND post_id =?";
    db.query(sqlSelect, [uidsender,post_id],  (err, result) => {
        res.send(result);
    })
});





export default router;