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
    const [uidcus, setUidcus] = useState([]);
    const [uidown, setUidown] = useState([]);
    const [status, setStatus] = useState('');
    const [userInfo, setuserInfo] = useState({
      file:[],
      filepreview:null,
  });
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
          console.log(postId)
      });
  }, []);
  const { messages, sendMessage } = useChat(roomId,currentUser.uid,currentUser.uid==uidsender?uidreceiver:uidsender,postId);
  const [newMessage, setNewMessage] = useState('');

  useEffect (() => {
    Axios.get(`http://localhost:8000/chat/${roomId}`).then((response) => {
      setAllMes(response.data);
      setPost(response.data[0].post_name)
      setUidcus(response.data[0].uidcustomer)
      setUidown(response.data[0].uidowner)
      setOwner(response.data[0].firstname+" "+response.data[0].lastname)
      setStatus(response.data[0].post_status);
      console.log(response.data[0].post_status);
      // setPost(response.data[0].post_name)
      // setOwner(response.data[0].firstname+" "+response.data[0].lastname)
  })
  }, []);
    
  // const storage = multer.diskStorage({
  //   destination: path.join(__dirname, '../public_html/', 'uploads'),
  //   filename: function (req, file, cb) {   
  //       // null as first argument means no error
  //       cb(null, Date.now() + '-' + file.originalname )  
  //   }
  // })
  // let image
  // let upload = multer({ storage: storage}).single('avatar');
  //   upload(req, res, function(err) {
  //     image = req.file.filename
  //   });

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const hiddenFileInput = React.useRef(null);
  const formdata = new FormData(); 
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  const [post_id,setPost_id] = useState([])
  // const [post_status,setPost_Status] = useState('')
  let post_status="Unavailable"
  const statusPost =() =>{
    if(window.confirm("Are you sure to change status post?")){
      Axios.post(`http://localhost:8000/chat/${roomId}`,{
      post_status:post_status
    })
      window.location.reload(false);

    }
  }
  let element,hidden
  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <h1 className="room-name">Room:{post}</h1>
        {/* <h3 className="owner">{owner}</h3> */}
        <h5>{uidcus==currentUser.uid ? "Post by : "+ owner : ""}</h5>
        {/* <h1 className="room-name">Room:{post}</h1>
        <h3 className="owner">Post By :{owner}</h3> */}
      <div>
      <div>status :{status} </div>
      <Col >{uidown==currentUser.uid && status=="Available" ?  <Button id="button" onClick={()=>{statusPost()}}> Share </Button> : ""}</Col>
          { allMes.map((val) => {
            return (
              <div className={`${
                val.uidsender==currentUser.uid ? "text-sim" : "text-offer"
              }`}>
                {val.time}
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
      <Form>
        <Col style={{ textAlign: 'center' }}>
            {userInfo.filepreview !== null ? (
              <Image src={userInfo.filepreview}
                rounded className="pic-create" />
              ) : ( 
              <Image src={require(`../nopic.jpg`)}
                rounded className="pic-create" />
            )} 
          </Col>
      </Form>
      <Col>
          {newMessage}
          <Form.Control  type="file" ref={hiddenFileInput} onChange={handleNewMessageChange} /> 
      </Col>
      <Button className="btn-save" onClick={handleSendMessage}> Send </Button>
    </div>
  );
};

export default Chat;
