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
    
    const post_name = req.body.post_name
    const description = req.body.description
    const category = req.body.category
    const location = req.body.location
    const post_date = req.body.post_date
    const edit_date = req.body.post_date

    // const sqlInsert = "INSERT INTO POST (post_name,user_id,description,category,post_date,edit_date,post_status,location,image) VALUES (?,?,?,?,?,?,?,?,?);"
    // db.query(sqlInsert, [post_name,USER_ID,description,category,post_date,edit_date,STATUS,location,IMAGE], (err,result)=>{
    //     console.log(err);
    // })

    // const sqlselect ="SELECT post_id FROM POST ORDER BY post_id DESC LIMIT 1";
    // const post_id = db.query(sqlselect,[post_id],(err, results) => {
    //     console.log(err);
    // });

    // console.log(post_id);


    let upload = multer({ storage: storage}).single('avatar');

        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields
            console.log(req.body);
            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err); 
            }
            const USER_ID = 1234;
            const STATUS = 'Available';
            
            const post_name = req.body.post_name
            const description = req.body.description
            const category = req.body.category
            const location = req.body.location
            const post_date = req.body.post_date
            const edit_date = req.body.post_date
            const image = req.file.filename

            // const sql = "UPDATE POST SET image=? WHERE post_id=?";
            // db.query(sql,[image,post_id], (err, results) => {  if (err) throw err;
			// 	res.json({ success: 1 })      

			// });  
            console.log(req.post_name);

            const sqlInsert = "INSERT INTO POST (post_name,user_id,description,category,post_date,edit_date,post_status,location,image) VALUES (?,?,?,?,?,?,?,?,?)";
            db.query(sqlInsert, [req.body.post_name,USER_ID,req.body.description,req.body.category,req.body.post_date,req.body.edit_date,STATUS,req.body.location,image], (err,result)=>{
            console.log(err);
    })

        });


});


export default router;
