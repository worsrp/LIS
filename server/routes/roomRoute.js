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
    const userid = req.params.uid;
    const sqlSelect = "SELECT * FROM GOCHAT WHERE  uidowner = ? OR uidcustomer = ?";
    db.query(sqlSelect, [userid,userid],  (err, result) => {
        console.log(result);
        res.send(result);
    })
});

router.post('/', (req, res)=> {
    const post_id = req.body.post_id;
    const uidcustomer = req.body.uid;
    let uidowner;
    const sqlSelect = "SELECT user_id FROM POST WHERE  post_id =?";
    db.query(sqlSelect, [post_id],  (err, result) => {
        uidowner=result[0].user_id;
        const sqlSelect = "SELECT * FROM GOCHAT WHERE uidowner LIKE ? AND uidcustomer LIKE ? AND post_id =?";
        db.query(sqlSelect, [uidowner,uidcustomer,post_id],  (err, result) => {
            let uidsend
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            uidsend=row.uidowner
        });
        if(uidsend!=null){

        }else{
            const sqlInsert = "INSERT INTO GOCHAT  (uidowner,uidcustomer,post_id) VALUE (?,?,?);"
        db.query(sqlInsert, [uidowner,uidcustomer,post_id], (err, result) => {     
            console.log(err);   
        })  
        }
        })
        
    })
});

export default router;