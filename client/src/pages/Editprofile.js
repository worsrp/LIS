import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Card, Button, Container, Image, Row, Col, Form } from 'react-bootstrap';
import { MdError } from "react-icons/md";
import { BsImage } from "react-icons/bs";


const Editprofile = () =>{
    const [profile, setProfile] = useState([]);
    const [IsError, setIsError] = useState("");       
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [userInfo, setuserInfo] = useState({
      file:[],
      filepreview:null,
    });

    const { currentUser } = useContext(AuthContext);

    useEffect(() =>{
      Axios.get(`http://localhost:8000/editprofile/${currentUser.uid}`).then((response) => {
        setProfile(response.data);
        setFirstname(response.data[0].firstname);
        setLastname(response.data[0].lastname);
        setMobile(response.data[0].mobile);
        setAddress(response.data[0].address);
        setuserInfo(response.data[0].image);
      });
    }, []);

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

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
    

      // else{ 
      // if(password !== confirmPassword){
      //   alert("Confirm Password is not match with password !");
      // }
      
      if(window.confirm("Are you sure to change this profile detail?"))
      {
      Axios.post(`http://localhost:8000/editprofile/${currentUser.uid}`, formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
      })
      Axios.post(`http://localhost:8000/editprofile/${currentUser.uid}`,{
        image:formdata,
        firstname: firstname, 
        lastname: lastname, 
        // password: password,
        mobile: mobile, 
        address: address,
      }).then(() => {
            alert("edit profile successfully!");
            window.location.href = `/profile`;
        })
      }
    }
    // }
  
    return (
      <>
      {profile.map((val) => {
          return(
            <>
          <Container>
            <Form>
                            <Row style={{ marginRight: '20px'}} >
                                <Image src={require(`../profilebanner.png`)} />
                            </Row>
                            <Row> 
                            <Col xs={4}>

                            {val.image.length <=1 && userInfo.filepreview == null ? <Image src={require(`../nopic.jpg`)}   
                                roundedCircle className="profile-pic" />:
                                val.image.length > 1 && userInfo.filepreview == null ?                                
                            <Image src={require(`../../../public_html/uploads/${val.image}`)}                               
                            roundedCircle className="profile-pic" /> :
                                <Image src={userInfo.filepreview}                               
                                roundedCircle className="profile-pic" />}      

                              <Button className="pos-picimg btn-trans" onClick={handleClick}>
                                <BsImage className="icon-neg" style={{ marginTop: '-2px'}} />
                                <span style={{ color: 'white', marginLeft: '5px' }}>change image</span>
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
                                              onChange={(e) => { setFirstname(e.target.value) }} placeholder={val.firstname} />
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>Last name :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="text" placeholder="last name" style={{ width: '200px' }}
                                              onChange={(e) => { setLastname(e.target.value) }} placeholder={val.lastname}/>
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={4} style={{ textAlign: 'end' , paddingTop: '5px' }}>
                                              <h5>Mobile :</h5>
                                            </Col>
                                            <Col>
                                              <Form.Control type="text" placeholder="Mobile" style={{ width: '200px' }}
                                              onChange={(e) => { setMobile(e.target.value) }} placeholder={val.mobile}/>
                                            </Col>
                                          </Row>
                                          <Row style={{ marginTop: '10px' }}>
                                            <Col xs={2} style={{ textAlign: 'end' , paddingTop: '5px', marginLeft: '-17px' }}>
                                              <h5>Address :</h5>
                                            </Col>
                                            <Col xs={5}>
                                              <Form.Control as="textarea" rows={3} placeholder="New address" style={{ width: '350px', marginLeft: '-10px' }}
                                              onChange={(e) => { setAddress(e.target.value) }} placeholder={val.address}/>
                                            </Col>
                                          </Row>
                                          {/* <Row style={{ marginTop: '10px' }}>
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
                                          </Row>      */}
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
              <div className="formdesign">
              {isSucces !== null ? <h4> {isSucces} </h4> :null }
                <div className="form-row">
                  <input type="file" className="form-control" name="upload_file"  
                  ref={hiddenFileInput} onChange={handleInputChange} style={{display: 'none'}} />
                </div>
                <Row style={{ marginLeft: '530px', marginTop: '20px' }}>
                  <Col xs={2}>
                    <Link to={"/profile"}><Button className="btn-edit"> Back </Button></Link>
                  </Col>
                  <Col style={{ marginLeft: '20px' }}>
                    <Button className="btn-save" onClick={submit}> Save </Button>
                  </Col> 
                </Row>     
              </div>
            </Container>
            
      </>
      )
    })}
    </>
    );
  }
  
  export default Editprofile;
