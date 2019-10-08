import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import Routes from "./Router";

import { signout } from "./services/firebase";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const setAuthentication = val => {
    if (!val) {
      signout();
      sessionStorage.clear();
    }
    setIsAuth(val);
  };

  return (
    <Router>
      <React.Fragment>
        <AppAppBar isAuth={isAuth} setAuthentication={setAuthentication} />
        {<Routes isAuth={isAuth} setAuthentication={setAuthentication} />}
        <AppFooter />
      </React.Fragment>
    </Router>
  );
}

export default App;
