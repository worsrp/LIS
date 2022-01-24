import React, {useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseConfig from "../config";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaUserAlt, FaKey } from "react-icons/fa";
import { RiEye2Line } from 'react-icons/ri';

function Login (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try{

            await firebaseConfig.auth().signInWithEmailAndPassword(email, password);

        }catch(error){
            let message = 'An error has occured!';

            if (error.code === 'auth/invalid-email') {
                message = 'Invalid email address!';
            } else if (error.code === 'auth/user-not-found') {
                message = 'No account with such credentials!';
            } else if (error.code === 'auth/wrong-password') {
                message = 'Incorrect password! Try again.';
            }
            alert(message);
        }
    };

    const history = useHistory();
    const forgotPassword = () =>{ 
        history.push("/forgotpassword");
    };


    const { currentUser } = useContext(AuthContext);

    if (currentUser !== null){
        window.location.href = `/`;
    }
        
    function mouseoverPass() {
        var obj = document.getElementById('myPassword');
        obj.type = "text";
    }

    function mouseoutPass() {
        var obj = document.getElementById('myPassword');
        obj.type = "password";
    }

    return (
        <Container className="login-bg">
            <Row>
                <Col style={{ paddingTop: '25vh', paddingLeft: '10%' }}>
                    <div className="login-banner">Love</div>
                    <div className="login-banner">is Sharing.</div>
                </Col>
                <Col>
                    <Card className="login-card">
                        <div className="card-content">
                            <div className="text-sub-banner dash-bottom">Hello</div>                            
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
                                style={{  borderLeft:'none', borderRight:'none'}}
                                placeholder="Password"
                                type="password"
                                aria-describedby="basic-addon1"
                                id="myPassword"
                                onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderLeft:'none', height: '50px', borderRadius: '0px 20px 20px 0px' }}>
                                    <RiEye2Line style={{ marginLeft: '10px' }} onMouseOver={mouseoverPass} onMouseOut={mouseoutPass} />
                                </InputGroup.Text>
                            </InputGroup>
                            <div className="dash-bottom" style={{ paddingTop: '1%' }}></div>
                            <Row style={{ marginTop: '5%' }}>
                                <Col xs={7} style={{ marginTop: '4%'}}>
                                    <Link to='/forgotpassword' className="link-nodec">
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
