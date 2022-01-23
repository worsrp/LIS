import React,{useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Button, Form, Row, Col, Container, Modal, Image, Overlay } from 'react-bootstrap';
import { GrLocation, GrClose } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { BsImage } from "react-icons/bs";

function CreatePost(props) {
    const [post_name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [location,setLocation] = useState('')
    const [description,setDescription] = useState('')
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });
    const [post_id,setId] = useState('')
    const { currentUser } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const target = React.useRef(null);

    const submitPost = () => {
        var post_date = new Date();
        var dd = String(post_date.getDate()).padStart(2, '0');
        var mm = String(post_date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = post_date.getFullYear();
        post_date = yyyy + '-' + mm + '-' + dd;
        console.log(post_name);
        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);
        
        Axios.post("http://localhost:8000/createpost",{
            post_name: post_name,  
            post_date: post_date,  
            location: location,   
            description: description,
            category: category,
            uid : currentUser.uid
        }).then((response) =>{
                Axios.post(`http://localhost:8000/createpost/${currentUser.uid}/${response.data.insertId}`,formdata,{   
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(() => {
                    alert('your post has been created!');
                    window.location.href = `/mypost`;
                })
            })
    };

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


    
    return (
    <Container>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" 
                className="text-header" style={{ paddingLeft : '300px' }}>
                        Create new post
                </Modal.Title>
                {/* <Link to="/feed" onClick={props.onHide}> */}
                    <GrClose className="icon-large" onClick={ props.onHide } />
                {/* </Link> */}
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                    {userInfo.filepreview !== null ? (
                        <Image src={userInfo.filepreview}
                        rounded className="pic-create" />
                    ) : ( 
                        <Image src={require(`../nopic.jpg`)}
                        rounded className="pic-create" />
                    )} 
                    {/* <Button className="btn-trans feed-picimg" onClick={handleClick}>
                                <BsImage className="icon-neg" style={{ marginTop: '-2px'}} />
                                <span style={{ color: 'white', marginLeft: '5px' }}>change image</span>
                    </Button> */}
                    </Col>
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
                                    <option value="Fashion">Fashion</option>
                                    <option value="Health and Beauty">Health and Beauty</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mommy and baby">Mommy and baby</option>
                                    <option value="Home and living">Home and living</option>
                                    <option value="lifestyle">lifestyle</option>
                                    <option value="Kpop">Kpop</option>
                                    <option value="Hand craft">Hand craft</option>

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
                                <option value="Krabi">Krabi</option>
                                <option value="Kanchanaburi">Kanchanaburi</option>
                                <option value="Kalasin">Kalasin</option>
                                <option value="Kamphaeng Phet">Kamphaeng Phet</option>
                                <option value="Khon Kaen">Khon Kaen</option>
                                <option value="Chanthaburi">Chanthaburi</option>
                                <option value="Chachoengsao">Chachoengsao</option>
                                <option value="Chonburi">Chonburi</option>
                                <option value="Chainat">Chainat</option>
                                <option value="Chaiyaphum">Chaiyaphum</option>
                                <option value="Chumphon">Chumphon</option>
                                <option value="Chiang Rai">Chiang Rai</option>
                                <option value="Chiang Mai">Chiang Mai</option>
                                <option value="Trang">Trang</option>
                                <option value="Trat">Trat</option>
                                <option value="Tak">Tak</option>
                                <option value="Nakhon Nayok">Nakhon Nayok</option>
                                <option value="Nakhon Pathom">Nakhon Pathom</option>
                                <option value="Nakhon Phanom">Nakhon Phanom</option>
                                <option value="Nakhon Ratchasima">Nakhon Ratchasima</option>
                                <option value="Nakhon Si Thammarat">Nakhon Si Thammarat</option>
                                <option value="Nakhon Sawan">Nakhon Sawan</option>
                                <option value="Nonthaburi">Nonthaburi</option>
                                <option value="Narathiwat">Narathiwat</option>
                                <option value="Nan">Nan</option>
                                <option value="Bueng Kan">Bueng Kan</option>
                                <option value="Buriram">Buriram</option>
                                <option value="Pathum Thani">Pathum Thani</option>
                                <option value="Prachuap Khiri Khan">Prachuap Khiri Khan</option>
                                <option value="Prachinburi">Prachinburi</option>
                                <option value="Pattani">Pattani</option>
                                <option value="Phra Nakhon Si Ayutthaya">Phra Nakhon Si Ayutthaya</option>
                                <option value="Phayao">Phayao</option>
                                <option value="Phang Nga">Phang Nga</option>
                                <option value="Phatthalung">Phatthalung</option>
                                <option value="Phichit">Phichit</option>
                                <option value="Phitsanulok">Phitsanulok</option>
                                <option value="Phetchaburi">Phetchaburi</option>
                                <option value="Phetchabun">Phetchabun</option>
                                <option value="Phrae">Phrae</option>
                                <option value="Phuket">Phuket</option>
                                <option value="Maha Sarakham">Maha Sarakham</option>
                                <option value="Mukdahan">Mukdahan</option>
                                <option value="Mae Hong Son">Mae Hong Son</option>
                                <option value="Yasothon">Yasothon</option>
                                <option value="Yala">Yala</option>
                                <option value="Roi Et">Roi Et</option>
                                <option value="Ranong">Ranong</option>
                                <option value="Rayong">Rayong</option>
                                <option value="Ratchaburi">Ratchaburi</option>
                                <option value="Lopburi">Lopburi</option>
                                <option value="Lampang">Lampang</option>
                                <option value="Lamphun">Lamphun</option>
                                <option value="Loei">Loei</option>
                                <option value="Sisaket">Sisaket</option>
                                <option value="Sakon Nakhon">Sakon Nakhon</option>
                                <option value="Songkhla">Songkhla</option>
                                <option value="Satun">Satun</option>
                                <option value="Samut Prakan">Samut Prakan</option>
                                <option value="Samut Songkhram">Samut Songkhram</option>
                                <option value="Samut Sakhon">Samut Sakhon</option>
                                <option value="Sa Kaeo">Sa Kaeo</option>
                                <option value="Saraburi">Saraburi</option>
                                <option value="Sing Buri">Sing Buri</option>
                                <option value="Sukhothai">Sukhothai</option>
                                <option value="Suphan Buri">Suphan Buri</option>
                                <option value="Surat Thani">Surat Thani</option>
                                <option value="Surin">Surin</option>
                                <option value="Nong Khai">Nong Khai</option> 
                                <option value="Nong Bua Lamphu">Nong Bua Lamphu</option>
                                <option value="Ang Thong">Ang Thong</option>
                                <option value="Amnat Charoen">Amnat Charoen</option>
                                <option value="Udon Thani">Udon Thani</option>
                                <option value="Uttaradit">Uttaradit</option>
                                <option value="Uthai Thani">Uthai Thani</option>
                                <option value="Ubon Ratchathani">Ubon Ratchathani</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>             
                <Row>
                <Form.Control size="lg" type="file" ref={hiddenFileInput} onChange={handleInputChange} /> 
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
