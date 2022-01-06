import React,{useState, useEffect } from "react";
import Axios from 'axios'

const Favlist = () =>{
    const [favPost, setFavPost] = useState([]);

    useEffect (() => {
        Axios.get("http://localhost:8000/fav").then((response) => {
            setFavPost(response.data);
        });
    }, []);

    const deleteFav = (id) => {
        Axios.delete("http://localhost:8000/fav", { 
            post_id: id
        }).then(() => {
            
        })
    };

    return (
        <div className="favList">
            <h2>My favorite post</h2>

            <div>
                {favPost.map((val)=> {
                    return (
                        <div className="favCard">
                            <h3> Name : {val.post_name} </h3> 
                            <h5> Description : </h5>  
                            <h6> {val.description} </h6>
                            <h6> Location : {val.location}  </h6>

                            <button onClick={() => {deleteFav(val.post_id)}}> remove </button> 
                            
                        </div>
                    ); 
                })}
            </div>
        </div>
    );
};

export default Favlist;