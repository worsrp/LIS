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
    let uidown,uidcus
    console.log("gogo")
    // const sqlSelect = "SELECT * FROM CHAT JOIN GOCHAT ON CHAT.roomid=GOCHAT.roomid JOIN POST ON GOCHAT.post_id=POST.post_id JOIN USER ON uid=uidcustomer WHERE GOCHAT.roomid = ? "
    // db.query(sqlSelect, [roomid],  (err, result) => {
    //     res.send(result)
    //     const sqlSearch = "SELECT * FROM "
    //     console.log(result)
    const sqlSelect = "SELECT * FROM CHAT JOIN GOCHAT ON CHAT.roomid=GOCHAT.roomid JOIN POST ON CHAT.post_id=POST.post_id WHERE GOCHAT.roomid = ? "
    db.query(sqlSelect, [roomid],  (err, result) => {
        res.send(result)
       // console.log(result)
    });

});

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
            const sqlSelect = "SELECT * FROM GOCHAT WHERE (uidcustomer=? OR uidowner= ?) AND roomid =?";
            db.query(sqlSelect, [uidsender,uidsender,roomid],  (err, result) => {
                console.log(result)
                res.send(result);
            })
        }else{
            console.log(result)
            res.send(result);
        }
        
    })
});
//save post
router.post('/:id', (req,res)=> {
    const roomid = req.params.id
    const post_status = req.body.post_status
    const sqlSelect = "SELECT post_id FROM GOCHAT WHERE roomid =?";
    db.query(sqlSelect, [roomid],  (err, result) => {
        let postID
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            postID=row.post_id  
        });
        const sqlupdate = "UPDATE POST SET post_status =? WHERE post_id =? ";
        db.query(sqlupdate, [post_status,postID], (err, result) => {
        })
    })
});

export default router;