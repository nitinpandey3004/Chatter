import React, {useState} from "react";
import './Login.css';
import PropTypes from 'prop-types';
import Constant from '../../config/index';


async function loginUser(credentials) {
    return fetch(`${Constant.SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}   


export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {authToken} = await loginUser({username, password});
        setToken(authToken);
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>UserName</p>
                    <input type= "text"
                    onChange={e => setUserName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input type= "text" 
                    onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}