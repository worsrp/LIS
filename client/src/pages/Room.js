import React,{ useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Image, CardGroup } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../Auth";
import { GrLocation } from "react-icons/gr";

const Room= () =>{
    const [room, setRoom] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [customer, setCustomer] = useState([]);
    const [owner, setOwner] = useState([]);
    const [image, setImage] = useState([]);
    let history = useHistory();

    useEffect (() => {
        if(currentUser === null){
            Axios.get(`http://localhost:8000/room/`, {
            }).then((response) => {
                setRoom(response.data);
            });
        }else{
            Axios.get(`http://localhost:8000/room/${currentUser.uid}`, {
            }).then((response) => {
                setRoom(response.data);
                // for(let i=0;i<(response.data.length);i=i+1){
                //     if(currentUser.uid==response.data[i].uidowner){
                //         console.log(i)
                //         console.log(response.data[i].firstname)
                //         // console.log(response.data[i+1].firstname)
                //         setCustomer("user 1 : "+ response.data[i].firstname+" "+response.data[i].lastname)
                //     //setOwner("user 2 : "+ response.data[i+1].firstname+" "+response.data[i+1].lastname)
                //     }
                    
                // }
            });
        }
    }, []);

    function chat(id) {
        // alert("added to favorite list");
        if(currentUser === null){
            window.location.href = `/login`;
        }else{
            Axios.get(`http://localhost:8000/chat/${id}`, {
            }).then((response) => {
                window.location.href = `/chat?${id}`;
            });
        }
        
    };

    return (
            <Row style={{ marginLeft: "50px" }}>
                <Col>
            {room.map((val)=> {
                if(val.uid!==currentUser.uid){
                    return(
                        <div>
                            <Card className="card-chat"  onClick = {() => {chat(val.roomid)}} >
                                <Row>
                                    <Col xs={5}>
                                        {val.image !== null ? (
                                            <Image roundedCircle variant="top" className="pic-chat" 
                                            src={require(`../../../public_html/uploads/${val.image}`)} />
                                        ):(
                                            <Image roundedCircle variant="top" className="pic-chat"  
                                            src={require("../nopic.jpg")} />
                                        )}
                                    </Col>
                                    <Col style={{ marginTop: "10px" }}>
                                        <Row style={{ fontWeight: "700", fontSize: "18px" }}>
                                            {val.post_name}
                                        </Row>
                                        <Row style={{ marginLeft: "-20px" }}>
                                            <Col xs={1}>
                                                <FaUser className="icon-small" style={{ marginTop: "-4px"}}/>
                                            </Col>
                                            <Col style={{ marginLeft: "-5px" }}>
                                                {val.firstname} {val.lastname}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={1}>
                                                <GrLocation className="icon-small" style={{ marginLeft: "-8px", marginTop: "-3px"}}/>
                                            </Col>
                                            <Col style={{ marginLeft: "-12px"}}>
                                                {val.location}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>       
                        </div>
                        )    
                    }    
            })}      
                </Col>
                <Col>
                </Col>
            </Row>     
    );
};

export default Room;