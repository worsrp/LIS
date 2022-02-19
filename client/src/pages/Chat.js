import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import useChat from "../useChat";
import { AuthContext } from "../Auth";
import Room from "../pages/Room";
import ScrollableFeed from 'react-scrollable-feed'

//import sytle
import '../custom.scss';
import { Button, Form, Row, Col, Image, InputGroup, FormControl, Card, Container } from 'react-bootstrap';
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
    const [receiever, setReceiever] = useState([]);
    const [uidcus, setUidcus] = useState('');
    const [uidown, setUidown] = useState([]);
    const [status, setStatus] = useState('');
    const [imageCus, setImageCus] = useState('');
    const [imageOwn, setImageOwn] = useState('');
    const [postID, setPostID] = useState('');
    const [postIMG, setPostIMG] = useState('');
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
      setAllMes(response.data)
      setPost(response.data[0].post_name)
      setUidown(response.data[0].uidowner)
      setOwner(response.data[0].firstname+" "+response.data[0].lastname)
      setStatus(response.data[0].post_status);
      console.log(response.data[0].post_status);
      setUidcus(response.data[0].uidcustomer)
      setImageOwn(response.data[0].image)
      setPostID(response.data[0].post_id)
      // setPost(response.data[0].post_name)
      // setOwner(response.data[0].firstname+" "+response.data[0].lastname)
  })
  }, []);


  useEffect (() => {
    Axios.get(`http://localhost:8000/chat/${roomId}/${currentUser.uid}/${uidcus}`).then((response) => {
        console.log(response.data)
        setReceiever(response.data[0].firstname+" "+response.data[0].lastname)
        setImageCus(response.data[0].image)
      })
  }, [uidcus]);

  useEffect (() => {
    Axios.get(`http://localhost:8000/chat/${roomId}/${currentUser.uid}/${uidcus}/${postID}`).then((response) => {
        console.log(response.data)
        setPostIMG(response.data[0].image)
      })
  }, [postID]);
    
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
            { uidcus==currentUser.uid ? 
                <Col xs={1}>
                { imageOwn !== '' ?
                    <Image src={require(`../../../public_html/uploads/${imageOwn}`)}
                    roundedCircle  style={{ width: "60px", height: "60px" }}/>
                    : <Image src={require(`../nopic.jpg`)}
                    roundedCircle  style={{ width: "60px", height: "60px" }}/>}
              </Col> :
              <Col xs={1}>
              { imageCus !== '' ?
                  <Image src={require(`../../../public_html/uploads/${imageCus}`)}
                  roundedCircle  style={{ width: "60px", height: "60px" }}/>
                  : <Image src={require(`../nopic.jpg`)}
                  roundedCircle  style={{ width: "60px", height: "60px" }}/>}
              </Col>
            }
            <Col xs={6} style={{ marginTop: "25px"}}>
            { uidcus==currentUser.uid ? 
              <h3 style={{ marginTop: "-10px"}}>{owner}</h3>
              :
              <h3 style={{ marginTop: "-10px"}}>{receiever}</h3>
            }
            </Col>
          </Row>
          <Card className="mx-auto" style={{ width: "500px", height: "100px", borderRadius: "15px",
                position: "absolute", left: "700px", top: "160px"}}>
                <Card.Body>
                <Row>
                <Col xs={2}>
                    { postIMG !== '' ?
                        <Image src={require(`../../../public_html/uploads/${postIMG}`)}
                        style={{ width: "80px", height: "80px", borderRadius: "10px", marginTop: "-7px", marginLeft: "-5px" }}/>
                        : <Image src={require(`../nopic.jpg`)}
                        style={{ width: "80px", height: "80px", borderRadius: "10px", marginTop: "-7px", marginLeft: "-5px" }}/>}
                  </Col> 
                  <Col style={{ marginTop: "10px", marginLeft: "10px"}}>
                  <h5 className="room-name">{post}</h5>
                  {/* <h3 className="owner">{owner}</h3> */}
                  {/* <h1 className="room-name">Room:{post}</h1>
                  <h3 className="owner">Post By :{owner}</h3> */}
                  <div style={{ marginTop: "-10px"}}> {status} </div>
                  </Col>
                  
                  {uidown==currentUser.uid && status=="Available" ?  
                    <Col style={{ textAlign: "end" }}>
                      <Button id="button" style={{ backgroundColor: "green", border: "none", borderRadius: "10px"}}
                      onClick={()=>{statusPost()}}>
                        <HiOutlineCheckCircle className="icon-sim"/>
                        Share 
                        <div>to this user</div>
                      </Button> 
                      </Col>
                      : ""}
                </Row>
                </Card.Body>
              </Card>
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
