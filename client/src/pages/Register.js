import Axios from "axios";
import React, {useState } from "react";

    function Register (){
    const [emailReg, setEmailReg] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [moblie, setMoblie] = useState("");
    const [address, setAddress] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

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
                onChange={(event) => {
                    setEmailReg(event.target.value)
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
                onChange={(event) => {
                    setFirstname(event.target.value)
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
                onChange={(event) => {
                    setLastname(event.target.value)
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
                onChange={(event) => {
                    setMoblie(event.target.value)
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
                onChange={(event) => {
                    setAddress(event.target.value)
                }}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Password :
                </label>
                <input
                type="text"
                className="form-controll"
                onChange={(event) => {
                    setPasswordReg(event.target.value)
                }}
                ></input>
            </div>
            <br />
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
