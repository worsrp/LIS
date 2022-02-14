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
    useEffect (() => {
      Axios.get(`http://localhost:8000/chat/${currentUser.uid}/${roomId}`).then((response) => {
          setchat(response.data[0].msg);
          if(response.data[0].uidreceiver!=='undefined')
          setuidreceiver(response.data[0].uidreceiver);
          else
          setuidreceiver(response.data[0].uidowner);
          if(response.data[0].uidsender!=='undefined')
          setuidsender(response.data[0].uidsender);
          else
          setuidsender(response.data[0].uidcustomer);
          setpostid(response.data[0].post_id)
      });
  }, []);
  const { messages, sendMessage } = useChat(roomId,currentUser.uid,currentUser.uid==uidsender?uidreceiver:uidsender,postId);
  const [newMessage, setNewMessage] = useState('');


  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room:{roomId}</h1>
      <div className="messages-container">
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
