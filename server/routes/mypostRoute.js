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
    const user_id = req.params.uid;

    // show post of user
    const sqlSelect = "SELECT * FROM POST WHERE user_id LIKE ? ORDER BY post_id DESC";
    db.query(sqlSelect, [user_id], (err, result) => {
        res.send(result);
    })
});

router.delete('/:pid', (req,res)=> {
    const post_id = req.params.pid
    console.log(post_id)
    //delete post
    const sqlDelete = "DELETE FROM POST WHERE post_id = ?";
    db.query(sqlDelete, [post_id], (err, result) => {
        // console.log(err);
    })
});



export default router;