import React,{ useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Image, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri"

const Feed = () =>{
    const [search, setSearch] = useState('');
    const [feedPost, setFeedPost] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const [check, setCheck] = useState(false);
    const [category, setCategory] = useState('');
    const [catStyle, setCatStyle] = useState('0');
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
        if(currentUser === null){
            if(search === ''){
                if(category === ''){
                    Axios.get(`http://localhost:8000/feed/`, {
                    }).then((response) => {
                        setFeedPost(response.data);
                    });
                }else{
                    Axios.post("http://localhost:8000/feed/", { 
                        item: search,
                        category: category
                    }).then((response) => {
                        setFeedPost(response.data);
                    })                
                } 
            }else{
                Axios.post("http://localhost:8000/feed/", { 
                    item: search,
                    category: category
                }).then((response) => {
                    setFeedPost(response.data);
                })
            }
        }else{
            if(search === ''){
                if(category === ''){
                    Axios.get(`http://localhost:8000/feed/${currentUser.uid}`, {
                    }).then((response) => {
                        setFeedPost(response.data);
                    });
                }else{
                    Axios.post("http://localhost:8000/feed/user", { 
                        item: search,
                        category: category,
                        uid: currentUser.uid
                    }).then((response) => {
                        setFeedPost(response.data);
                    })                
                } 
            }else{
                Axios.post("http://localhost:8000/feed/user", { 
                    item: search,
                    category: category,
                    uid: currentUser.uid
                }).then((response) => {
                    setFeedPost(response.data);
                })
            }
        }
    }, [check]);

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
        if(currentUser === null){
            window.location.href = `/login`;
        }else{
            Axios.post("http://localhost:8000/room", { 
            post_id: id,
            uid: currentUser.uid
        })
        window.location.href = `/chatroom`;
        }
    };

    function catOnClick(cat){
        if(category === cat){
            setCategory('')
        }else{
            setCategory(cat)
        }
    } 

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
            </Form>
            <Row>                
                <Col style={{ textAlign: "center" }} >
                    <Button value="Fashion" 
                    className={`${
                        catStyle === '1' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '1'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('1')
                        }
                    }}>
                        Fashion
                    </Button>
                    <Button value="Health and Beauty" 
                    className={`${
                        catStyle === '2' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '2'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('2')
                        }
                    }}>
                        Health and Beauty
                    </Button>
                    <Button value="Electronics" 
                    className={`${
                        catStyle === '3' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '3'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('3')
                        }
                    }}>
                        Electronics
                    </Button>
                    <Button value="Mommy and baby" 
                    className={`${
                        catStyle === '4' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '4'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('4')
                        }
                    }}>
                        Mommy and baby
                    </Button>
                    <Button value="Home and living" 
                    className={`${
                        catStyle === '5' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '5'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('5')
                        }
                    }}>
                        Home and living
                    </Button>
                    <Button value="lifestyle" 
                    className={`${
                        catStyle === '6' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '6'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('6')
                        }
                    }}>
                        lifestyle
                    </Button>
                    <Button value="Kpop" 
                    className={`${
                        catStyle === '7' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '7'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('7')
                        }
                    }}>
                        Kpop
                    </Button>
                    <Button value="Hand craft" 
                    className={`${
                        catStyle === '8' ? "btn-cat-select" : "btn-cat"
                    }`}
                    onClick={(e)=>{
                        catOnClick(e.target.value); 
                        setCheck(!check); 
                        if(catStyle === '8'){
                            setCatStyle('0')
                        }else{
                            setCatStyle('8')
                        }
                    }}>
                        Hand craft
                    </Button>
                </Col>   
            </Row>
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
                                                                    <AiOutlineHeart className="icon-fav"  style={{ marginTop: '5px' }}
                                                                    onClick = {() => {addFav(val.post_id)}} />                                                             
                                                                </Col>
                                                                <Col style={{ marginTop: '12px', marginRight: '-40px'}}>
                                                                    <RiChat1Line className="icon-chat"  style={{ marginTop: '5px' }}
                                                                    onClick = {() => {chat(val.post_id)}} />
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