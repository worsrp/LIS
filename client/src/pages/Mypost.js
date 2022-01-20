import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';

//import style
import '../custom.scss';
import { Card, Button, Row, Col, Container, Image } from 'react-bootstrap';
import { GrLocation } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { AuthContext } from "../Auth"; 

const MyPost = () =>{
    const [myPost, setMyPost] = useState([]);
    const { currentUser } = useContext(AuthContext);

    //get post
    useEffect (() => {
        Axios.get("http://localhost:8000/mypost",{
            uid : currentUser.uid 
        }).then((response) => {
            setMyPost(response.data);
        });
    }, []);

    //delete post
    const deletePost = (post_id) => {
        if(window.confirm("Do you want to delete this post ?")){
            Axios.delete(`http://localhost:8000/mypost/${post_id}`,{
                uid : currentUser.uid 
            });
            window.location.reload();
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

                        <Card className="card-mypost pos-center" style={{ marginTop: '30px' }}>
                            <Row>
                                <Col xs={4}>
                                    <Image avariant="left" src="http://localhost:8000/<%=data[0].image%>"
                                    style={{ width: '210px', height: '210px', margin: '10px'}}/>
                                </Col>
                                <Col xs={5}>
                                    <Row style={{ height: '75%'}}>
                                        <Col>
                                            <Card.Title className="text-huge-header" style={{ marginTop: '10px' }}>{val.post_name}</Card.Title>
                                            <Card.Text className="text-sub-header">
                                                <BiCategory className="icon-sim" style={{ marginBottom: '3px'}} />
                                                {val.category}
                                            </Card.Text>
                                            <Card.Text >{val.description}</Card.Text>
                                        </Col>
                                    </Row>    
                                    <Row>
                                            <Col className="text-sub-header" style={{ marginTop: '20px', marginLeft: '-10px'}}>
                                                <GrLocation className="icon-sim" style={{ marginBottom: '6px' }} /> 
                                                {val.location}
                                            </Col>     
                                    </Row>
                                </Col>
                                <Col xs={2} style={{ marginTop: '8%', marginLeft: '20px'}}>
                                    <Row>
                                            <Button className="btn-edit" onClick={() => {editPost(val.post_id);}}>
                                            <AiFillEdit className="icon-sim" style={{ marginRight: '8px' }} />
                                                Edit 
                                            </Button>
                                    </Row>
                                        {/* <button onClick={() => {editPost(val.post_id)}}> <Link  to="/editpost" > Edit </Link> </button> */}
                                    <Row style={{ marginTop: '10px' }}>
                                        <Button className="btn-delete" onClick={() => {deletePost(val.post_id)}}>
                                            <AiFillDelete className="icon-sim" style={{ marginRight: '2px' }} />
                                            Delete 
                                        </Button>
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
