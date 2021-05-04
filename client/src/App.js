import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/jquery.nicescroll/dist/jquery.nicescroll.js';
import React, {useContext, useEffect, useState} from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import './App.css';
import useToken from './helpers/useToken';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignOut from './components/Auth/SignOut';


// const App = () => {
//     const { token, setToken } = useToken();
//     if(!token) {
//         return <Login setToken={setToken} />
//     }
//     return (
//         // <Router>
//         //     <Route path="/" exact component={Join}/>
//         //     <Route path="/chat" component = {Chat} />
//         // </Router>

//         <div className="wrapper">
//         <h1>Application</h1>
//         <BrowserRouter>
//         <Switch>
//             <Route path="/dashboard">
//             <Dashboard />
//             </Route>
//         </Switch>
//         </BrowserRouter>
//     </div>
//     )
// };

const App = () => {
    const { token, setData, getData, clearData } = useToken();
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    // if(!token) {
    //     return <Login setToken={setToken} />
    // }
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>Chatter</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div>
              <Link className="nav-link" to={"/join"}>Join Room</Link>
              </div>
              <ul className="navbar-nav ml-auto">
                {isLoggedIn ? 
                (<li className="nav-item">
                  <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
                </li>) : 
                (<div className="form-inline" style={{float:'right'}}>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </div>)
                }                
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" render ={(props) => (
                  <Home setData={setData} isLoggedIn={isLoggedIn}/>
              )}/>
              <Route path="/sign-in" render ={(props) => (
                  <Login setData={setData} setIsLoggedIn={setIsLoggedIn}/>
              )}/>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-out" render ={(props) => (
                  <SignOut clearData={clearData} setIsLoggedIn={setIsLoggedIn}/>
              )}/>
              <PrivateRoute path="/join" component = {Join} />
              <PrivateRoute path="/chat" component = {Chat} />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }

export default App;