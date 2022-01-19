import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';

//import style
import '../custom.scss';
import { Card, Button, Row, Col, Container, Image } from 'react-bootstrap';
import { GrLocation } from "react-icons/gr";
import { IoCloseCircle } from "react-icons/io5";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const MyPost = () =>{
    const [myPost, setMyPost] = useState([]);

    //get post
    useEffect (() => {
        Axios.get("http://localhost:8000/mypost").then((response) => {
            setMyPost(response.data);
        });
    }, []);

    //delete post
    const deletePost = (post_id) => {
        if(window.confirm("Do you want to delete this post ")){
            Axios.delete(`http://localhost:8000/mypost/${post_id}`);
        }
    };

    const editPost = (post_id) => {
        Axios.get(`http://localhost:8000/editpost/${post_id}`,{
        })
        .then (()=>{
            window.location.href = `/editpost?${post_id}`;
        });
    };

    return (
        <div className="myPost" style={{ marginTop: '30px' }}>
            <h2 className="text-huge-header" style={{ textAlign: 'center' }}>My Post</h2>

            <Container className="justify-content-md-center">
                {myPost.map((val)=> {
                    return (
                        <Card className="card-mypost pos-center" style={{ marginTop: '20px' }}>
                            <Row>
                                <Col xs={4}>
                                    <Image avariant="left" src="http://localhost:8000/<%=data[0].image%>"
                                    style={{ width: '210px', height: '210px', margin: '10px'}}/>
                                </Col>
                                <Col xs={5}>
                                        <h1>{val.post_name}</h1>
                                        <Card.Text style={{ height: '100px'}}>{val.description}</Card.Text>
                                            <Col style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                <GrLocation className="icon-sim" /> : {val.location}
                                            </Col>     
                                </Col>
                                <Col xs={2} style={{ marginTop: '12px', marginRight: '-40px'}}>
                                    <Row>
                                        <Button onClick={() => {editPost(val.post_id)}}> Edit </Button>
                                    </Row>
                                        {/* <button onClick={() => {editPost(val.post_id)}}> <Link  to="/editpost" > Edit </Link> </button> */}
                                    <Row>
                                        <Button   Button onClick={() => {deletePost(val.post_id)}}> Delete </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    ); 
                })}
                <div style={{ marginTop: '100px' }}></div>
            </Container>
        </div>
    );
};

export default MyPost;

{/* <div className="myPostCard">
                            <h3> Name : {val.post_name} </h3> 
                            <h5> Description : </h5>  
                            <h6> {val.description} </h6>
                            <h6> Location : {val.location}  </h6>
                            <img alt="User Pic" src="http://localhost:8000/<%=data[0].image%>" class="img-circle img-responsive"></img>

                            <button onClick={() => {editPost(val.post_id)}}> Edit </button>
                            <button onClick={() => {editPost(val.post_id)}}> <Link  to="/editpost" > Edit </Link> </button> 
                            <button onClick={() => {deletePost(val.post_id)}}> Delete </button>
                            
                        </div> */}
