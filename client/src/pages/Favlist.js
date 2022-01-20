import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Modal, CardGroup } from 'react-bootstrap';
import { GrLocation } from "react-icons/gr";
import { IoCloseCircle } from "react-icons/io5";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../Auth";

const Favlist = () =>{
    const [favPost, setFavPost] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const { currentUser } = useContext(AuthContext);

    //get fav post
    useEffect (() => {
        Axios.get(`http://localhost:8000/fav/${currentUser.uid}`, {
        }).then((response) => {
            setFavPost(response.data);
        });
    }, []);

    //remove fav post
    const deleteFav = (post_id) => {
        if(window.confirm("Remove this post from my favorite post ")){
            Axios.delete(`http://localhost:8000/fav/${currentUser.uid}/${post_id}`);
        }
    };

    return (
        <Container className="favList">
            <Row className="justify-content-md-center">
                <Col style={{ textAlign: 'center' }}>
                    <h2 className="text-header">My favorite post</h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md="auto" >
                    <FiArrowLeft className="icon-arrow" style={{ height: '65vh', marginRight: '10px' }} 
                    onClick={ () => { 
                        if(start !== 0){
                            setStart(start-1); setEnd(end-1); 
                        }
                    }}/>
                </Col>
                <Col xs lg="10" >
                    <CardGroup style={{ width: '100%' }}>
                    {favPost.slice(start,end).map((val)=> {
                        return(
                                    <Card className="card-feed">
                                        <Card.Img variant="top" src="holder.js/100px180" />
                                        <Card.Body>
                                            <Card.Title>{val.post_name}</Card.Title>
                                            <Card.Title>{val.post_id}</Card.Title>
                                            <Card.Text style={{ height: '100px'}}>{val.description}</Card.Text>
                                            <Card.Footer style={{ backgroundColor: 'white', border: 'none' }}>
                                                            <Row>
                                                                <Col style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                                    <GrLocation className="icon-sim" /> : {val.location}
                                                                </Col>  
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <Button className="btn-remove"
                                                                    onClick={() => {deleteFav(val.post_id)}} >
                                                                    <IoCloseCircle className="icon-sim" />
                                                                        remove
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>
                        )
                            })}
                    </CardGroup>
                </Col>
                <Col md="auto">
                    <FiArrowRight className="icon-arrow" style={{ height: '65vh', marginLeft: '10px' }} 
                    onClick={ () => {
                        if(end !== favPost.length){
                            setStart(start+1); setEnd(end+1); 
                        }
                    }}/>
                </Col>
            </Row>
        </Container>
    );
};

export default Favlist;