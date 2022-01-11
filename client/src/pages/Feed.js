import React,{useState, useEffect } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Modal, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";

const Feed = () =>{
    const [search, setSearch] = useState('');
    const [feedPost, setFeedPost] = useState([]);

    //show all post
    useEffect (() => {
        Axios.get("http://localhost:8000/feed").then((response) => {
            setFeedPost(response.data);
        });
    }, []);

    //search 
    const searchPost = () => {
        if(search !== ''){
            Axios.post("http://localhost:8000/feed", { 
                item: search
            }).then((response) => {
                setFeedPost(response.data);
            })
        }
    };

    //add post to favlist
    const addFav = (id) => {
        // alert("added to favorite list");
        Axios.post("http://localhost:8000/fav", { 
            post_id: id
        })
    };

    return (
        <Container>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        <GrSearch className="icon-large search-icon-pos" style={{ marginLeft: '70px' }} />
                    </Form.Label>
                    <Col sm="3">
                    <Form.Control type="text" placeholder="What are you looking for?"
                    className="search-bar search-bar-pos"/>
                    </Col>
                </Form.Group>
            </Form>

            {feedPost.map((val)=> {
                        return (
                            <CardGroup style={{ width: '90%' }} className="pos-center">
                            <Card style={{ margin: '20px' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{val.post_name}</Card.Title>
                                    <Card.Text>
                                                <h5> Description : </h5>  
                                                <h6> {val.description} </h6>
                                    </Card.Text>
                                    <Card.Footer style={{ backgroundColor: 'white', border: 'none' }}>
                                                    <Row>
                                                        <Col style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                            <GrLocation className="icon-sim" /> : {val.location}
                                                        </Col>  
                                                        <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                            <Button variant="outline-danger" className="fav-btn">
                                                            <AiOutlineHeart className="icon-sim"/>
                                                                favorite
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                            <Card style={{ margin: '20px' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{val.post_name}</Card.Title>
                                    <Card.Text>
                                                <h5> Description : </h5>  
                                                <h6> {val.description} </h6>
                                    </Card.Text>
                                    <Card.Footer style={{ backgroundColor: 'white', border: 'none' }}>
                                                    <Row>
                                                        <Col style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                            <GrLocation className="icon-sim" /> : {val.location}
                                                        </Col>  
                                                        <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                            <Button variant="outline-danger" className="fav-btn">
                                                            <AiOutlineHeart className="icon-sim"/>
                                                                favorite
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                            <Card style={{ margin: '20px' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{val.post_name}</Card.Title>
                                    <Card.Text>
                                                <h5> Description : </h5>  
                                                <h6> {val.description} </h6>
                                    </Card.Text>
                                    <Card.Footer style={{ backgroundColor: 'white', border: 'none' }}>
                                                    <Row>
                                                        <Col style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                            <GrLocation className="icon-sim" /> : {val.location}
                                                        </Col>  
                                                        <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                            <Button variant="outline-danger" className="fav-btn">
                                                            <AiOutlineHeart className="icon-sim"/>
                                                                favorite
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                            </CardGroup>
                        ); 
                    })}
        </Container>
    );

};

export default Feed;