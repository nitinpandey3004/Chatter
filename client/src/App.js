import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from "react";
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
    const { token, setToken } = useToken();
    // if(!token) {
    //     return <Login setToken={setToken} />
    // }
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>Home</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/sign-in" render ={(props) => (
                  <Login setToken={setToken}/>
              )}/>
              <Route path="/sign-up" component={SignUp} />
              <PrivateRoute path="/join" component = {Join} />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }

export default App;