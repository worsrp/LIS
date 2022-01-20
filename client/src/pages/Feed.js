import React,{ useState, useEffect } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Carousel, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const Feed = () =>{
    const [search, setSearch] = useState('');
    const [feedPost, setFeedPost] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);

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
    const addFav = (id) =>{
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
                    {feedPost.slice(start,end).map((val)=> {
                        return(
                                    <Card className="card-feed">
                                        {val.image.length>10?(
                                        <Card.Img variant="top" src={require(`../../../public_html/uploads/${val.image}`)} />):(
                                            <div>

                                            </div>
                                        )}
                                        <Card.Body>
                                            <Card.Title>{val.post_name}</Card.Title>
                                            <Card.Text style={{ height: '100px'}}>{val.description}</Card.Text>
                                            <Card.Footer style={{ backgroundColor: 'white', border: 'none' }}>
                                                            <Row>
                                                                <Col style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                                    <GrLocation className="icon-sim" /> : {val.location}
                                                                </Col>  
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <Button className="btn-fav"
                                                                    onClick = {() => {addFav(val.post_id)}} >
                                                                    <AiOutlineHeart className="icon-sim" />
                                                                        <span className="fav-sty">favorite</span>
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
                        if(end !== feedPost.length){
                            setStart(start+1); setEnd(end+1); 
                        }
                    }}/>
                </Col>
            </Row>            
        </Container>
    );

};

export default Feed;