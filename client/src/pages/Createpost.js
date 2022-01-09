import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Route } from 'react-router-dom';

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
//เหลือใส่รูป

const CreatePost = () => {
  const [Name,setName] = useState('')
  const [Category,setCategory] = useState('Fashion')
  const [Location,setLocation] = useState('Chiang Mai')
  const [Description,setDescription] = useState('')

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
      description: Description
      
    }).then(() => {
      alert("successful insert");
    })
  };

  return (
    <div className="App">
      <Card className="text-center pos-center" style={{ width: '50rem', borderRadius: '15px' }}>
        <Card.Header className="text-header" style={{ background:'white', borderRadius: '15px 15px 0px 0px' }}>
          Create New Post
          <i class="bi bi-x-lg pos-right"></i>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3" className="text-title">
                Title :
              </Form.Label>
              <Col sm="6">
                  <Form.Control type="text" placeholder="add title here..." />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3" className="text-title">
                Description :
              </Form.Label>
              <Col sm="6">
                  <Form.Control as="textarea" rows={3} style={{ resize: 'none', height: '150px' }} placeholder="add description here..." />
              </Col>
            </Form.Group>
          </Form>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      <h>LOVE IS SHARING</h><br></br>
      <h>CREATE POST</h><br></br>
      <div className="form">
        <label>Post Name : </label>
        <input type="text" name="post_name" onChange={(e)=>{
          setName(e.target.value)
        }} required /><br></br>

        <label>Category : </label>
        <select name="category"  onChange={(e)=>{
          setCategory(e.target.value)
        }}>
          <option value="Fashion">Fashion</option>
          <option value="IT">IT</option>
        </select><br></br>

        <label>Location : </label>
        <select name="location" onChange={(e)=>{
          setLocation(e.target.value)
        }}>
          <option value="Chiang Mai">Chiang Mai</option>
          <option value="BKK">BKK</option>
          <option value="Chiang Rai">Chiang Rai</option>
        </select><br></br>

        <label>Description : </label>
        <input type="text" name="Description" onChange={(e)=>{
          setDescription(e.target.value)
        }} required /><br></br>
        <button onClick={submitPost}> POST </button>

      </div>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
