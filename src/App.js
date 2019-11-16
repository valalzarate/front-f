import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import Routes from "./Router";

import { signout, auth, db } from "./services/firebase";

function App() {
  const [isAuth, setIsAuth] = useState(!!auth.currentUser);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      console.log(currentUser);

      if (currentUser) {
        setIsAuth(true);
        setUser(currentUser);
      } else {
        setIsAuth(false);
        setUser(currentUser);
      }
    });
  });

  async function setAuthentication(val) {
    if (!val) {
      sessionStorage.clear();
      await signout();
    }

    setIsAuth(val);
  }

  console.log(isAuth);

  return (
    <div>
      <Router>
        <React.Fragment>
          <AppAppBar
            isAuth={isAuth}
            setAuthentication={setAuthentication}
            user={user}
          />
          <Routes
            isAuth={isAuth}
            setAuthentication={setAuthentication}
            user={auth.currentUser}
          />
          <AppFooter />
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
