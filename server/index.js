import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

//import routers
import createpostRoute from './routes/createpostRoute.js'
import feedRoute from './routes/feedRoute.js'
import favRoute from './routes/favRoute.js'
<<<<<<< HEAD
import profileRoute from './routes/profileRoute.js'
=======
import mypostRoute from './routes/mypostRoute.js'
>>>>>>> f41d1ba8aaa1d72c7f45e961b828158257e1bd66

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

app.use("/createpost", createpostRoute);

app.use("/feed", feedRoute);

app.use("/fav", favRoute);

<<<<<<< HEAD
app.use("/profile", profileRoute);
=======
app.use("/mypost", mypostRoute);
>>>>>>> f41d1ba8aaa1d72c7f45e961b828158257e1bd66

app.listen(8000, () =>{
    console.log("Running on port 8000");
})

