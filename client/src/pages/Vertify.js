import React,{useState, useEffect} from "react";
import Axios from 'axios'
import { useHistory } from "react-router-dom";

const Vertify = () => {

    const [code, setcode] = useState("");
    const [sendOtpStatus, setsendOtpStatus] = useState("")

    // useEffect (() => {
    //     Axios.get("http://localhost:8000/vertify").then((response) => {
    //         setsendOtpStatus(response.data);
    //     });
    // }, []);

    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("")

    const vertify = () => {
        Axios.post('http://localhost:8000/vertify',{
        code: code,   
        }).then((response) => {
            if(response.data.message == "Reset Password") {
                setsendOtpStatus(response.data.message);
                alert(response.data.message);
                window.location.href = '/resetpass';
            }else if(response.data.message == "OTP is already expired"){
                alert(response.data.message);
                window.location.href = '/login';
            }else{
                alert(response.data.message);
                window.location.href = '/vertify';
            }
            }
        )
    };   

    const history = useHistory();
    const back = () =>{ 
        history.push("/sendotp");
    }

    // const history = useHistory();
    // const back = () =>{ 
    //     history.push("/login");
    // }

    return (
        <center>
        <div className="Container">
            <div className="VertifyOTP">
                <h1> Vertification </h1>
                <label>Enter OTP from your Email</label>
                <div class="contact">
                    <input placeholder="OTP...6-digit" onChange={(event) =>{setcode(event.target.value);}}
                        type="text" name="otp" required></input>
                        <br />
                        <button type="submit" onClick={vertify}>Submit</button>
                        <button type="submit" onClick={back}>Resend OTP</button>
                    <br></br>
                </div>
            </div>  
        </div>
        <h1>{sendOtpStatus}</h1>
        </center>
    );
}

export default Vertify;