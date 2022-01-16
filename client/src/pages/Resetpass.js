import React,{useState} from "react";
import Axios from 'axios'

const ResetPass = () => {

    const [password, setPass] = useState("");
    const [confirm_password, setConfirmPass] = useState("");

    let urlString = window.location.href; 
    var email;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            email = pair[0];
        }
    const setPassword = () => {
        if(password !== confirm_password){
            alert("Confirm Password is not match with password !");
        }else{
            console.log(password);
            Axios.post("http://localhost:8000/resetpass", { 
            email : email,
            password: password
        }).then(() => {
            alert("successful reset password");
            window.location.href = '/login';
        })
        } 
    }

    return (
        <div className="resetPass">
            <center>
            <h1> Reset Password </h1>
                <div className="ResetPass">
                    <div class="contact">
                        <form method="post">
                            <label>New Password : </label>
                            <input onChange={(event) =>{setPass(event.target.value);}}
                            type="password" id="password" name="password" required></input>
                            <br />
                            <label>Confirm New Password : </label>
                            <input onChange={(event) => setConfirmPass(event.target.value)}
                            type="password" name="confirm_password" required></input>
                            <br />
                            <button type="submit" onClick={setPassword}>Reset</button>
                        </form>
                        <br></br>
                    </div>
                </div>  
                </center>
            )
            </div>
    );
};

export default ResetPass;