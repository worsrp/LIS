
import React, {useState,useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";



function Register (){
    const [IsError, setIsError] = useState("");         
    const [emailReg, setEmailReg] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [moblie, setMoblie] = useState("");
    const [address, setAddress] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = () => {
        console.log(passwordReg)
        console.log(confirmPassword)
        if(passwordReg !== confirmPassword){
            alert("Confirm Password is not match with password !");
        }else{ 
            Axios.post("http://localhost:8000/register", {
                email: emailReg, 
                firstname: firstname, 
                lastname: lastname, 
                password: passwordReg,
                moblie: moblie, 
                address: address
        }).then((response) => {
            console.log(response)
            alert("successfully");

        });
        }
    };
    

    return (
        <center>
        <div className="App Container">
        <div className="register">
            <h1> Register </h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                email:
                </label>
                <input
                type="text"
                name="emailReg" 
                required
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
                name="firstname" 
                required
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
                name="lastname" 
                required
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
                name="modlie" 
                required
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
                name="address" 
                required
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
                name="passwordReg" 
                required
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
                name="confirmPassword" 
                required
                className="form-controll"
                onChange={(e) =>{ 
                    setConfirmPassword(e.target.value)
                }}
                ></input>
                <br />
                <p1>{IsError}</p1>
            </div>
            <br />
            <button class="btn btn-success" onClick={register}>Register</button>
        </div>
        </div>
    </center>
    );
}

export default Register;
