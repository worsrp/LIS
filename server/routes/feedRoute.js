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

    //on feed show all post but not currentUser's post
    const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' AND user_id NOT LIKE ? ORDER BY post_id DESC"
    db.query(sqlSelect,[uid], (err, result) => {
        res.send(result);
        
    })
});


router.post('/', (req,res)=> {
    let searchItem = req.body.item;
    let uid = req.body.uid;
    let category = req.body.category;
    searchItem = "%"+searchItem+"%";

    console.log(searchItem);
    console.log(category);

    if(searchItem === "%%"){
        const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' AND user_id NOT LIKE ? AND category LIKE ?"
        db.query(sqlSelect, [ uid, category], (err, result) => {
            console.log(result)
            if(err){
                console.log(err);
            }else{
            res.send(result); 
            }
        })
    }else{
        const sqlSelect = "SELECT * FROM POST WHERE post_status Like 'Available' AND user_id NOT LIKE ? AND category LIKE ? AND (post_name Like ? OR description Like ?)"
        db.query(sqlSelect, [uid, category, searchItem, searchItem], (err, result) => {
            console.log(result)
            if(err){
                console.log(err);
            }else{
            res.send(result); 
            }
        })  
    }
    //search post
});

export default router;
