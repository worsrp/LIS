import React,{useState, useEffect } from "react";
import Axios from 'axios'

const Editprofile = () =>{
    const [IsError, setIsError] = useState("");       
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [moblie, setMoblie] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userInfo, setuserInfo] = useState({
      file:[],
      filepreview:null,
     });
     
     const checkValidation=(e)=>{
        setConfirmPassword(e.target.value);
        if(password != confirmPassword){
            setIsError("Confirm Password should be match with password");
        }
    }

    const handleInputChange = (event) => {
      setuserInfo({
        ...userInfo,
        file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
      });
  
    }
  
    const [isSucces, setSuccess] = useState(null);
  
    const submit = () =>{
      if(password !== confirmPassword){
        alert("Confirm Password is not match with password !");
    }else{
      const formdata = new FormData(); 
      formdata.append('avatar', userInfo.file);
      Axios.post("http://localhost:8000/editprofile", formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
      })
      Axios.post("http://localhost:8000/editprofile",{
        image:formdata,
        email: email, 
        firstname: firstname, 
        lastname: lastname, 
        password: password,
        moblie: moblie, 
        address: address,
      }).then(() => {
            alert("successfully");
        })
      }
    }
  
    return (
      <div className="container mr-60">
        <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3>
  
        <div className="formdesign">
        {isSucces !== null ? <h4> {isSucces} </h4> :null }
          <div className="form-row">
            <label className="text-white">Select Image :</label>
            <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
          </div>
        </div>
        <div className="edit">
            <h1> Edit </h1>
            <form action="">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                email:
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Firstname :
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(e) => {
                    setFirstname(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Lastname :
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(e) => {
                    setLastname(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Moblie :
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(e) => {
                    setMoblie(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Address :
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Password :
                </label>
                <input
                type="password"
                className="form-controll"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Confirm Password :
                </label>
                <input
                type="password"
                className="form-controll"
                onChange={(e) => checkValidation(e)}
                ></input>
                <br />
                <p1>{IsError}</p1>
            </div>
            <br />
            </form>
            <div className="form-row">
            <button class="btn btn-success" onClick={submit}> Save </button>          
        </div>
        {userInfo.filepreview !== null ? 
          <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
        : null}
        </div>
  
      </div>
    );
  }
  
  export default Editprofile;