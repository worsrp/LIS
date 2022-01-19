import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});

router.get('/:uid', (req, res)=> {
    const uid = req.params.uid;
    const sqlSelect = "SELECT * FROM USER WHERE uid=?"
    db.query(sqlSelect, [uid], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);  
            console.log(result);
        }
    })
});


export default router; 