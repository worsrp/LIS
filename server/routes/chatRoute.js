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

router.get('/:uid/:id', (req, res)=> {
    const uidsender = req.params.uid;
    const roomid = req.params.id;
    const sqlSelect = "SELECT * FROM CHAT WHERE uidsender LIKE ? AND roomid =?";
    db.query(sqlSelect, [uidsender,roomid],  (err, result) => {
        if(result==='undefined'){
            const sqlSelect = "SELECT * FROM GOCHAT WHERE uidcustomer LIKE ? OR uidowner LIKE ? AND roomid =?";
            db.query(sqlSelect, [uidsender,uidsender,roomid],  (err, result) => {
                console.log('derger',result)
                res.send(result);
            })
        }else{
            console.log('vdfbsbsr',result)
            res.send(result);
        }
        
    })
});





export default router;