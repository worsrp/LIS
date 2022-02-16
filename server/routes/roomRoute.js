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
    // const sqlSelect = "SELECT DISTINCT firstname,lastname,uid,image FROM USER JOIN GOCHAT ON (uid=GOCHAT.uidowner OR uid=GOCHAT.uidcustomer) WHERE GOCHAT.uidowner = ? OR GOCHAT.uidcustomer = ?"
    // db.query(sqlSelect, [userid,userid], (err,result) => {
    //     console.log(result)
    //     res.send(result)
    // })
    const sqlSearch = "SELECT * FROM GOCHAT JOIN USER ON (uid=GOCHAT.uidcustomer) JOIN POST ON POST.post_id=GOCHAT.post_id WHERE GOCHAT.uidowner = ? OR GOCHAT.uidcustomer = ? "
    db.query(sqlSearch, [userid,userid], (err,result) => {
        //console.log(result)
        res.send(result)
    })
});

router.post('/', (req, res)=> {
    const post_id = req.body.post_id;
    const uidcustomer = req.body.uid;
    let uidowner;
    const sqlSelect = "SELECT user_id FROM POST WHERE post_id =?";
    db.query(sqlSelect, [post_id],  (err, result) => {
        uidowner=result[0].user_id;
        const sqlSearch = "SELECT * FROM GOCHAT WHERE uidowner=? AND uidcustomer=? AND post_id=?"
        db.query(sqlSearch, [uidowner,uidcustomer,post_id],(err,result) => {
            let uidcus,room
            Object.keys(result).forEach(function(key) {
            var row = result[key];
            uidcus=row.uidcustomer
            room=row.roomid
            });
            if(uidcus==null){
                const sqlInsert = "INSERT INTO GOCHAT  (uidowner,uidcustomer,post_id) VALUE (?,?,?);"
                db.query(sqlInsert, [uidowner,uidcustomer,post_id], (err, result) => {     
                    console.log(err);   
                })  
            }else{
                //console.log(result);
            }
        })
        
    })
});

export default router;