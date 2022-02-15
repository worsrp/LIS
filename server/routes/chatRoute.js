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
    const roomid = req.params.id;
    // const sqlSelect = "SELECT msg FROM CHAT WHERE roomid =? order by time ";
    // db.query(sqlSelect, [roomid],  (err, result) => {
    //     let room
    //     Object.keys(result).forEach(function(key) {
    //     var row = result[key];
    //         room=row.roomid
    //     });
        const sqlSelect = "SELECT * FROM GOCHAT WHERE GOCHAT.roomid = ?"
        db.query(sqlSelect, [roomid],  (err, result) => {
            let uidown
            Object.keys(result).forEach(function(key) {
            var row = result[key];
                uidown=row.uidowner
            });
            console.log(uidown)
            const sqlSearch = "SELECT DISTINCT * FROM POST  JOIN USER NATURAL JOIN CHAT WHERE POST.user_id=? AND CHAT.roomid=? AND USER.uid=?"
            db.query(sqlSearch, [uidown,roomid,uidown],  (err, result) => {
                console.log(result)
                res.send(result)
    })
});
})

router.get('/:uid/:id', (req, res)=> {
    const uidsender = req.params.uid;
    const roomid = req.params.id;
    console.log('kkkk')
    const sqlSelect = "SELECT * FROM CHAT WHERE uidsender= ? AND roomid =?";
    db.query(sqlSelect, [uidsender,roomid],  (err, result) => {
        let uidsend
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            uidsend=row.uidsender
        });
        if(uidsend==null){
            const sqlSelect = "SELECT * FROM GOCHAT WHERE uidcustomer=? OR uidowner= ? AND roomid =?";
            db.query(sqlSelect, [uidsender,uidsender,roomid],  (err, result) => {
                res.send(result);
            })
        }else{
            res.send(result);
        }
        
    })
});

router.post('/:uid/:id', (req, res)=> {
    const uid = req.params.uid;
    const post_id = req.params.id;

    const sqlSelect = "SELECT * FROM CHAT WHERE uidreceiver = ? OR uidsender = ? AND post_id =? ORDER BY post_id DESC";
    db.query(sqlSelect, [uid, uid ,post_id],  (err, result) => {
        res.send(result);
        console.log(result)
    })
    console.log(post_id);
});



export default router;