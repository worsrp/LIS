import React,{ useState, useEffect, useContext } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Image, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../Auth";

const Room= () =>{
    const [room, setRoom] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [customer, setCustomer] = useState([]);
    const [owner, setOwner] = useState([]);
    const [image, setImage] = useState([]);
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

    const chat = (id) =>{
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
    let key
    return (
        <Container style={{ marginTop: '-50px' }}>
        <Row className="justify-content-md-center">
            {room.map((val)=> {
                return(
                <div>
                    <CardGroup style={{ width: '25%' }}>
                    <Card className="card-feed">
                        <Card.Title>{val.post_name}</Card.Title>
                        {/* <Col>{owner}</Col> */}
                        <Col  >{val.uidowner==currentUser.uid ? "from : "+val.firstname+" "+val.lastname : ""}</Col>
                        {val.image !== null ? (
                            <Card.Img variant="top" src={require(`../../../public_html/uploads/${val.image}`)} />
                        ):(
                            <Card.Img variant="top" src={require("../nopic.jpg")} />
                        )}
                        <Col>{val.location}</Col>
                        <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                            <Row>
                                <Button className="btn-fav" variant="outline-warning"
                                onClick = {() => {chat(val.roomid)}} >
                                <span className="fav-sty">chat</span>
                                </Button>
                            </Row>                                                                
                        </Col>
                        </Card> 
                        </CardGroup>  
                            
                </div>
                )        
                    
                
            })}
        </Row>            
        </Container>
    );
};

export default Room;