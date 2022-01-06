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
    //on feed show all post
    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' ORDER BY post_id DESC"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

router.post('/', (req,res)=> {
    const searchItem = req.body.item;

    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Availables' "
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

export default router;
