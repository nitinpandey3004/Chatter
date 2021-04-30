import React, {useState} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import './App.css';
import useToken from './helpers/useToken';


const App = () => {
    const { token, setToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        // <Router>
        //     <Route path="/" exact component={Join}/>
        //     <Route path="/chat" component = {Chat} />
        // </Router>

        <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
        <Switch>
            <Route path="/dashboard">
            <Dashboard />
            </Route>
        </Switch>
        </BrowserRouter>
    </div>
    )
};

export default App;