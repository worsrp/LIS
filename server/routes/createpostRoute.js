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

router.post('/', (req, res) => {

    //test
    const USER_ID = 1234;
    const STATUS = 'Available';
    // const IMAGE = req.body.image;
    
    const post_name = req.body.post_name
    const description = req.body.description
    const category = req.body.category
    const location = req.body.location
    const post_date = req.body.post_date
    const edit_date = req.body.post_date
    var pid =1 ;



    // const sqlInsert = "INSERT INTO POST (post_name,user_id,description,category,post_date,edit_date,post_status,location,image) VALUES (?,?,?,?,?,?,?,?,?);"
    // db.query(sqlInsert, [post_name,USER_ID,description,category,post_date,edit_date,STATUS,location,image], (err,result)=>{
    //     console.log(err);
    //         console.log(post_id);
    //         console.log(post_name);
    //         console.log(description); 
    //         console.log(edit_date);
    //         console.log(post_status);
    //         console.log(location);
    // })

            // console.log(post_name); 
            // console.log(typeof(post_name));
            // console.log(description); 
            // console.log(edit_date);   
            // console.log(STATUS);
            // console.log(typeof(STATUS));
            console.log(req.body.post_name.value());


    const sqlInsert = "INSERT INTO POST (post_name,user_id,description,category,post_date,edit_date,post_status,location) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sqlInsert, [post_name,USER_ID,description,category,post_date,edit_date,STATUS,location], (err,result)=>{
            console.log(err);
            // pid = result.insertId;
            // console.log(pid);
            // console.log(typeof(result.insertId));
            // console.log(typeof(pid));
            // console.log(pid);
            // console.log(typeof(pid));
            console.log(result.insertId);
            console.log(result.post_name);
            console.log(result.description); 
            console.log(result.edit_date);
            console.log(result.post_status);
            console.log(result.location); 
        });
        
        // let upload = multer({ storage: storage}).single('avatar');
        //     upload(req, res, function(err) {
        //         // req.file contains information of uploaded file
        //         // req.body contains information of text fields
        //         if (!req.file) {
        //             return res.send('Please select an image to upload');
        //         } 
        //         else if (err instanceof multer.MulterError) {
        //             return res.send(err);
        //         }
        //         else if (err) {
        //             return res.send(err); 
        //         };
        //         const image = req.file.filename
        //         console.log(req.file.filename); 
        //         console.log(pid);
        //         console.log(result.insertId);

        //         const sql = "UPDATE POST SET image = ? WHRER post_id = ?";
        //         db.query(sql, [image,result.insertId], (err,result)=>{
        //             console.log(err);
        //         });
        //     });
    });
    

export default router;
