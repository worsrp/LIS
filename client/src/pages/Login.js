
import React, {useState } from "react";
import Axios from "axios";

function Login (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
        

    const login = () => {
        Axios.post('http://localhost:8000/login',{
        email: email,   
        password: password,
        }).then((response) => {
        if(response.data.message) {
            setLoginStatus(response.data.message);
        }else{
            setLoginStatus(response.data[0].firstname + " " +response.data[0].lastname);
        }
        })
    };

    return (
        <center>
        <div className="App Container">
        <div className="Login">
            <h1> Login </h1>
            <input 
            type="text" 
            placeholder="Email..." 
            onChange={(event) =>{
                setEmail(event.target.value);
            }}
            /> 
            <br />
            <br />
            <input 
            type="password" 
            placeholder="Password..." 
            onChange={(event) =>{
            setPassword(event.target.value);
            }} />
            <br />
            <br />
            <button class="btn btn-success" onClick={login}> Login </button>
        </div>  
        <h1>{loginStatus}</h1>
        </div>
    </center>
    );
    }
export default Login;
