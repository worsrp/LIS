import React,{ useState, useEffect, useContext } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Carousel, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../Auth";

const Feed = () =>{
    const [search, setSearch] = useState('');
    const [feedPost, setFeedPost] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const { currentUser } = useContext(AuthContext);

    //show all post
    useEffect (() => {
        Axios.get(`http://localhost:8000/feed/${currentUser.uid}`, {
        }).then((response) => {
            setFeedPost(response.data);
        });
    }, []);

    //search 
    const searchPost = () => {
        if(search !== ''){
            Axios.post("http://localhost:8000/feed", { 
                item: search,
                uid: currentUser.uid
            }).then((response) => {
                setFeedPost(response.data);
            })
        }
    };

    //add post to favlist
    const addFav = (id) =>{
        // alert("added to favorite list");
        Axios.post("http://localhost:8000/fav", { 
            post_id: id,
            uid: currentUser.uid
        })
    };

    return (
        <Container style={{ marginTop: '-50px' }}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                searchPost();}}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        <GrSearch className="icon-large search-icon-pos" style={{ marginLeft: '70px' }} />
                    </Form.Label>
                    <Col sm="3">
                    <Form.Control type="text" placeholder="What are you looking for?"
                    className="search-bar search-bar-pos"
                    onChange={ (e) => { setSearch(e.target.value) }}/>
                    </Col>
                </Form.Group>
            </Form>
            <Row className="justify-content-md-center">
            <Col md="auto" >
                {feedPost.length > 3 && start !== 0 ? (
                    <FiArrowLeft className="icon-arrow" style={{ height: '65vh' }} 
                    onClick={ () => { 
                        if(start !== 0){
                            setStart(start-1); setEnd(end-1); 
                        }
                    }}/>
                ):( <FiArrowLeft className="icon-arrow" style={{ height: '65vh', color: 'white' }} />)}
                </Col>
                <Col xs lg="10" >
                    <CardGroup style={{ width: '100%' }}>
                    {feedPost.slice(start,end).map((val)=> {
                        return(
                                    <Card className="card-feed">
                                        <div className="pic-feed">
                                        {val.image.length>1 ? (
                                        <img variant="top" src={require(`../../../public_html/uploads/${val.image}`)} 
                                        />):(
                                        <img variant="top" src={require("../nopic.jpg")} />
                                        )}
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{val.post_name}</Card.Title>
                                            <Card.Text style={{ height: '12vh'}}>{val.description}</Card.Text>
                                            <Card.Footer style={{ backgroundColor: 'white', border: 'none' }}>
                                                            <Row>
                                                                <Col style={{ marginTop: '20px', marginLeft: '-10px'}} xs={9}>
                                                                    <Row>
                                                                    <Col xs={1}>
                                                                    <GrLocation className="icon-sim" /> 
                                                                    </Col>
                                                                    <Col xs={1}>
                                                                        : 
                                                                    </Col>
                                                                    <Col xs={8}>
                                                                        {val.location}
                                                                    </Col>
                                                                    </Row> 
                                                                </Col>  
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <Row>
                                                                            <Button className="btn-fav"
                                                                            onClick = {() => {addFav(val.post_id)}} >
                                                                            <AiOutlineHeart className="icon-sim" />
                                                                                <span className="fav-sty">fav</span>
                                                                            </Button>
                                                                    </Row>                                                                
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
                    {feedPost.length > 3 && end !== feedPost.length ? (
                        <FiArrowRight className="icon-arrow" style={{ height: '65vh' }} 
                        onClick={ () => {
                            if(end !== feedPost.length){
                                setStart(start+1); setEnd(end+1); 
                            }
                        }}/>
                    ):( <FiArrowRight className="icon-arrow" style={{ height: '65vh', color: 'white' }}/> )}
                </Col>
            </Row>            
        </Container>
    );

};

export default Feed;