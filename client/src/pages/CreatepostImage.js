import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import { AuthContext } from "../Auth";


const SaveImage = () =>{
    const [image, setimage] = useState([])
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       })

    const { currentUser } = useContext(AuthContext);
    
    let urlString = window.location.href; 
    let post_id;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            post_id = pair[0];

        }
    parseInt(post_id);

    useEffect (() => {
        Axios.get(`http://localhost:8000/createpost/${post_id}`).then((response) => {
            setimage(response.data);
        });
    }, []);

    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file:event.target.files[0],
            filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }

    const saveimage = () => {

        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);

        Axios.post(`http://localhost:8000/createpost/${post_id}`,formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
        }).then(()=>{
            window.location.href = `/mypost`;
        })
    };

    const cancelPost = () => {
        if(window.confirm("Do you want to cancel this post ")){
            Axios.delete(`http://localhost:8000/createpost/${post_id}`)
            window.location.href = `/feed`;
        }
    };

    return (
        <div className="myPost">
            <h2>UploadImage</h2>
            <div>
                {image.map((val)=> {
                    return (
                        <div className="myPostCard">
                            <form>
                                <label>Post Name : </label>
                                <input type="text" name="post_name" value = {val.post_name}  required /><br></br>

                                <label className="text-white">Select Image :</label>
                                <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
            
                                <label>Location : </label>
                                <select name="location" value= {val.location} >
                                </select><br></br>

                                <label>Description : </label>
                                <input type="text" name="Description" value = {val.description}  required /><br></br>

                                <label>Post Status : </label>
                                <input type="text" name="post_status" value = {val.post_status} required /><br></br>
                            </form>

                            <button onClick={() => {saveimage(val.post_id)}}> SAVE </button>
                            <button onClick={() => {cancelPost(val.post_id)}}> CANCEL </button>
                            
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

export default SaveImage;