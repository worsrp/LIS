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

router.post('/:uid', (req, res) => {
    const uid = req.params.uid;	
    try {
        // 'avatar' is the name of our file input field in the HTML form
        const firstname = req.body.firstname
        const lastname  = req.body.lastname
        const mobile    = req.body.mobile
        const address   = req.body.address
        const img = req.body.image
        // const password  = req.body.password
        console.log(firstname)
        console.log(lastname)
        console.log(mobile)
        console.log(address)
        console.log(img)
        const sqlInsert = "UPDATE USER SET firstname=?, lastname=?, mobile=?, address=? WHERE uid=?;"
        db.query(sqlInsert,[firstname, lastname, mobile, address,uid],
        (err, result) =>{
            // console.log(err);
        })

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

                const sql = "UPDATE user SET image=? WHERE uid=?";
                db.query(sql,[image,uid], (err, results) => {  if (err) throw err;
                    res.json({ success: 1 })      

                });   

            });
        

    }catch (err) {console.log(err)}
})



export default router;