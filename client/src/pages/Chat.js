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
    let postId ;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
          postId  = pair[0];
        }
    parseInt(postId);
    const [uidowner,setuidowner] = useState('');
    const [chat,setchat] = useState('')
    useEffect (() => {
      Axios.get(`http://localhost:8000/chat/${currentUser.uid}/${postId}`).then((response) => {
          setchat(response.data);
      });
  }, []);
    Axios.get(`http://localhost:8000/chat/${postId}`).then((response) => {
            setuidowner(response.data[0].user_id);
            });
  const { messages, sendMessage } = useChat(postId,currentUser.uid,uidowner);
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
      <h1 className="room-name">Room:{postId}</h1>
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
