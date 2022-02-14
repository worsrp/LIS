import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

//import routers
import createpostRoute from './routes/createpostRoute.js'
import feedRoute from './routes/feedRoute.js'
import favRoute from './routes/favRoute.js'
import profileRoute from './routes/profileRoute.js'
import mypostRoute from './routes/mypostRoute.js'
import loginRoute from './routes/loginRoute.js'
import registerRoute from './routes/registerRoute.js'
import editprofileRoute from './routes/editprofileRoute.js'
import editpostRoute from './routes/editpostRoute.js';
import chatRoute from './routes/chatRoute.js';
import roomRoute from './routes/roomRoute.js';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "LISDatabase",
});

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const app = express();
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { postId } = socket.handshake.query;
  socket.join(postId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(postId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    console.log(data);
    const sqlSelect = "INSERT INTO CHAT  (uidsender,uidreceiver,post_id,msg,roomid) VALUE (?,?,?,?,?);"
        db.query(sqlSelect, [data.usenderId,data.receiverId,data.postid,data.body,data.roomid], (err, result) => {         
        })  
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(postId);
  });
});

app.use(express.json());

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    })
  );

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));


app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
        expires: 60 * 60 * 24,
        },
    })
);

app.use("/createpost", createpostRoute);

app.use("/feed", feedRoute);

app.use("/fav", favRoute);

app.use("/profile", profileRoute);

app.use("/mypost", mypostRoute);

app.use("/register", registerRoute); 

app.use("/login", loginRoute);

app.use("/editpost", editpostRoute);

app.use("/editprofile", editprofileRoute);

app.use("/chat", chatRoute);

app.use("/room", roomRoute);

server.listen(8000, () =>{
    console.log("Running on port 8000");
})


