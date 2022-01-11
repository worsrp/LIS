import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});

// show mypost to edit
router.get('/:id', (req, res)=> {
    const user_id = 1234;
    const post_id = req.params.id;
    
    const sqlSelect = "SELECT * FROM POST WHERE user_id =? AND post_id = ?";
    db.query(sqlSelect, [user_id ,post_id],  (err, result) => {
        res.send(result);
        console.log(result);
        console.log(post_id);
        console.log(err);
    })
});

//save post
router.post('/:id', (req,res)=> {
    const user_id = 1234;
    const post_id = req.params.id;

    const post_name = req.body.post_name
    const description = req.body.description
    const location = req.body.location
    const edit_date = req.body.edit_date
    const post_status = req.body.post_status
    const picture = req.body.picture

    
    const sqlupdate = "UPDATE POST SET post_name =? ,description =? ,edit_date =? ,post_status =? ,location =? ,picture=?   WHERE post_id =?";
    db.query(sqlupdate, [post_name ,description ,edit_date ,post_status ,location ,picture ,post_id], (err, result) => {
        console.log(err);
        console.log(result);
        console.log(user_id);
        console.log(post_id);
        console.log(post_name);
        console.log(description);
        console.log(edit_date);
        console.log(post_status);
        console.log(location);
        console.log(picture);
    })
});



export default router;