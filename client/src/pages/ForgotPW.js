import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import firebaseConfig from "../config";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaUserAlt } from "react-icons/fa";

const ResetPWReq = () => {

    const [email, setEmail] = useState("");

    const sendotp = () => {
        try{
            firebaseConfig.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("reset link has been sent to your email!")
            });
        }catch(error){
            alert(error)
        }
    };   

    const history = useHistory();
    const back = () =>{ 
        history.push("/login");
    }

    return (
        <Container className="login-bg">
        <Row>
                <Col style={{ paddingTop: '25vh', paddingLeft: '10%' }}>
                    <div class="login-banner">Love</div>
                    <div class="login-banner">is Sharing.</div>
                </Col>
                <Col>
                    <Card className="reset-card">
                        <div class="card-content">
                        <Row style={{ textAlign: 'center' }}>
                            <div className="text-mid-header">Forgot your password?</div>  
                            <div className="dash-bottom" style={{ marginTop: '10px' }}></div>
                            <div style={{ marginTop: '10%', textAlign: 'center' }}>Enter your email to reset password</div>                            
                            <InputGroup className="mb-3" style={{ marginTop: '10px' }} >
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
                            </Row>
                            <Row style={{ textAlign: 'center' }}>
                                <Col style={{ textAlign: 'end', marginTop: '8%' }}>
                                <Button className="btn-delete"
                                onClick={ back } >Cancel</Button>
                                </Col>
                                <Col style={{ textAlign: 'end', marginTop: '8%' }}>
                                <Button className="btn-login"
                                onClick={ sendotp } >Reset</Button>
                                </Col>
                                <Col xs={1}></Col>
                            </Row>
                            <Row style={{ paddingTop: '15%', textAlign: 'center' }}>
                                <Col className="text-credit">powerded by Saoluck 2022</Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPWReq;