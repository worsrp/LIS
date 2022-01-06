import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});


router.post('/', (req, res) => {
    //test
    const USER_ID = 1234;
    const STATUS = 'Available';
    const PICTURE = 1;
    
    const post_name = req.body.post_name
    const description = req.body.description
    const category = req.body.category
    const location = req.body.location
    const post_date = req.body.post_date
    const edit_date = req.body.post_date

    const sqlInsert = "INSERT INTO POST (post_name,user_id,description,category,post_date,edit_date,post_status,location,picture) VALUES (?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [post_name,USER_ID,description,category,post_date,edit_date,STATUS,location,PICTURE], (err,result)=>{
        console.log(err);
    })
});

export default router;