import React,{ useState, useEffect } from "react";
import Axios from 'axios'
import firebaseConfig from "../config";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Row, Col, Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { MdError } from "react-icons/md";
import { FaKey } from "react-icons/fa";

function useQuery(){
    const location = useLocation()
    return new URLSearchParams(location.search);
}

const ResetPass = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");
    const [check, setCheck] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [IsError, setIsError] = useState("");    

    const query = useQuery();

    const history = useHistory();
    const back = () =>{ 
        history.push("/login");
    }

    const resetPassword = () => {
        try{
            if(newPassword !== confirmPassword){
                alert("Password does not match!")
            }else{
            firebaseConfig.auth().confirmPasswordReset(query.get('oobCode'), newPassword).then(() => {
                alert('change password succesfully')
                history.push("/login");
            });
            }

        }catch(error){
            alert(error)
        }
        
    }

    useEffect(() =>{
        if(newPassword !== confirmPassword){
            setIsError("Password does not match!");
            setAlertShow(true);
        }else{
            setIsError("");
            setAlertShow(false);
        }
    }, [check]);

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
                            <div style={{ marginTop: '10%', textAlign: 'center' }}>Enter your new password</div>                            
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
                                onChange={(e) => { setNewPassword(e.target.value) }}
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
                                onClick={ resetPassword } >Reset</Button>
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