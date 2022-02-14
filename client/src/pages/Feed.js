import React,{ useState, useEffect, useContext } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Image, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../Auth";

const Feed = () =>{
    const [search, setSearch] = useState('');
    const [feedPost, setFeedPost] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const [check, setCheck] = useState(false);
    const [category, setCategory] = useState('');
    const { currentUser } = useContext(AuthContext);

    //show all post
    useEffect (() => {
        if(currentUser === null){
            Axios.get(`http://localhost:8000/feed/`, {
            }).then((response) => {
                setFeedPost(response.data);
            });
        }else{
            Axios.get(`http://localhost:8000/feed/${currentUser.uid}`, {
            }).then((response) => {
                setFeedPost(response.data);
            });
        }
    }, []);

    //search
    useEffect (() => {
        if(search === ''){
            if(category === ''){
                Axios.get(`http://localhost:8000/feed/${currentUser.uid}`, {
                }).then((response) => {
                    setFeedPost(response.data);
                });
            }else{
                Axios.post("http://localhost:8000/feed/", { 
                    item: search,
                    category: category,
                    uid: currentUser.uid
                }).then((response) => {
                    setFeedPost(response.data);
                })                
            } 
        }else{
            Axios.post("http://localhost:8000/feed/", { 
                item: search,
                category: category,
                uid: currentUser.uid
            }).then((response) => {
                setFeedPost(response.data);
            })
        }
    }, [check]);

    useEffect (() => {
        if(category === ''){
            Axios.get(`http://localhost:8000/feed/${currentUser.uid}`, {
            }).then((response) => {
                setFeedPost(response.data);
            });
        }else{
            Axios.post("http://localhost:8000/feed/", { 
                item: search,
                category: category,
                uid: currentUser.uid
            }).then((response) => {
                setFeedPost(response.data);
            })                
        }
    });

    //add post to favlist
    const addFav = (id) =>{
        // alert("added to favorite list");
        if(currentUser === null){
            window.location.href = `/login`;
        }else{
        Axios.post("http://localhost:8000/fav", { 
            post_id: id,
            uid: currentUser.uid
        })}
        
    };

    const chat = (id) =>{
        // alert("added to favorite list");
        if(currentUser === null){
            window.location.href = `/login`;
        }else{
            Axios.post("http://localhost:8000/room", { 
            post_id: id,
            uid: currentUser.uid
        })
        }
        
    };

    return (
        <Container style={{ marginTop: '-50px' }}>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Group as={Col}>
                    <Form.Label column sm="1">
                        <GrSearch className="icon-large search-icon-pos" style={{ marginLeft: '70px' }} />
                    </Form.Label>
                    <Col sm="3">
                    <Form.Control column type="text" placeholder="What are you looking for?"
                    className="search-bar search-bar-pos"
                    onChange={ (e) => { 
                        setSearch(e.target.value);
                        setCheck(!check); 
                    }}/>
                    </Col>   
                    </Form.Group>
                </Form.Group>

                <Form.Group as={Row}>
                <Col sm="5">
                <Form.Select aria-label="Default select example" 
                    onChange={ (e) => { setCategory(e.target.value) }}>
                        <option value=''>All category</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Health and Beauty">Health and Beauty</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mommy and baby">Mommy and baby</option>
                        <option value="Home and living">Home and living</option>
                        <option value="lifestyle">lifestyle</option>
                        <option value="Kpop">Kpop</option>
                        <option value="Hand craft">Hand craft</option>
                </Form.Select>
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
                                        {val.image !== null ? (
                                            <Card.Img variant="top" src={require(`../../../public_html/uploads/${val.image}`)} />
                                        ):(
                                            <Card.Img variant="top" src={require("../nopic.jpg")} />
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
                                                                    <GrLocation className="icon-sim" style={{ marginTop: '-3px' }} />
                                                                    </Col>
                                                                    <Col xs={1}>
                                                                        : 
                                                                    </Col>
                                                                    <Col xs={8} style={{ marginLeft: '-15px' }}>
                                                                        {val.location}
                                                                    </Col>
                                                                    </Row> 
                                                                </Col>  
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <Row>
                                                                            <Button className="btn-fav" variant="outline-warning"
                                                                            onClick = {() => {addFav(val.post_id)}} >
                                                                            <AiOutlineHeart className="icon-sim" />
                                                                            <span className="fav-sty">fav</span>
                                                                            </Button>
                                                                    </Row>                                                                
                                                                </Col>
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <Row>
                                                                            <Button className="btn-fav" variant="outline-warning"
                                                                            onClick = {() => {chat(val.post_id)}} >
                                                                            <span className="fav-sty">chat</span>
                                                                            </Button>
                                                                    </Row>                                                                
                                                                </Col>
                                                            </Row>
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>
                        )
                            })}
                            {feedPost.length === 1 ? (
                                <>
                                    <Card className="card-trans"></Card>
                                    <Card className="card-trans"></Card>
                                </>
                            ) : (<span></span>)}
                            {feedPost.length === 2 ? (
                                <>
                                    <Card className="card-trans"></Card>
                                </>
                            ) : (<span></span>)}
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