import React,{useState, useEffect } from "react";
import Axios from 'axios'

const Profile = () =>{
    const [profile, setProfile] = useState([]);

    //show all post
    useEffect (() => {
        Axios.get("http://localhost:8000/profile").then((response) => {
            setProfile(response.data);
        });
    }, []);

    const editProfile = () => {
          Axios.get("http://localhost:8000/edit");      
    };

    return (
        <div>
            <div>
                <button className="edit" onClick={editProfile}> edit </button> 
            </div>

            <div className="profile">
                <div>
                    {profile.map((val)=> {
                        return (
                            <div >
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