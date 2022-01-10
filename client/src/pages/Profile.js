import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';

const Profile = () =>{
    const [profile, setProfile] = useState([]);


    useEffect (() => {
        Axios.get("http://localhost:8000/profile").then((response) => {
            setProfile(response.data);
        });
    }, []);


    return (
        <div>
            <button>
            <Link  to="/editprofile">Edit</Link>
            </button>

            <div className="profile">
                <div>
                    {profile.map((val)=> {
                        return (
                            <div >
                                <h3>Image</h3>
                                <h3> {val.firstname}     {val.lastname}</h3> 
                                <h5> Email : {val.email}</h5>  
                                <h5> Mobile : {val.moblie}</h5>  
                                <h5> Address : {val.address}</h5>                               
                            </div>

                        ); 
                    })}
                </div>
            </div>
        </div>
        
    );

};

export default Profile;