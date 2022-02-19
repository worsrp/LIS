import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import useChat from "../useChat";
import { AuthContext } from "../Auth";
import Room from "../pages/Room";
import ScrollableFeed from 'react-scrollable-feed'

//import sytle
import '../custom.scss';
import { Button, Form, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';
import { BsImage } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri"
import { HiOutlineCheckCircle } from 'react-icons/hi'

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

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const hiddenFileInput = React.useRef(null);

  const formdata = new FormData(); 

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  const [post_id,setPost_id] = useState([])
  // const [post_status,setPost_Status] = useState('')

  
  const statusPost =() =>{
    var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        date = yyyy + '-' + mm + '-' + dd;
    if(window.confirm("Are you sure to change status post?")){
      Axios.post(`http://localhost:8000/chat/${roomId}`,{
        uid: currentUser.uid,
        date: date
      // }).then(() =>{
      //   Axios.post(`http://localhost:8000/chat/`,{
      //   uid: currentUser.uid,
      //   date: date
      //   })
      })
      window.location.reload(false);
    }
  }

  let element,hidden
  return (
      <Row>
        <Col>
          <Room/>
        </Col>
        <Col style={{ marginRight: "60px" }}>
            <div className="messages-container">
          <Row>
            <Col xs={9}>
            <h1 className="room-name">Room:{post}</h1>
            {/* <h3 className="owner">{owner}</h3> */}
            <h5 style={{ marginTop: "-10px"}}>{uidcus==currentUser.uid ? "Post by : "+ owner : ""}</h5>
            {/* <h1 className="room-name">Room:{post}</h1>
            <h3 className="owner">Post By :{owner}</h3> */}
            <div style={{ marginTop: "-10px"}}>status :{status} </div>
            </Col>
            <Col style={{ textAlign: "end" }}>
            {uidown==currentUser.uid && status=="Available" ?  
                <Button id="button" style={{ backgroundColor: "green", border: "none" }}
                onClick={()=>{statusPost()}}>
                  <HiOutlineCheckCircle className="icon-sim"/>
                  Share 
                  <div>to this user</div>
                </Button> 
                : ""}
            </Col>
          </Row>
            <ScrollableFeed className="chat-room">
              { allMes.map((val, i) => {
                return (
                  <div key={i}>
                  <Row 
                  className={`${
                    val.uidsender==currentUser.uid ? "text-sim" : "text-offer"
                  }`}>
                        <div className={`${
                        val.uidsender==currentUser.uid ?  "chat-send" : "chat-rec"
                        }`}>{val.msg}</div>                    
                  </Row>
                  </div>
              )}
              )} 
              {messages.map((message, i) => (
                <div key={i}>
                  <Row
                  className={`${
                    message.ownedByCurrentUser ? "text-sim" : "text-offer"
                  }`}>
                    <div className={`${
                        message.ownedByCurrentUser ? "chat-send" : "chat-rec"
                        }`}>{message.body}</div> 
                  </Row>
                </div>
              ))}
              </ScrollableFeed>
          </div>
          <InputGroup style={{ marginTop: "10px" }} 
          className="form-chat">
            <Button className="btn-trans"
            onClick={handleClick}>
              <BsImage className="icon-sim" style={{ color: "gray" }}/>
            </Button>
            <FormControl
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
              style={{ border: "none" }}
              onKeyPress={(e) => {
                if(e.key === 'Enter'){
                  handleSendMessage()
                }
              }}
            />
            <Button className="btn-trans" 
            onClick={handleSendMessage}>
              <RiSendPlaneLine className="icon-sim" style={{ color: "gray" }}/>
            </Button>
          </InputGroup>
            <Col style={{ textAlign: 'center' }} style={{ display: 'none'}}>
                {userInfo.filepreview !== null ? (
                  <Image src={userInfo.filepreview}
                    rounded className="pic-create" />
                  ) : ( 
                  <Image src={require(`../nopic.jpg`)}
                    rounded className="pic-create" />
                )} 
              </Col>
          <Col>
              <Form.Control type="file" ref={hiddenFileInput} style={{ display: 'none'}}
              onChange={handleNewMessageChange} /> 
          </Col>
        </Col>
      </Row>
  );
};

export default Chat;
