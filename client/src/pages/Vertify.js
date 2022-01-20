import React,{useState} from "react";
import Axios from 'axios'
import { useHistory } from "react-router-dom";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Si1Password } from "react-icons/si";

const Vertify = () => {

    const [code, setcode] = useState("");
    const [sendOtpStatus, setsendOtpStatus] = useState("")

    let urlString = window.location.href; 
    var email;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            email = pair[0];
        }

    const vertify = () => {
        Axios.post('http://localhost:8000/vertify',{
        code: code, 
        email: email 
        }).then((response) => {
            if(response.data.message == "Reset Password") {
                alert(response.data.message);
                window.location.href = `/resetpass?${email}`;
            }else if(response.data.message == "OTP is already expired"){
                alert(response.data.message);
                window.location.reload();
            }else{
                alert(response.data.message);
                window.location.reload();
            }
            }
        )
    };   

    const history = useHistory();
    const back = () =>{ 
        history.push("/sendotp");
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
                            <div class="text-huge-header dash-bottom">Reset password</div>  
                            <div style={{ marginTop: '10%', textAlign: 'center' }}>Please check your email to vertify an OTP</div>                            
                            <InputGroup className="mb-3" style={{ marginTop: '10px' }} >
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderRight:'none', height: '50px', borderRadius: '20px 0px 0px 20px' }}>
                                    <Si1Password style={{ marginLeft: '10px' }} />
                                </InputGroup.Text>
                                <FormControl className="form-control no-border"
                                style={{  borderLeft:'none', borderRadius: '0px 20px 20px 0px' }}
                                placeholder="Please enter an OTP"
                                type="text"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setcode(e.target.value) }}
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
                                onClick={ vertify } >Vertify</Button>
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

export default Vertify;