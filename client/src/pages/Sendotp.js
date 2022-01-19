import React,{useState} from "react";
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
                window.location.href = `/vertify?${email}`;
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
                    <input type="text" placeholder="12345@gmail.com"
                    pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*" required
                    onChange={(event) =>{setEmail(event.target.value);}} ></input>
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