import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Constant from '../../config/index';

async function registerUser(credentials) {
    return fetch(`${Constant.SERVER_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}   

export default function SignUp() {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await registerUser({
                firstName,
                lastName,
                email,
                password,
                type: 'consumer'
            });
            history.push("/sign-in");
        } catch(e) {
            alert(e.message);
        }
    }
    return (
        <form onSubmit = {handleSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" 
                placeholder="First name" 
                onChange={(event) => setFirstName(event.target.value)} 
                />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" 
                placeholder="Last name" 
                onChange={(event) => setLastName(event.target.value)} 
                />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" 
                placeholder="Enter email" 
                onChange={(event) => setEmail(event.target.value)} 
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" 
                placeholder="Enter password" 
                onChange={(event) => setPassword(event.target.value)} 
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    );
}