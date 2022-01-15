
import React, {useState,useEffect } from "react";
import Axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaUserAlt, FaKey } from "react-icons/fa";
import '../../node_modules/font-awesome/css/font-awesome.min.css';

function Login (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
        

    Axios.defaults.withCredentials = true;

    const login = () => {
        console.log(email)
        console.log(password)
        Axios.post('http://localhost:8000/login',{
        email: email,   
        password: password
        }).then((response) => {
        if(response.data.message) {
            setLoginStatus(response.data.message);
        }else{
            setLoginStatus(response.data[0].firstname + " " +response.data[0].lastname);
        }
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:8000/login").then((response) => {                  
            if(response.data.loggedIn === true) {
            setLoginStatus(response.data.user[0].firstname + " " +setLoginStatus(response.data.user[0].lastname));
            }
        });
    }, []);

        

    const history = useHistory();
    const sendotp = () =>{ 
        history.push("/sendotp");
    };

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
                            <InputGroup className="mb-3" style={{ marginTop: '10%' }} >
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
                            <Link to='/sendotp' className="link-nodec">
                            <div className="text-offer">Forgot your password?</div>
                            </Link>
                            <div className="dash-bottom" style={{ paddingTop: '8%' }}></div>
                            <Col style={{ textAlign: 'end', marginTop: '8%' }}>
                            <Button className="btn-login"
                            onClick={ login } >Log in</Button>
                            </Col>
                            <Row style={{ paddingTop: '15%', textAlign: 'center' }}>
                                <Col>Do not have an account yet?</Col>
                            </Row>
                            <Row style={{ paddingTop: '8%', textAlign: 'center' }}>
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
        <div>{loginStatus}</div>
    </Container>
    );
    }
export default Login;
