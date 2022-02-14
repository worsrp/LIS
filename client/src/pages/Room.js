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

    //show all post
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
            });
        }
    }, []);

    const chat = (id) =>{
        // alert("added to favorite list");
        if(currentUser === null){
            window.location.href = `/login`;
        }else{
            window.location.href = `/chat?${id}`;
        }
        
    };

    return (
        <Container style={{ marginTop: '-50px' }}>
            <Row className="justify-content-md-center">
         
                    {room.map((val)=> {
                        return(
                                    <Card className="card-feed">

                                            <Card.Title>{val.roomid}</Card.Title>
                        
            
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <Row>
                                                                            <Button className="btn-fav" variant="outline-warning"
                                                                            onClick = {() => {chat(val.roomid)}} >
                                                                            <span className="fav-sty">chat</span>
                                                                            </Button>
                                                                    </Row>                                                                
                                                                </Col>
                                                                </Card>
                    )})};
            </Row>            
        </Container>
    );

};

export default Room;