import React,{useState, useEffect} from "react";
import Axios from 'axios'
import { Link, useHistory } from "react-router-dom";

const Vertify = () => {

    const [code, setcode] = useState("");
    const [sendOtpStatus, setsendOtpStatus] = useState("")

    const vertify = () => {
        Axios.post('http://localhost:8000/vertify',{
        code: code,   
        }).then((response) => {
            if(response.data.message) {
                setsendOtpStatus(response.data.message);
            }else{
                alert("Invalid OTP");
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
                        <Link to="/resetpass"><button type="submit" onClick={vertify}>Submit</button></Link>
                        <button type="submit" onClick={back}>Back</button>
                    <br></br>
                </div>
            </div>  
        </div>
        <h1>{sendOtpStatus}</h1>
        </center>
    );
}

export default Vertify;