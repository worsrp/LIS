import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';
import { AuthContext } from "../Auth";


const Editpost = () =>{
    const [editPost, seteditPost] = useState([]);
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       })
    const { currentUser } = useContext(AuthContext);
    let urlString = window.location.href; 
    var post_id;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            post_id = pair[0];
        }
    parseInt(post_id);

    useEffect (() => {
        Axios.get(`http://localhost:8000/createpost/${post_id}`).then((response) => {
            seteditPost(response.data);
        });
    }, []);
 
    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file:event.target.files[0],
            filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }

    
            
    const savePost = (post_id) => {
        var edittoday = new Date();
        var dd = String(edittoday.getDate()).padStart(2, '0');
        var mm = String(edittoday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = edittoday.getFullYear();
        edittoday = yyyy + '-' + mm + '-' + dd;
        console.log(edittoday);

        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);

        Axios.post(`http://localhost:8000/create/${post_id}`,formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
        })
    };

    return (
        <div className="myPost">
            <h2>Edit Post</h2>
            <div>
                {editPost.map((val)=> {
                    return (
                        <div className="myPostCard">
                            <form>
                                <label>Post Name : </label>
                                <input type="text" name="post_name" value = {val.post_name}  required /><br></br>

                                <label className="text-white">Select Image :</label>
                                <input type="file" className="form-control" name="upload_file" />
            
                                <label>Location : </label>
                                <select name="location" value= {val.location} >
                                </select><br></br>

                                <label>Description : </label>
                                <input type="text" name="Description" value = {val.description}  required /><br></br>

                                <label>Post Status : </label>
                                <input type="text" name="post_status" value = {val.post_status} required /><br></br>
                            </form>

                            <button onClick={() => {savePost(val.post_id)}}> Edit </button>
                            <button > <Link  to="/mypost">Cancel</Link> </button>
                            
                            {userInfo.filepreview !== null ? 
                            <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
                            : null}
                        </div>
                        
                    ); 
                })}
            </div>
        </div>
    );
};

export default Editpost;