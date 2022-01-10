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
    const user_id = 1234;
    const sqlSelect = "SELECT * FROM USER WHERE id=?"
    db.query(sqlSelect, [user_id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);  
        }
    })
});


export default router;