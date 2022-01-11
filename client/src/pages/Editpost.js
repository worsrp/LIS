import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';



const Editpost = () =>{
    const [editPost, seteditPost] = useState([]);
    const [Name,setName] = useState('')
    const [Location,setLocation] = useState('')
    const [Description,setDescription] = useState('')
    const [Status,setStatus] = useState('')
    const [Picture,setPicture] = useState('')

    useEffect ((post_id) => {
        Axios.get(`http://localhost:8000/editpost/${post_id}`).then((response) => {
            seteditPost(response.data);
            console.log(post_id);
        });
    }, []);

    const savePost = () => {

        var edittoday = new Date();
        var dd = String(edittoday.getDate()).padStart(2, '0');
        var mm = String(edittoday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = edittoday.getFullYear();
        edittoday = yyyy + '-' + mm + '-' + dd;
        console.log(edittoday);

        Axios.post("http://localhost:8000/editpost", { 
        post_name: Name,  
        edit_date: edittoday,  
        location: Location,  
        description: Description,
        post_status: Status,
        picture: Picture,
        
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

                            <label>Post Name : </label>
                            <input type="text" name="post_name" placeholder = {val.post_name} onChange={(e)=>{ setName(e.target.value) }} required /><br></br>

                            <input class="form-control" type="file" name="uploaded_image" accept="" onChange={(e)=>{ setPicture(e.target.value) }}/>

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

                            {/* <button onClick={() => {savePost(val.post_id)}}> Save </button> */}
                            <button onClick={() => {savePost(val.post_id)}} > Edit </button>
                            <button > <Link  to="/mypost">Cancel</Link> </button>
                            
                            
                        </div>
                        
                    ); 
                })}
            </div>
        </div>
    );
};

export default Editpost;