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

    //show all feed
    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' ORDER BY post_id DESC"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        
    })
});

router.get('/:uid', (req, res)=> {
    let uid = req.params.uid;
    console.log(uid);

    //on feed show all post but not currentUser's post
    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' AND user_id NOT LIKE ? ORDER BY post_id DESC"
    db.query(sqlSelect,[uid], (err, result) => {
        res.send(result);
        
    })
});


router.post('/', (req,res)=> {
    let searchItem = req.body.item;
    let uid = req.body.uid;
    searchItem = "%"+searchItem+"%";

    //search post
    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' AND post_name Like ? OR description Like ? AND user_id NOT LIKE ?"
    db.query(sqlSelect, [searchItem, searchItem, uid], (err, result) => {
        if(err){
            console.log(err);
        }else{
          res.send(result); 
        }
    })
});

export default router;
