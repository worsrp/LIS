import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Card, Button, Container, Image, Row, Col } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";

const Profile = () =>{
    const [profile, setProfile] = useState([]);

    const { currentUser } = useContext(AuthContext);

    useEffect (() => {
        Axios.get(`http://localhost:8000/profile/${currentUser.uid}`).then((response) => {
            setProfile(response.data);
        });
    }, []);


    return (
        <>
        {currentUser !== null ?(
            <>
                        <div>
                            {profile.map((val) => {
                                return(
                                <> 
                                    <Container>
                                    <Row style={{ marginRight: '20px'}} >
                                        <Image src={require(`../profilebanner.png`)} />
                                    </Row>
                                    <Row> 
                                    <Col xs={4}>
                                        { val.image.length > 1 ?
                                        <Image src={require(`../../../public_html/uploads/${val.image}`)}
                                        roundedCircle className="profile-pic" />
                                        : <Image src={require(`../nopic.jpg`)}
                                        roundedCircle className="profile-pic" />}
                                    </Col>
                                    <Col>
                                    <Row>
                                        <Col className="text-main-body" style={{ marginTop: '10px', marginLeft: '-60px'}}>
                                            <Row>
                                                <Col className="text-huge-header">{val.firstname}     {val.lastname}</Col>
                                            </Row>
                                            <Row style={{ marginTop: '10px', marginLeft: '-90px'}}>
                                                <Col xs={3} style={{ textAlign: 'end' }}>Email :</Col>
                                                <Col>{val.email}</Col>
                                            </Row>
                                            <Row style={{ marginTop: '10px', marginLeft: '-90px'}}>
                                                <Col xs={3} style={{ textAlign: 'end' }}>Mobile :</Col>
                                                <Col>{val.mobile}</Col>
                                            </Row>
                                            <Row style={{ marginTop: '10px', marginLeft: '-90px'}}>
                                                <Col xs={3} style={{ textAlign: 'end' }}>Address :</Col>
                                                <Col xs={8}>{val.address}</Col>
                                            </Row>
                                        </Col>
                                        <Col xs={3} style={{ marginTop: '10px', marginLeft: '40px'}}>
                                                <Button className="btn-login" onClick={() => {
                                                        window.location.href = `/editprofile`;
                                                }}> 
                                                    <AiFillEdit className="icon-sim" style={{ marginRight: '8px' }} />
                                                    Edit 
                                                </Button>
                                        </Col>
                                    </Row>
                                    </Col>
                                    </Row>
                                    </Container>
                                </>
                                )
                            })}
                        </div>
            </>
        ):(
            <h1>Please Login</h1>
        )}
        </>
    );

};

export default Profile;