import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

//import routers
import createpostRoute from './routes/createpostRoute.js'
import feedRoute from './routes/feedRoute.js'
import favRoute from './routes/favRoute.js'
import profileRoute from './routes/profileRoute.js'
import mypostRoute from './routes/mypostRoute.js'
import loginRoute from './routes/loginRoute.js'
import registerRoute from './routes/registerRoute.js'
import editprofileRoute from './routes/editprofileRoute.js'


const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

app.use("/createpost", createpostRoute);

app.use("/feed", feedRoute);

app.use("/fav", favRoute);

app.use("/profile", profileRoute);

app.use("/mypost", mypostRoute);

app.use("/register", registerRoute);

app.use("/login", loginRoute);

app.use("/editprofile", editprofileRoute);


app.listen(8000, () =>{
    console.log("Running on port 8000");
})


