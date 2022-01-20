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

    // show all favposts of user
    const sqlSelect = "SELECT DISTINCT * FROM POST JOIN FAVLIST ON POST.post_id = FAVLIST.post_id WHERE post_status Like 'Available' AND FAVLIST.user_id LIKE ? ";
    db.query(sqlSelect, [user_id], (err, result) => {
        if(err){
            console.log(err);
        }else{
          res.send(result);  
        }
    })
});

router.post('/', (req,res)=> {
    const user_id = req.body.uid;
    const post_id = req.body.post_id;

    //insert new fav post
    const sqlInsert = "INSERT INTO FAVLIST (user_id,post_id) VALUE (?,?);"
    db.query(sqlInsert, [user_id,post_id], (err, result) => {
        console.log(err);
    })

});

router.delete('/:uid/:id', (req,res)=> {
    const user_id = req.params.uid;
    const post_id = req.params.id;

    //delete favpost 
    const sqlDelete = "DELETE FROM FAVLIST WHERE user_id LIKE ? AND post_id = ?";
    db.query(sqlDelete, [user_id, post_id], (err, result) => {
        console.log(err);
    })
});

export default router;