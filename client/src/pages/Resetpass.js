import React,{ useState, useEffect } from "react";
import Axios from 'axios'
import firebaseConfig from "../config";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { MdError } from "react-icons/md";
import { FaKey } from "react-icons/fa";

const ResetPass = () => {

    const [password, setPass] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");
    const [check, setCheck] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [IsError, setIsError] = useState("");     

    //const { currentUser } = useContext(AuthContext);

    let urlString = window.location.href; 
    var email;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            email = pair[0];
        }
    const setPassword = () => {
        if(password !== confirmPassword){
            alert("Confirm Password is not match with password !");
            window.location.reload();
        }else{
            console.log(password);
            try{
                firebaseConfig.auth().confirmPasswordReset()
            }catch(error){
                alert(error);
            }
            Axios.post(`http://localhost:8000/resetpass?${email}`, { 
            email : email,
            password: password
        }).then(() => {
            alert("successful reset password");
            window.location.href = '/login';
        })
        } 
    }

    useEffect(() =>{
        if(password !== confirmPassword){
            setIsError("Password does not match!");
            setAlertShow(true);
        }else{
            setIsError("");
            setAlertShow(false);
        }
    }, [check]);

    const history = useHistory();
    const back = () =>{ 
        history.push("/login");
    }
    return (
        <>
        <Container className="login-bg">
        <Row>
                <Col style={{ paddingTop: '25vh', paddingLeft: '10%' }}>
                    <div class="login-banner">Love</div>
                    <div class="login-banner">is Sharing.</div>
                </Col>
                <Col>
                    <Card className="reset-card" style={{marginTop: '8vh'}}>
                        <div class="card-content">
                        <Row style={{ textAlign: 'center' }}>
                            <div class="text-huge-header dash-bottom">Reset password</div>  
                            <div style={{ marginTop: '10%', textAlign: 'center' }}>Enter your email to reset password</div>                            
                            <InputGroup className="mb-3" style={{ marginTop: '10px' }} >
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderRight:'none', height: '50px', borderRadius: '20px 0px 0px 20px' }}>
                                    <FaKey style={{ marginLeft: '10px' }} />
                                </InputGroup.Text>
                                <FormControl className="form-control no-border"
                                style={{  borderLeft:'none', borderRadius: '0px 20px 20px 0px' }}
                                placeholder="new password"
                                type="password"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setPass(e.target.value) }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" style={{ marginTop: '10px' }} >
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderRight:'none', height: '50px', borderRadius: '20px 0px 0px 20px' }}>
                                    <FaKey style={{ marginLeft: '10px' }} />
                                </InputGroup.Text>
                                <FormControl className="form-control no-border"
                                style={{  borderLeft:'none', borderRadius: '0px 20px 20px 0px' }}
                                placeholder="confirm new password"
                                type="password"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setConfirmPass(e.target.value); setCheck(!check); }}
                                />
                            </InputGroup>
                            </Row>
                            <Row style={{ marginLeft: '1%'}}>
                            <Col className="text-error">
                                {alertShow === false ? (
                                    <div></div>
                                    ) : (
                                        <MdError className="icon-sim" />
                                    )}
                                {IsError}
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center' }}>
                                <Col style={{ textAlign: 'end', marginTop: '8%' }}>
                                <Button className="btn-delete"
                                onClick={ back }>Cancel</Button>
                                </Col>
                                <Col style={{ textAlign: 'end', marginTop: '8%' }}>
                                <Button className="btn-login"
                                onClick={ setPassword } >Reset</Button>
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
        </>
    );
};

export default ResetPass;