import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';

//import style
import '../custom.scss';
import { Card, Button, Container, Image, Row, Col, Form } from 'react-bootstrap';
import { MdError } from "react-icons/md";
import { BsImage } from "react-icons/bs";


const Editprofile = () =>{
    const [IsError, setIsError] = useState("");       
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [moblie, setMoblie] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [userInfo, setuserInfo] = useState({
      file:[],
      filepreview:null,
    });
    
    useEffect(() =>{
      if(password !== confirmPassword){
          setIsError("Password does not match!");
          setAlertShow(true);
      }else{
          setIsError("");
          setAlertShow(false);
      }
    }, [check]);

    const handleInputChange = (event) => {
      setuserInfo({
        ...userInfo,
        file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
      });
  
    }
  
    const [isSucces, setSuccess] = useState(null);
  
    const submit = () =>{
      const formdata = new FormData(); 
      formdata.append('avatar', userInfo.file);
      if(email==""||firstname==""||lastname==""||moblie==""||address==""||password==""||confirmPassword==""||userInfo.filepreview==null){
        alert("Please input your information !");
      }else{ 
      if(password !== confirmPassword){
        alert("Confirm Password is not match with password !");
      }else{
      Axios.post("http://localhost:8000/editprofile", formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
      })
      Axios.post("http://localhost:8000/editprofile",{
        image:formdata,
        email: email, 
        firstname: firstname, 
        lastname: lastname, 
        password: password,
        moblie: moblie, 
        address: address,
      }).then(() => {
            alert("successfully");
        })
      }
    }
    }
  
    return (
      <div className="container mr-60">
          <Container>
            <Form>
                            <Row style={{ marginRight: '20px'}} >
                                <Image src={require(`../profilebanner.png`)} />
                            </Row>
                            <Row> 
                            <Col xs={4}>
                              {userInfo.filepreview !== null ? 
                                <Image src={userInfo.filepreview}
                                roundedCircle className="profile-pic" />
                              : <Image src={require(`../nopic.jpg`)}
                              roundedCircle className="profile-pic" />} 
                              <Button type="file" className="pos-picimg btn-trans" onChange={handleInputChange}>
                                <BsImage className="icon-neg" />
                                <span style={{ color: 'white' }}>change image</span>
                              </Button>
                              
                            </Col>
                            <Col>
                            <Row>
                                <Col style={{ marginTop: '10px', marginLeft: '-60px'}}>
                                    <div>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>First name :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="text" placeholder="first name" style={{ width: '200px' }}
                                              onChange={(e) => { setFirstname(e.target.value) }} />
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>Last name :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="text" placeholder="last name" style={{ width: '200px' }}
                                              onChange={(e) => { setLastname(e.target.value) }} />
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>Mobile :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="text" placeholder="Mobile" style={{ width: '200px' }}
                                              onChange={(e) => { setMoblie(e.target.value) }} />
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>Address :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="text" placeholder="New address" style={{ width: '200px' }}
                                              onChange={(e) => { setAddress(e.target.value) }} />
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>New password :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="password" placeholder="password" style={{ width: '200px' }}
                                              onChange={(e) => { setPassword(e.target.value) }} />
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>Confirm password :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="password" placeholder="confirm password" style={{ width: '200px' }}
                                              onChange={(e) => { 
                                                setConfirmPassword(e.target.value);
                                                setCheck(!check); 
                                              }} />
                                            </Col>
                                          </Row>     
                                          <Row style={{ marginTop: '1%' }}>
                                              <Col className="text-error" style={{ paddingLeft: '250px' }}>
                                                  {alertShow === false ? (
                                                      <span></span>
                                                      ) : (
                                                          <MdError className="icon-sim" />
                                                      )}
                                                  {IsError}
                                              </Col>
                                          </Row>
                                    </div>
                                </Col>
                            </Row>
                            </Col>
                            </Row>
              </Form>
            </Container>
  
        <div className="formdesign">
        {isSucces !== null ? <h4> {isSucces} </h4> :null }
          <div className="form-row">
            <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
          </div>
              <div className="form-row">
                <Link to={"/profile"}><button class="btn btn-success" onClick={submit}> Save </button></Link>        
              </div>
        </div>
  
      </div>
    );
  }
  
  export default Editprofile;