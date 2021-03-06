import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'
import CreatePost from '../pages/CrePost';
import { Link } from 'react-router-dom';

//import style
import '../custom.scss';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { GrLocation } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { AuthContext } from "../Auth"; 

const MyPost = () =>{
    const [myPost, setMyPost] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const { currentUser } = useContext(AuthContext);

    //get post
    useEffect (() => {
        Axios.get(`http://localhost:8000/mypost/${currentUser.uid}`).then((response) => {
            setMyPost(response.data);
        });
    }, []);

    //delete post
    const deletePost = (post_id) => {
        if(window.confirm("Do you want to delete this post ?")){
            Axios.delete(`http://localhost:8000/mypost/${post_id}`) 
                window.location.reload(false);
        
        }
    };

    const editPost = (post_id) => {
        Axios.get(`http://localhost:8000/editpost/${currentUser.uid}/${post_id}`,{
        }).then (()=>{
            window.location.href = `/editpost?${post_id}`;
        });
    };

    const addPost = () => {
        if(currentUser === null){
          window.location.href = `/login`;
        }else{
          setModalShow(true).then(() => {
            return <Link to="/createpost" />
          })
        }
    }

    return (
        <div className="myPost" style={{ marginTop: '30px' }}>
            <h2 className="text-huge-header" style={{ textAlign: 'center' }}>My Post</h2>
            {myPost.length > 0 ? (
                <Container className="justify-content-md-center">
                {myPost.map((val)=> {
                    return (

                        <Card className="card-mypost pos-center" style={{ marginTop: '30px' }}>
                            <Row>
                                <Col xs={4}>
                                {val.image.length>1?(
                                        <Card.Img variant="top" src={require(`../../../public_html/uploads/${val.image}`)} 
                                            style={{ width: '210px', height: '210px', margin: '10px'}}/>):(
                                        <Card.Img variant="top" src={require(`../nopic.jpg`)} 
                                            style={{ width: '210px', height: '210px', margin: '10px'}}/>
                                )}
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
            ) : (
                <>
                <div style={{ textAlign: 'center', marginTop: '190px' }}>
                    <h3>You don't have any post yet</h3>
                    <h5 style={{ marginTop: '20px', color: 'navy' }}
                    onClick={ addPost }>
                        want to create new post?
                    </h5>
                    <CreatePost
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
                </>
            )}
        </div>
    );
};

export default MyPost;
