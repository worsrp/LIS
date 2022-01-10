import React,{useState, useEffect } from "react";
import Axios from 'axios'

const MyPost = () =>{
    const [myPost, setMyPost] = useState([]);

    //get post
    useEffect (() => {
        Axios.get("http://localhost:8000/mypost").then((response) => {
            setMyPost(response.data);
        });
    }, []);

    //delete post
    const deletePost = (post_id) => {
        if(window.confirm("Do you want to delete this post ")){
            Axios.delete(`http://localhost:8000/mypost/${post_id}`);
        }
    };

    const editPost = (post_id) => {
            Axios.get(`http://localhost:8000/editpost/${post_id}`);
    };

    return (
        <div className="myPost">
            <h2>My Post</h2>

            <div>
                {myPost.map((val)=> {
                    return (
                        <div className="myPostCard">
                            <h3> Name : {val.post_name} </h3> 
                            <h5> Description : </h5>  
                            <h6> {val.description} </h6>
                            <h6> Location : {val.location}  </h6>

                            <button onClick={() => {editPost(val.post_id)}}> Edit </button>
                            <button onClick={() => {deletePost(val.post_id)}}> Delete </button>
                            
                            
                        </div>
                    ); 
                })}
            </div>
        </div>
    );
};

export default MyPost;