import React, {useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from "../Auth";
import firebaseConfig from "../config";
import validator from 'validator';

//import style
import '../custom.scss';
import { Row, Col, Container, Image, Form, Alert, 
        Button, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { HiUser } from "react-icons/hi";
import { MdError } from "react-icons/md";
import { RiEye2Line } from 'react-icons/ri';
import { FiAlertCircle } from 'react-icons/fi';


function Register (){
    const [IsError, setIsError] = useState("");         
    const [email, setemail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [newUser, setNewUser] = useState(null);

    const [errors, setErrors] = useState({});

    //validateion---------------------------------------
/*  const handleChange = (e) =>{
        setemail({
            ...email,
            [e.target.email]: e.target.email,
        })
    }
*/
    const register = (e) => {    
        if(email === null){
            return <Redirect to="/login"></Redirect>
        }

        // validation----------------------------------------
        e.preventDefault();

        //handleChange(e);
        
        if(firstname == "" || lastname =="" || mobile=="" || address=="" || password ==""){

        //setErrors(validation([firstname,lastname,mobile,address,password]));
        alert("Please input the information !!!");
        }else if(password !== confirmPassword){
            alert("Confirm Password is not match with password !");
        }else if(password.length < 6){
            alert("Password must be more than 6 characters");
        }else if(!validator.isEmail(email)){
            alert("Email is invalid!");
        }else if(!validator.isMobilePhone(mobile)){
            alert("Mobile number is invalid!");
        }else{ 

            try{

                firebaseConfig.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    userConnected(response)
                }).then(() => {
                    window.location.href = `/`;
                });
    
    
            }catch(error){
                alert(error);
            }

        };
    }

    async function userConnected (res){
        const connectID = await res.user;
        Axios.post("http://localhost:8000/register", {
                        email: email, 
                        firstname: firstname, 
                        lastname: lastname, 
                        password: password,
                        mobile: mobile, 
                        address: address,
                        uid: connectID.uid
        })
        setNewUser(res.user);
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

    const { currentUser } = useContext(AuthContext);
    
    if (currentUser !== null || newUser !== null){
        return <Redirect to="/feed" />;
    }

    function mouseoverPass() {
        var obj = document.getElementById('myPassword');
        obj.type = "text";
    }

    function mouseoutPass() {
        var obj = document.getElementById('myPassword');
        obj.type = "password";
    }

    function mouseoverConfPass() {
        var obj = document.getElementById('myConfirmPassword');
        obj.type = "text";
    }

    function mouseoutConfPass() {
        var obj = document.getElementById('myConfirmPassword');
        obj.type = "password";
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Password must be more than 6 characters
        </Tooltip>
    );

    const renderEmailVal = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Enter a valid email address
            example: abc@email.com
        </Tooltip>
    );

    const renderMobileVal = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Enter a mobile number without country code
            example: 081111111
        </Tooltip>
    );


    return (
        <div className="bg-color">
        <Container >
            <Row style={{ marginTop: '4%', marginLeft: '1%' }}>
                <Col>
                    <div className="text-banner">Love</div>
                    <div className="text-banner">is Sharing.</div>
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
                                    {errors.firstname && <p className="error">{errors.firstname}</p>}
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Last name" 
                                onChange={(e) => { setLastname(e.target.value) }}/>
                                    {errors.lastname && <p className="error">{errors.lastname}</p>}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '4%' }}>
                            <Col>
                            Email
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderEmailVal}
                            >
                                <Button variant="success" className="btn-trans">
                                    <FiAlertCircle 
                                    style={{ color: 'gray', marginBottom: '2px', marginLeft: '-5px'}}/>
                                </Button>
                            </OverlayTrigger>
                            </Col>
                            <Col>
                            Mobile
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderMobileVal}
                            >
                                <Button variant="success" className="btn-trans">
                                    <FiAlertCircle 
                                    style={{ color: 'gray', marginBottom: '2px', marginLeft: '-5px'}}/>
                                </Button>
                            </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                                <Form.Control type="email" placeholder="email address" 
                                onChange={(e) => { setemail(e.target.value) }} />
                                    {errors.email && <p className="error">{errors.email}</p>}
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Mobile number"
                                onChange={(e) => { setMobile(e.target.value) }}  />
                                    {errors.mobile && <p className="error">{errors.mobile}</p>}                            
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '4%' }}>
                            <Col>Address</Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                                <Form.Control as="textarea" rows={2} style={{ resize: 'none' }} placeholder="Address" 
                                onChange={(e) => { setAddress(e.target.value) }} />
                                    {errors.address && <p className="error">{errors.address}</p>}                            
                            </Col>
                        </Row>
                    </Row>
                    <Row style={{ marginTop: '5%', borderBottom: '2px dashed lightgray', paddingBottom: '7%' }}>
                        <Row>
                            <Col>
                            Password
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <Button variant="success" className="btn-trans">
                                    <FiAlertCircle 
                                    style={{ color: 'gray', marginBottom: '2px', marginLeft: '-5px'}}/>
                                </Button>
                            </OverlayTrigger>
                            </Col>
                            <Col style={{ marginTop: '5px' }}>
                            Confirm password
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '1%' }}>
                            <Col>
                            <InputGroup className="mb-3" >
                                <Form.Control type="password" placeholder="Password" id="myPassword"
                                style={{ borderRight: 'none' }}
                                onChange={(e) => { setpassword(e.target.value) }} />
                                    {errors.password && <p className="error">{errors.password}</p>} 
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderLeft:'none', borderRadius: '0px 5px 5px 0px' }}>
                                    <RiEye2Line style={{ marginLeft: '10px' }} onMouseOver={mouseoverPass} onMouseOut={mouseoutPass} />
                                </InputGroup.Text>
                            </InputGroup>                           
                            </Col>
                            <Col>
                            <InputGroup className="mb-3" >
                            <Form.Control type="password" placeholder="Confirm your password" id="myConfirmPassword"
                                style={{ borderRight: 'none' }}
                                onChange={(e) => { 
                                    setConfirmPassword(e.target.value);
                                    setCheck(!check);
                                }} />
                                    {errors.password && <p className="error">{errors.password}</p>} 
                                <InputGroup.Text id="basic-addon1"
                                style={{ backgroundColor: 'transparent', borderLeft:'none', borderRadius: '0px 5px 5px 0px' }}>
                                    <RiEye2Line style={{ marginLeft: '10px' }} onMouseOver={mouseoverConfPass} onMouseOut={mouseoutConfPass} />
                                </InputGroup.Text>
                            </InputGroup>                           
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
                        <Button className="btn-login"
                        onClick={ register } >Register</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        <div style={{ height: '50px'}}></div>
        <div className="text-credit" style={{ height: '50px', textAlign: 'center'}}>powered by Saoluck 2022</div>
        </div>
    );
}



export default Register;
