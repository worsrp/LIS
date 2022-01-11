import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';

//import style
import '../custom.scss';
import { Button, Form, Row, Col, Container, Modal } from 'react-bootstrap';
import { GrLocation, GrClose } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
//เหลือใส่รูป

function CreatePost(props) {
    const [Name,setName] = useState('')
    const [Category,setCategory] = useState('Fashion')
    const [Location,setLocation] = useState('Chiang Mai')
    const [Description,setDescription] = useState('')
    const [Image, setImage] = useState('')
    //const [fileName, setFileName] = useState("")

    

    const submitPost = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        console.log(Name);
        Axios.post("http://localhost:8000/createpost", { 
            post_name: Name,  
            category: Category,
            post_date: today,  
            location: Location,  
            description: Description,
            picture: Image
        }).then(() => {
            alert("successful insert");
        })
    };

    return (
    <Container>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" 
                className="text-header" style={{ paddingLeft : '250px' }}>
                        Create new post
                </Modal.Title>
                <Link to="/feed" onClick={props.onHide}>
                    <GrClose className="icon-large" />
                </Link>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row>
                    <Col></Col>
                    <Col xs={7}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col sm="11">
                                <Form.Control type="text" placeholder="What do you want to share?" 
                                onChange={ (e) => { setName(e.target.value) }} required  />
                            </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col sm="11">
                                <Form.Control as="textarea" rows={3} style={{ resize: 'none', height: '150px' }} placeholder="add some descriptions here..."
                                onChange={ (e) => { setDescription(e.target.value) }} required />
                            </Col>
                        </Form.Group>
                        

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col sm="11">
                                {/* <Form.Control type="file" placeholder="Uplode Image" 
                                onChange={ (e) => { setImage(e.target.value) }} required  /> */}
                                <Form.Control class="form-control" type="file" name="uploaded_image" accept=""/>
                            </Col>
                            </Form.Group>

                    </Col>
                </Row>
                <Row style={{ paddingLeft : '10%' }}> 
                    <Col>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2" className="text-title">
                                <BiCategory className="icon-large" 
                                style={{ paddingBottom : '5px' }}/>
                            </Form.Label>
                            <Col sm="7">
                                <Form.Select aria-label="Default select example" 
                                onChange={ (e) => { setCategory(e.target.value) }}>
                                    <option>select category</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Gadjets">Gadgets</option>
                                    <option value="Hand tools">Hand tools</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>                    
                    </Col>
                    <Col>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2" className="text-title">
                                <GrLocation className="icon-large" 
                                style = {{ paddingBottom : '5px' }}/>
                            </Form.Label>
                            <Col sm="7">
                                <Form.Select aria-label="Default select example"
                                onChange={ (e) => { setLocation(e.target.value) }}>
                                    <option>select location</option>
                                    <option value="Bangkok">Bangkok</option>
                                    <option value="Chiang Mai">Chiang Mai</option>
                                    <option value="Chiang Rai">Chiang Rai</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>                    
            </Form>
            </Modal.Body>
            <Modal.Footer style={{ border : 'white' }}>
            <Link to="/" style = {{ width: '80%'}}>
                <Button onClick={() => {
                    submitPost();
                    props.onHide();
                }}variant="outline-info" size="lg"
                className="pos-center" style = {{ width: '80%'}}>Post</Button>
            </Link>
            </Modal.Footer>
        </Modal>
    </Container>
    );
};

export default CreatePost;
