import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';
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
                                        <Col style={{ marginTop: '10px', marginLeft: '-60px'}}>
                                            <div>
                                                <h1> {val.firstname}     {val.lastname}</h1> 
                                                <h5 style={{ marginTop: '10px'}}> Email : {val.email}</h5>  
                                                <h5 style={{ marginTop: '10px'}}> Mobile : {val.mobile}</h5>  
                                                <h5 style={{ marginTop: '10px'}}> Address : {val.address}</h5>         
                                            </div>
                                        </Col>
                                        <Col xs={3} style={{ marginTop: '10px', marginLeft: '40px'}}>
                                            <Link  to="/editprofile">
                                                <Button className="btn-login" > 
                                                    <AiFillEdit className="icon-sim" style={{ marginRight: '8px' }} />
                                                    Edit 
                                                </Button>
                                            </Link>
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