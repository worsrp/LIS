import React,{useState, useEffect } from "react";
import Axios from 'axios'
import { useHistory } from "react-router-dom";

const Sendotp = () => {

    const [email, setEmail] = useState("");
    const [sendOtpStatus, setsendOtpStatus] = useState("");

    const sendotp = () => {
        
        Axios.post('http://localhost:8000/send',{
        email: email,   
        }).then((response) => {
        if(response.data.message) {
            setsendOtpStatus(response.data.message);
        }else{
            setsendOtpStatus(response.data[0].firstname + " " +response.data[0].lastname);
        }
        })
    }

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
                    <form method="post" action="send">
                        <input placeholder="12345@gmail.com" onChange={(event) =>{setEmail(event.target.value);}}
                        type="text" name="email" required></input>
                        <br />
                        <button type="submit" onClick={sendotp}>Send Otp</button>
                        <button type="submit" onClick={back}>Back</button>
                    </form>
                    <br></br>
                </div>
            </div>  
        </div>
        </center>
    );
}

export default Sendotp;