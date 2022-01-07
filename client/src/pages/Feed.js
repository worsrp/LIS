import React,{useState, useEffect } from "react";
import Axios from 'axios'

const Feed = () =>{
    const [search, setSearch] = useState('');
    const [feedPost, setFeedPost] = useState([]);

    //show all post
    useEffect (() => {
        Axios.get("http://localhost:8000/feed").then((response) => {
            setFeedPost(response.data);
        });
    }, []);

    //search 
    const searchPost = () => {
        if(search != ''){
            Axios.post("http://localhost:8000/feed", { 
                item: search
            }).then((response) => {
                setFeedPost(response.data);
            })
        }
    };

    //add post to favlist
    const addFav = (id) => {
        Axios.post("http://localhost:8000/fav", { 
            post_id: id
        }).then(() => {
            alert("added to favorite list");
        })
    };

    return (
        <div>
            <div className="searchBar">
                <input type="text" placeholder="search item" name="item" onChange={(e)=>{
                    setSearch(e.target.value)
                }} />

                <button className="searchButt" onClick={searchPost}> search </button> 

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

                                <button className="favButt" onClick={() => {addFav(val.post_id)}}> favorite </button>
                                
                            </div>

                        ); 
                    })}
                </div>
            </div>
        </div>
        
    );

};

export default Feed;