import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import ForgotPassword from "./ForgotPassword";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
function App() {
  return (
    <Router>
      <React.Fragment>
        <AppAppBar />

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />        
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/how" component={ProductHowItWorks} />

        <AppFooter />
      </React.Fragment>
    </Router>
  );
}

export default App;
