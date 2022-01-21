import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import { Link, Redirect, Route } from 'react-router-dom';
import { AuthContext } from "../Auth";

//import style
import '../custom.scss';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';
import { GrLocation, GrClose } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";

const Editpost = () =>{
    const [editPost, seteditPost] = useState([]);
    const [Name,setName] = useState('')
    const [Category, setCategory] = useState('')
    const [Location,setLocation] = useState('')
    const [Description,setDescription] = useState('')
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null, 
    })
    const { currentUser } = useContext(AuthContext);

    const handleFormChange = (event) => {
        setuserInfo({
            ...userInfo,
            file:event.target.files[0],
            filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }

    let urlString = window.location.href; 
    let post_id;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            post_id = pair[0];
        }
    parseInt(post_id);

    useEffect (() => {
        Axios.get(`http://localhost:8000/editpost/${currentUser.uid}/${post_id}`).then((response) => {
            seteditPost(response.data);
            setName(response.data.post_name);
            setCategory(response.data.category);
            setDescription(response.data.description);
            setLocation(response.data.location);
            setuserInfo(response.data.image);
        });
    }, []);
            
    const savePost = () => {
        var edittoday = new Date();
        var dd = String(edittoday.getDate()).padStart(2, '0');
        var mm = String(edittoday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = edittoday.getFullYear();
        edittoday = yyyy + '-' + mm + '-' + dd;
        console.log(edittoday);

        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);

        
        if(window.confirm("Are you sure to change this post detail?")){
            Axios.post(`http://localhost:8000/editpost/${currentUser.uid}/${post_id}`,formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
            })

            Axios.post(`http://localhost:8000/editpost/${currentUser.uid}/${post_id}`, { 
                post_name: Name,   
                category: Category,
                edit_date: edittoday,  
                location: Location,  
                description: Description,
                image: formdata,
                uid: currentUser.uid
            }).then(() => {
                window.location.href = `/mypost`;
            })
        }
    
    };


    return (
        <div className="myPost" style={{ marginTop: '30px' }}>
            <Row className="text-huge-header">Edit Post</Row>
            <Row className="text-sub-header" style={{ marginTop: '20px' }}>
            {editPost.map((val)=> { 
                    return (
                        <div className="myPostCard">
                            <form>
                            <Row>
                            <Col xs={3}>
                                <Row>
                                    {val.image.length>10?(
                                        <Image src={require(`../../../public_html/uploads/${val.image}`)} 
                                            style={{ width: '210px', height: '210px', margin: '10px'}}/>):(
                                            <div>
                                            </div>
                                    )}
                                </Row>
                                </Col>
                            <Col>
                                <Row>
                                    <Col xs={3} style={{ textAlign: 'end', marginTop: '3px'}}>Post Name :</Col>
                                    <Col xs={5}>
                                        <Form.Control type="text" name="post_name" placeholder={val.post_name} 
                                        onChange={(e)=>{ setName(e.target.value) }} required />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col xs={3} style={{ textAlign: 'end', marginTop: '3px'}}>Category :</Col>
                                    <Col xs={5}>
                                        <Form.Select name="category" placeholder={val.category}
                                        onChange={ (e) => { setCategory(e.target.value) }}>
                                            <option value="Clothes">Clothes</option>
                                            <option value="Gadjets">Gadgets</option>
                                            <option value="Hand tools">Hand tools</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col xs={3} style={{ textAlign: 'end', marginTop: '3px'}}>Select Image :</Col>
                                    <Col xs={5}>
                                        <Form.Control type="file" className="form-control" name="upload_file"  
                                        onChange={handleFormChange} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col xs={3} style={{ textAlign: 'end', marginTop: '3px'}}>Location : </Col>
                                    <Col xs={5}>
                                        <Form.Select name="location" placeholder={val.location} 
                                        onChange={(e)=>{ setLocation(e.target.value) }}>
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
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col xs={3} style={{ textAlign: 'end', marginTop: '3px'}}>Description : </Col>
                                    <Col xs={5}>
                                        <Form.Control as="textarea" rows={3} style={{ resize: 'none', height: '150px' }} name="Description" placeholder={val.description}
                                        onChange={(e)=>{ setDescription(e.target.value) }} required />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                                <Col xs={3}></Col>
                                <Col>
                                <Row>
                                    <Col style={{ textAlign: 'end' }}>
                                        <Button className="btn-edit" onClick={() => {savePost(val.post_id)}}> Save </Button>
                                    </Col>
                                    <Col>
                                        <Link  to="/mypost">
                                            <Button className="btn-delete"> Cancel </Button>
                                        </Link>
                                    </Col>
                                </Row>
                                </Col>
                        </Row>   
                        </form>
                    </div>
                    ); 
                })}
            </Row>
        </div>
    );
};

export default Editpost;