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
    let uid = req.params.uid;
    console.log(uid);

    //on feed show all post but not currentUser's post
    const sqlSelect = "SELECT * FROM HISTORY JOIN POST ON HISTORY.post_id = POST.post_id WHERE user_1 LIKE ? AND post_status Like 'Soldout'"
    db.query(sqlSelect,[uid], (err, result) => {
        res.send(result);
        
    })
});

router.post('/', (req,res)=> {
    const user_1 = req.body.user1;
    const user_2 = req.body.user2;
    const date = req.body.date;
    const post_id = req.body.post_id;

    //insert new history
    const sqlInsert = "INSERT INTO HISTORY (user_1,user_2,date,post_id) VALUE (?,?,?,?);"
    db.query(sqlInsert, [user_1, user_2, date, post_id], (err, result) => {
        console.log(err);
    })

});

export default router;