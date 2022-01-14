
import React, {useState,useEffect } from "react";
import Axios from "axios";

function Login (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
        

    Axios.defaults.withCredentials = true;

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
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:8000/login").then((response) => {
            if (response.data.loggedIn === true) {
            setLoginStatus(response.data.user[0].username);
            }
        });
    }, []);

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
            <a href="/sendotp"> Forgot Password ? </a>
            <button class="btn btn-success" onClick={login}> Login </button>
        </div>  
        <h1>{loginStatus}</h1>
        </div>
    </center>
    );
    }
export default Login;
