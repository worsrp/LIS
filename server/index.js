import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

//import routers
import createpostRoute from './routes/createpostRoute.js'
import feedRoute from './routes/feedRoute.js'

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

app.use("/createpost", createpostRoute);

app.use("/feed", feedRoute);

app.listen(8000, () =>{
    console.log("Running on port 8000");
})

