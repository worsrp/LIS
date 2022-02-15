import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import useChat from "../useChat";
import { AuthContext } from "../Auth";
import '../custom.scss';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';
import { BsImage } from "react-icons/bs";
const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    let urlString = window.location.href; 
    let roomId ;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
          roomId  = pair[0];
        }
    parseInt(roomId);
    const [uidsender,setuidsender] = useState('');
    const [uidreceiver,setuidreceiver] = useState('');
    const [postId,setpostid] = useState('');
    const [chat,setchat] = useState('')
    const [uidrec,setrec] = useState('')
    const [allMes, setAllMes ] = useState([])
    const [post, setPost] = useState([]);
    const [owner, setOwner] = useState([]);
    useEffect (() => {
      Axios.get(`http://localhost:8000/chat/${currentUser.uid}/${roomId}`).then((response) => {
          setchat(response.data[0].msg);
          let uidsend=response.data[0].uidreceiver;
          let uidsend2=response.data[0].uidsender;
          if(uidsend!=null)
          setuidreceiver(response.data[0].uidreceiver);
          else
          setuidreceiver(response.data[0].uidowner);
          if(uidsend2!=null)
          setuidsender(response.data[0].uidsender);
          else
          setuidsender(response.data[0].uidcustomer);
          setpostid(response.data[0].post_id);
      });
  }, []);
  const { messages, sendMessage } = useChat(roomId,currentUser.uid,currentUser.uid==uidsender?uidreceiver:uidsender,postId);
  const [newMessage, setNewMessage] = useState('');

  useEffect (() => {
    Axios.get(`http://localhost:8000/chat/${roomId}`).then((response) => {
      setAllMes(response.data);
      // setPost(response.data[0].post_name)
      // setOwner(response.data[0].firstname+" "+response.data[0].lastname)
  })
  }, []);
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        {/* <h1 className="room-name">Room:{post}</h1>
        <h3 className="owner">Post By :{owner}</h3> */}
      <div>
          { allMes.map((val) => {
            return (
              <div className={`${
                val.uidsender==currentUser.uid ? "text-sim" : "text-offer"
              }`}>
                {val.msg}
              </div>)
          }
          )} 
        </div>
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`${
                message.ownedByCurrentUser ? "text-sim" : "text-offer"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <Button className="btn-save" onClick={handleSendMessage}> Send </Button>
    </div>
  );
};

export default Chat;
