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
    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' "
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

export default router;
