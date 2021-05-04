import React, {useState} from "react";
import './Login.css';
import PropTypes from 'prop-types';
import Constant from '../../config/index';
import {useHistory} from "react-router-dom";


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


// export default function Login({setToken}) {
//     const [username, setUserName] = useState();
//     const [password, setPassword] = useState();
    

//     return (
//         <div className="login-wrapper">
//             <h1>Please Log In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     <p>UserName</p>
//                     <input type= "text"
//                     onChange={e => setUserName(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     <p>Password</p>
//                     <input type= "text" 
//                     onChange={e => setPassword(e.target.value)}
//                     />
//                 </label>
//                 <div>
//                     <button type="submit">Submit</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

const Login = ({setData, setIsLoggedIn}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({email, password});
            console.log(setData);
            setData(data);
            history.push("/");
            setIsLoggedIn(true);
        } catch(e) {
            alert(e.message);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

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

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    {/* <label className="custom-control-label" htmlFor="customCheck1">Remember me</label> */}
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text">
                <a href="/sign-up">Sign Up?</a>
            </p>
        </form>
    );
}

Login.propTypes = {
    setData: PropTypes.func.isRequired
}

export default Login;