import React,{useState, useEffect} from "react";
import Axios from 'axios'
import { useHistory } from "react-router-dom";

const Sendotp = () => {

    const [email, setEmail] = useState("");
    const [sendOtpStatus, setsendOtpStatus] = useState("")

    const sendotp = () => {
        Axios.post('http://localhost:8000/sendotp',{
        email: email,   
        }).then((response) => {
            if(response.data.message=="Please Check your Email !") {
                setsendOtpStatus(response.data.message);
                alert(response.data.message);
                window.location.href = `/vertify/${email}`;
            }else if(response.data.message=="Please Try again in 1 minute"){
                alert(response.data.message);
                window.location.href = '/login';
            }else{
                alert("Invalid Email");
                window.location.href = '/login';
            }
        })
    };   

    const history = useHistory();
    const back = () =>{ 
        history.push("/login");
    }

    return (
        <center>
        <div className="Container">
            <div className="ResetPass">
                <h1> Send OTP for Vetify </h1>
                <label>Enter Email</label>
                <div class="contact">
                    <input placeholder="12345@gmail.com" onChange={(event) =>{setEmail(event.target.value);}}
                        type="text" name="email" required></input>
                        <br />
                        <button type="submit" onClick={sendotp}>Send Otp</button>
                        <button type="submit" onClick={back}>Back</button>
                    <br></br>
                </div>
            </div>  
        </div>
        <h1>{sendOtpStatus}</h1>
        </center>
    );
}

export default Sendotp;