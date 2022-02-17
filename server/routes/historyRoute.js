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

    //on feed show all post but not currentUser's post
    const sqlSelect = "SELECT * FROM HISTORY JOIN USER ON HISTORY.user_2 = USER.uid JOIN POST ON HISTORY.post_id = POST.post_id WHERE HISTORY.user_1 LIKE ? "
    db.query(sqlSelect,[uid], (err, result) => {
        res.send(result);
    })
});

export default router;