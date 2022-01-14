
import React, {useState,useEffect } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';

//import style
import '../custom.scss';
import { Row, Col, Container, Image, Form, Button } from 'react-bootstrap';
import { HiUser } from "react-icons/hi";
import { MdError } from "react-icons/md";


function Register (){
    const [IsError, setIsError] = useState("");         
    const [emailReg, setEmailReg] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [moblie, setMoblie] = useState("");
    const [address, setAddress] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [alertShow, setAlertShow] = useState(false);

    Axios.defaults.withCredentials = true;

    const register = () => {
        console.log(passwordReg)
        console.log(confirmPassword)
        if(passwordReg !== confirmPassword){
            alert("Confirm Password is not match with password !");
        }else{ 
            Axios.post("http://localhost:8000/register", {
                email: emailReg, 
                firstname: firstname, 
                lastname: lastname, 
                password: passwordReg,
                moblie: moblie, 
                address: address
        }).then((response) => {
            console.log(response)
            alert("successfully");

        });
        }
    };
    

    return (
        <center>
        <div className="App Container">
        <div className="register">
            <h1> Register </h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                email:
                </label>
                <input
                type="text"
                name="emailReg" 
                required
                className="form-controll"
                onChange={(e) => {
                    setEmailReg(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Firstname :
                </label>
                <input
                type="text"
                name="firstname" 
                required
                className="form-controll"
                onChange={(e) => {
                    setFirstname(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Lastname :
                </label>
                <input
                type="text"
                name="lastname" 
                required
                className="form-controll"
                onChange={(e) => {
                    setLastname(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Moblie :
                </label>
                <input
                type="text"
                name="modlie" 
                required
                className="form-controll"
                onChange={(e) => {
                    setMoblie(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Address :
                </label>
                <input
                type="text"
                name="address" 
                required
                className="form-controll"
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Password :
                </label>
                <input
                type="password"
                name="passwordReg" 
                required
                className="form-controll"
                onChange={(e) => {
                    setPasswordReg(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Confirm Password :
                </label>
                <input
                type="password" 
                name="confirmPassword" 
                required
                className="form-controll"
                onChange={(e) =>{ 
                    setConfirmPassword(e.target.value)
                }}
                ></input>
                <br />
                <p1>{IsError}</p1>
            </div>
            <br />
            <button class="btn btn-success" onClick={register}>Register</button>
        </div>
        </div>
    </center>

    useEffect(() =>{
        if(passwordReg !== confirmPassword){
            setIsError("Password does not match!");
            setAlertShow(true);
        }else{
            setIsError("");
            setAlertShow(false);
        }
    }, [check]);


    
    return (
        <body class="bg-color">
        <Container >
            <Row style={{ marginTop: '4%', marginLeft: '1%' }}>
                <Col>
                    <div class="text-banner">Love</div>
                    <div class="text-banner">is Sharing.</div>
                    <Image src={ require('../register.png') } 
                    style={{ width: '500px', marginTop: '20%' }}/>
                </Col>
                <Col>
                    <Row style={{ borderBottom: '2px dashed lightgray' }}>
                        <Col className="text-sub-banner">Register</Col>
                        <Col style={{ color: 'darkblue', textAlign: 'end', paddingTop: '6%' }}>
                            <Link to="/login" style={{ textDecoration: 'none', color: 'darkblue' }}>Already a member?</Link>
                            <HiUser className="icon-sim" style={{ marginBottom: '5px' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '5%', borderBottom: '2px dashed lightgray', paddingBottom: '7%' }}>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>First name</Col>
                            <Col>Last name</Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                                <Form.Control type="text" placeholder="First name" 
                                onChange={(e) => { setFirstname(e.target.value) }}/>
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Last name" 
                                onChange={(e) => { setLastname(e.target.value) }}/>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '4%' }}>
                            <Col>Email</Col>
                            <Col>Mobile</Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                                <Form.Control type="email" placeholder="email address" 
                                onChange={(e) => { setEmailReg(e.target.value) }} />
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Mobile number"
                                onChange={(e) => { setMoblie(e.target.value) }}  />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '4%' }}>
                            <Col>Address</Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                                <Form.Control as="textarea" rows={2} style={{ resize: 'none' }} placeholder="Address" 
                                onChange={(e) => { setAddress(e.target.value) }} />
                            </Col>
                        </Row>
                    </Row>
                    <Row style={{ marginTop: '5%', borderBottom: '2px dashed lightgray', paddingBottom: '7%' }}>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>Password</Col>
                            <Col>Confirm password</Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                                <Form.Control type="password" placeholder="Password" 
                                onChange={(e) => { setPasswordReg(e.target.value) }} />
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="Confirm your password" 
                                onChange={(e) => { 
                                    setConfirmPassword(e.target.value);
                                    setCheck(!check);
                                }} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col></Col>
                            <Col className="text-error">
                                {alertShow === false ? (
                                    <span></span>
                                    ) : (
                                        <MdError className="icon-sim" />
                                    )}
                                {IsError}
                            </Col>
                        </Row>
                    </Row>
                    <Row style={{ marginTop: '5%' }}>
                        <Col style={{  textAlign: 'end' }}>
                        <Button style={{ backgroundColor: 'darkblue', border: 'none', width: '15%' }}
                        onClick={ register } >Register</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </body>
    );
}

export default Register;
