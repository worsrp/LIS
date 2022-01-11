import Axios from "axios";
import React, {useState } from "react";

function Register (){
    const [IsError, setIsError] = useState("");         
    const [emailReg, setEmailReg] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [moblie, setMoblie] = useState("");
    const [address, setAddress] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    Axios.defaults.withCredentials = true;

    const register = () => {
        console.log(emailReg);
        Axios.post("http://localhost:8000/register", {
        email: emailReg, 
        firstname: firstname, 
        lastname: lastname, 
        password: passwordReg,
        moblie: moblie, 
        address: address
        }).then(() => {
            alert("successful register");
        })
    };

    const checkValidation=(e)=>{
        setConfirmPassword(e.target.value);
        if(passwordReg != confirmPassword){
            setIsError("Confirm Password should be match with password");
        }else{
            setIsError("");
    }
    };
    
    return (
        <center>
        <div className="App Container">
        <div className="register">
            <h1> Register </h1>
            <form action="">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                email:
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(e) => {
                    setEmailReg(e.target.value)
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
                    setPasswordReg(e.target.value)
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
                <button class="btn btn-success" onClick={register}>
                Register
                </button>
            </form>
        </div>
        </div>
    </center>
    );
}

export default Register;
