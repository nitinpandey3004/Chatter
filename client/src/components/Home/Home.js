import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home  = ({isLoggedIn}) => {
  const link = isLoggedIn ? (<a href={"/join"}>Join Room</a>) : (<a href={"/sign-in"}>Log In</a>);
  return (
    <div className="form-group inline">
      Welcome, {link} to continue.
    </div>
  );
}

export default Home;