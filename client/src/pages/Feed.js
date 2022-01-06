import React,{useState, useEffect } from "react";
import Axios from 'axios'

const Feed = () =>{
    const [search, setSearch] = useState([]);
    const [feedPost, setFeedPost] = useState([]);

    useEffect (() => {
        Axios.get("http://localhost:8000/feed").then((response) => {
            setFeedPost(response.data);
        });
    }, []);

    const searchPost = () => {

    };

    return (
        <div>
            <div className="searchBar">
                <div className="form">
                    <input type="text" placeholder="search item" name="search" onChange={(e)=>{
                    setSearch(e.target.value)
                    }} required />

                    <button onClick={searchPost}> search </button>
                </div>
            </div>
            <div className="feed">
                <div>
                    {feedPost.map((val)=> {
                        return <h2> Name : {val.post_name} <br /> Description : {val.description} <br /> Location : {val.location} </h2>
                    })}
                </div>
            </div>
        </div>
        

    );

};

export default Feed;