import React,{useState, useEffect } from "react";
import Axios from 'axios'

const ResetPass = () => {

    const [password, setPass] = useState("");
    const [confirm_password, setConfirmPass] = useState("");

    useEffect (() => {
        Axios.get("http://localhost:8000/resetpass").then((response) => {
            setPass(response.data);
        });
    }, []);

    const setPassword = () => {
        if(password == confirm_password){
            Axios.post("http://localhost:8000/resetpass", { 
                password: password,
            }).then((response) => {
                setPass(response.data);
            })
        }
    };

    return (
        <center>
        <div className="Container">
            <div className="ResetPass">
                <h1> Reset Password </h1>
                <div class="contact">
                    <form method="post">
                    <label>New Password : </label>
                        <input onChange={(event) =>{setPass(event.target.value);}}
                        type="password" id="password" name="password" required></input>
                        <br />
                    <label>Confirm New Password : </label>
                        <input onChange={(event) =>{setConfirmPass(event.target.value);}}
                        type="password" name="confirm_password" required></input>
                        <button type="submit" onClick={setPassword}>Reset</button>
                    </form>
                    <br></br>
                </div>
            </div>  
        </div>
        </center>
    );
}

export default ResetPass;