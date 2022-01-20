import React, {useState, useContext } from "react";
import Axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseConfig from "../config";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaUserAlt, FaKey } from "react-icons/fa";

function Login (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {

        try{

            firebaseConfig.auth().signInWithEmailAndPassword(email, password);

        }catch(error){
            alert(error);
        }
    };

    const history = useHistory();
    const sendotp = () =>{ 
        history.push("/sendotp");
    };


    const { currentUser } = useContext(AuthContext);

    if (currentUser !== null){
        return <Redirect to="feed" />;
    }
        
    return (
        <Container className="login-bg">
            <Row>
                <Col style={{ paddingTop: '25vh', paddingLeft: '10%' }}>
                    <div class="login-banner">Love</div>
                    <div class="login-banner">is Sharing.</div>
                </Col>
                <Col>
                    <Card className="login-card">
                        <div class="card-content">
                            <div class="text-sub-banner dash-bottom">Hello</div>                            
                            <InputGroup className="mb-3" style={{ marginTop: '5%' }} >
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderRight:'none', height: '50px', borderRadius: '20px 0px 0px 20px' }}>
                                    <FaUserAlt style={{ marginLeft: '10px' }} />
                                </InputGroup.Text>
                                <FormControl className="form-control no-border"
                                style={{  borderLeft:'none', borderRadius: '0px 20px 20px 0px' }}
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" >
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderRight:'none', height: '50px', borderRadius: '20px 0px 0px 20px' }}>
                                    <FaKey style={{ marginLeft: '10px' }} />
                                </InputGroup.Text>
                                <FormControl className="form-control no-border"
                                style={{  borderLeft:'none', borderRadius: '0px 20px 20px 0px' }}
                                placeholder="Password"
                                type="password"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </InputGroup>
                            <div className="dash-bottom" style={{ paddingTop: '1%' }}></div>
                            <Row style={{ marginTop: '5%' }}>
                                <Col xs={7} style={{ marginTop: '4%'}}>
                                    <Link to='/sendotp' className="link-nodec">
                                    <div className="text-offer">Forgot your password?</div>
                                    </Link>
                                </Col>
                                <Col style={{ textAlign: 'end' }}>
                                <Button className="btn-login"
                                onClick={ login } >Log in</Button>
                                </Col>
                            </Row>
                            <Row style={{ paddingTop: '15%', textAlign: 'center' }}>
                                <Col className="text-body">Do not have an account yet?</Col>
                            </Row>
                            <Row style={{ paddingTop: '3%', textAlign: 'center' }}>
                                <Link to="/register" className="link-nodec">
                                    <Col className="text-offer">Register here</Col>
                                </Link>
                            </Row>
                            <Row style={{ paddingTop: '15%', textAlign: 'center' }}>
                                <Col className="text-credit">powerded by Saoluck 2022</Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
    </Container>
    )};
export default Login;
