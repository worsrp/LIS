import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lisdatabase"
})

router.get('/', (req, res)=> {
    const user_id = 1234;
    const sqlSelect = "SELECT * FROM USER WHERE USER.user_id = ? ";
    db.query(sqlSelect, [user_id], (err, result) => {
        if(err){
            console.log(err);
        }else{
          res.send(result);  
        }
    })
});

router.post('/', (req,res) => {
    const user_id = 1234;
    const password = req.body.password

    const sqlUpdate = "UPDATE USER SET password = ? WHERE user_id = ?;"
    db.query(sqlUpdate, [password], (err,result)=>{
        console.log(err);
    })
});

export default router;