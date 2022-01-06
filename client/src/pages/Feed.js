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
        Axios.post("http://localhost:8000/feed", { 
            item: search
        }).then(() => {
            
        })
    };

    const addFav = (id) => {
        Axios.post("http://localhost:8000/fav", { 
            post_id: id
        }).then(() => {
            
        })
    };

    return (
        <div>
            <div className="searchBar">
                <div className="form">
                    <input type="text" placeholder="search item" name="item" onChange={(e)=>{
                    setSearch(e.target.value)
                    }} required />

                    <button onClick={searchPost}> search </button>
                </div>
            </div>
            <div className="feed">
                <div>
                    {feedPost.map((val)=> {
                        return (
                            <div className="feedCard">
                                <h3> Name : {val.post_name} </h3> 
                                <h5> Description : </h5>  
                                <h6> {val.description} </h6>
                                <h6> Location : {val.location}  </h6>

                                <button onClick={() => {addFav(val.post_id)}}> favorite </button>
                                
                            </div>

                        ); 
                    })}
                </div>
            </div>
        </div>
        

    );

};

export default Feed;