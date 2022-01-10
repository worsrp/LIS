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
    try {
        // 'avatar' is the name of our file input field in the HTML form
        const user_id = 1234
        const email     = req.body.email
    const firstname = req.body.firstname
    const lastname  = req.body.lastname
    const moblie    = req.body.moblie
    const address   = req.body.address
    const password  = req.body.password
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

            const classifiedsadd = {
                id:user_id,
				image: req.file.filename
			};
            const sql = "UPDATE user SET image=? WHERE id=?";
            db.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
				res.json({ success: 1 })      

			});  

        });
        
        const sqlInsert = "UPDATE USER SET email=?, firstname=?, lastname=?, password=?, moblie=?, address=? WHERE id=?;"
    db.query(sqlInsert,[email, firstname, lastname, password, moblie, address,user_id],
    (err, result) =>{
        console.log(err);
    })

    }catch (err) {console.log(err)}
})



export default router;