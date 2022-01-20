import express from 'express';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import cors from 'cors'; 

const __dirname = path.resolve();
const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});

router.use(cors());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/', 'uploads'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

// show mypost to edit
router.get('/:id', (req, res)=> {
    const user_id = 1234;
    const postid = req.params.id;

    const sqlSelect = "SELECT * FROM POST WHERE user_id =? AND post_id =?";
    db.query(sqlSelect, [user_id ,postid],  (err, result) => {
        res.send(result);
    })
    console.log(postid);
});


//save post
router.post('/:id', (req,res)=> {
    try{
        const user_id = 1234;
        const post_id = req.params.id;

        const post_name     = req.body.post_name
        const category      = req.body.category
        const description   = req.body.description
        const location      = req.body.location
        const edit_date     = req.body.edit_date
        let upload = multer({ storage: storage}).single('avatar');

            upload(req, res, function(err) {
                // req.file contains information of uploaded file
                // req.body contains information of text fields

                if (!req.file) {
                    return res.send('Please select an image to upload');
                }
                else if (err instanceof multer.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err); 
                } 

                const image = req.file.filename 

                const sql = "UPDATE POST SET image=? WHERE post_id =?";
                    db.query(sql,[image,post_id], (err, results) => {  if (err) throw err;
                        res.json({ success: 1 })
                        console.log("image");     
                        console.log(image);     

                    });  
            });

        const sqlupdate = "UPDATE POST SET post_name =? ,description =?,category =? ,edit_date =? ,location =? WHERE post_id =?";
        db.query(sqlupdate, [post_name ,description ,category ,edit_date ,location ,post_id ], (err, result) => {
            console.log(err);
            console.log(result);
            console.log(user_id);
            console.log(post_id);
            console.log(post_name);
            console.log(description);
            console.log(edit_date);
            console.log(location);
        })
        }
        catch (err) {
            console.log(err)
        }

});


export default router;