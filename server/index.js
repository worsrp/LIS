import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

//import routers
<<<<<<< HEAD
import createpostRoute from './routes/createPostRoute.js'
=======
import createpostRoute from './routes/createpostRoute.js'
import feedRoute from './routes/feedRoute.js'
import favRoute from './routes/favRoute.js'
>>>>>>> b551ecaa2e4f5f3bba33dac2783ea2abdbf442b9

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

app.use("/createpost", createpostRoute);

app.use("/feed", feedRoute);

app.use("/fav", favRoute);

app.listen(8000, () =>{
    console.log("Running on port 8000");
})

