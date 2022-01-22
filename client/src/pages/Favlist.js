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
            window.location.reload(false);
        }
    };

    return (
        <>
        <Row className="justify-content-md-center" style={{ marginTop: '-48px' }}>
                <Col style={{ textAlign: 'center' }}>
                    <h2 className="text-mid-header">My favorite post</h2>
                </Col>
            </Row>
        <Container className="favList" style={{ marginTop: '-10px'}}>
            <Row className="justify-content-md-center">
            <Col md="auto" >
                {favPost.length > 3 && start !== 0 ? (
                    <FiArrowLeft className="icon-arrow" style={{ height: '65vh' }} 
                    onClick={ () => { 
                        if(start !== 0){
                            setStart(start-1); setEnd(end-1); 
                        }
                    }}/>
                ):( <FiArrowLeft className="icon-arrow" style={{ height: '65vh', color: 'white' }} />)}
                </Col>
                <Col xs lg="10" >
                    <CardGroup>
                    {favPost.slice(start,end).map((val)=> {
                        return(
                                    <Card className="card-feed">
                                        {val.image.length>1?(
                                        <Card.Img variant="top" src={require(`../../../public_html/uploads/${val.image}`)} />):(
                                        <Card.Img variant="top" src={require("../nopic.jpg")} />
                                        )}
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
                                                                    <Button className="btn-remove" style={{ marginLeft: '-30px'}}
                                                                    onClick={() => {deleteFav(val.post_id)}} >
                                                                    <IoCloseCircle className="icon-sim" />
                                                                        remove
                                                                    </Button>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>
                        )
                            })}
                            {favPost.length === 1 ? (
                                <>
                                    <Card className="card-trans"></Card>
                                    <Card className="card-trans"></Card>
                                </>
                            ) : (<span></span>)}
                            {favPost.length === 2 ? (
                                <>
                                    <Card className="card-trans"></Card>
                                </>
                            ) : (<span></span>)}
                    </CardGroup>
                </Col>
                <Col md="auto">
                    {favPost.length > 3 && end !== favPost.length ? (
                        <FiArrowRight className="icon-arrow" style={{ height: '65vh' }} 
                        onClick={ () => {
                            if(end !== favPost.length){
                                setStart(start+1); setEnd(end+1); 
                            }
                        }}/>
                    ):( <FiArrowRight className="icon-arrow" style={{ height: '65vh', color: 'white' }}/> )}
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Favlist;