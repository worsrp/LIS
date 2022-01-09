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

    // show post of user
    const sqlSelect = "SELECT * FROM POST WHERE POST.user_id = ? ORDER BY post_id DESC";
    db.query(sqlSelect, [user_id], (err, result) => {
        res.send(result);
    })
});

router.delete('/:id', (req,res)=> {
    const user_id = 1234;
    const post_id = req.params.id;

    //delete post
    const sqlDelete = "DELETE FROM POST WHERE user_id = ? AND post_id = ?";
    db.query(sqlDelete, [user_id, post_id], (err, result) => {
        console.log(err);
    })
});

export default router;