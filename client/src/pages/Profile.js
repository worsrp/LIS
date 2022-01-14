import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';

//import style
import '../custom.scss';
import { Card, Button, Container, Image} from 'react-bootstrap';

const Profile = () =>{
    const [profile, setProfile] = useState([]);


    useEffect (() => {
        Axios.get("http://localhost:8000/profile").then((response) => {
            setProfile(response.data);
        });
    }, []);


    return (
        <Container>
            hello
            <Button> 
            <Link  to="/editprofile">Edit</Link>
            </Button>
            {profile.map((val)=> {
                        return (
                            <Card>
                                <Image src={require(`../../../public_html/uploads/${val.image}`)}/>
                                <div>
                                    <h3> {val.firstname}     {val.lastname}</h3> 
                                    <h5> Email : {val.email}</h5>  
                                    <h5> Mobile : {val.moblie}</h5>  
                                    <h5> Address : {val.address}</h5>         
                                </div>
                            </Card>
                        ); 
                    })}
        </Container> 
        
    );

};

export default Profile;