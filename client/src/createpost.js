import './App.css';
import React,{useState, useEffect } from "react";
import Axios from 'axios'
//เหลือใส่รูป

function Post() {
  const [Name,setName] = useState('')
  const [Category,setCategory] = useState('Fashion')
  const [Location,setLocation] = useState('Chiang Mai')
  const [Description,setDescription] = useState('')

  const submitPost = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log(Name);
    Axios.post("http://localhost:8000/createpost", { 
      post_name: Name,  
      category: Category,
      post_date: today,  
      location: Location,  
      description: Description
      
    }).then(() => {
      alert("successful insert");
    })
  };

  return (
    <div className="App">
      <h>LOVE IS SHARING</h><br></br>
      <h>CREATE POST</h><br></br>
      <div className="form">
        <label>Post Name : </label>
        <input type="text" name="post_name" onChange={(e)=>{
          setName(e.target.value)
        }} required /><br></br>

        <label>Category : </label>
        <select name="category"  onChange={(e)=>{
          setCategory(e.target.value)
        }}>
          <option value="Fashion">Fashion</option>
          <option value="IT">IT</option>
        </select><br></br>

        <label>Location : </label>
        <select name="location" onChange={(e)=>{
          setLocation(e.target.value)
        }}>
          <option value="Chiang Mai">Chiang Mai</option>
          <option value="BKK">BKK</option>
          <option value="Chiang Rai">Chiang Rai</option>
        </select><br></br>

        <label>Description : </label>
        <input type="text" name="Description" onChange={(e)=>{
          setDescription(e.target.value)
        }} required /><br></br>
        <button onClick={submitPost}> POST </button>

      </div>
    </div>
  );
}

export default Post;
