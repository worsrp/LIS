import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';



const Editpost = () =>{
    const [editPost, seteditPost] = useState([]);
    const [Name,setName] = useState('')
    const [Location,setLocation] = useState('')
    const [Description,setDescription] = useState('')
    const [Status,setStatus] = useState('')
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       })

    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file:event.target.files[0],
            filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }

    useEffect ((post_id) => {
        Axios.get(`http://localhost:8000/editpost/${post_id}`).then((response) => {
            seteditPost(response.data);
            console.log(post_id);
        });
    }, []);

    const savePost = (post_id) => {

        var edittoday = new Date();
        var dd = String(edittoday.getDate()).padStart(2, '0');
        var mm = String(edittoday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = edittoday.getFullYear();
        edittoday = yyyy + '-' + mm + '-' + dd;
        console.log(edittoday);

        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);
        Axios.post(`http://localhost:8000/editpost/${post_id}`, formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
        })

        Axios.post(`http://localhost:8000/editpost/${post_id}`, { 
        post_name: Name,  
        edit_date: edittoday,  
        location: Location,  
        description: Description,
        post_status: Status,
        image: formdata,
        }).then(() => {
        alert("successful Edit");
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
                                <input type="text" name="post_name" placeholder = {val.post_name} onChange={(e)=>{ setName(e.target.value) }} required /><br></br>

                                <label className="text-white">Select Image :</label>
                                <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
            
                                <label>Location : </label>
                                <select name="location" placeholder = {val.location} onChange={(e)=>{ setLocation(e.target.value) }}>
                                <option value="Chiang Mai">Chiang Mai</option>
                                <option value="BKK">BKK</option>
                                <option value="Chiang Rai">Chiang Rai</option>
                                </select><br></br>

                                <label>Description : </label>
                                <input type="text" name="Description" placeholder = {val.description} onChange={(e)=>{ setDescription(e.target.value) }} required /><br></br>

                                <label>Post Status : </label>
                                <input type="text" name="post_status" placeholder = {val.post_status} onChange={(e)=>{ setStatus(e.target.value) }}required /><br></br>
                            </form>
                            {/* <button onClick={() => {savePost(val.post_id)}}> Save </button> */}
                            <button class="btn btn-success" onClick={savePost}> Edit </button>
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