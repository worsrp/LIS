import React,{ useState, useEffect, useContext } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Image, CardGroup } from 'react-bootstrap';
import { AuthContext } from "../Auth";

const History = () =>{
    const [historyPost, setHistoryPost] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect (() => {
        Axios.get(`http://localhost:8000/history/${currentUser.uid}`, {
        }).then((response) => {
            setHistoryPost(response.data);
        });
    })

    return (
        <div>
            <h2 className="text-huge-header" style={{ textAlign: 'center' }}>History</h2>
            {historyPost.map((val)=> {
               return(
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
                                    <Row style={{ height: '25%'}}>
                                        <Col>
                                            <Card.Title className="text-huge-header" style={{ marginTop: '10px' }}>{val.post_name}</Card.Title>
                                        </Col>
                                        
                                    </Row>  
                                    <Row>
                                        <Col>
                                            <Card.Text className="text-sub-header">
                                                Category : {val.category}</Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Card.Text className="text-sub-header" >
                                            Stuff's description : 
                                        </Card.Text>
                                        <Card.Text>
                                            {val.description}
                                        </Card.Text>
                                    </Row>  

                                    <Row>
                                            <Col className="text-sub-header" style={{ marginTop: '20px'}}>
                                                Share with : {val.firstname}
                                            </Col>

                                            <Col className="text-sub-header" style={{ marginTop: '20px'}}>
                                                Date : {val.date}
                                            </Col>      
                                    </Row>
                                </Col>
                                
                            </Row>
                        </Card>
                 )
            })
            }
        </div>
    );
};

export default History;