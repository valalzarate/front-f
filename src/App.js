import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import Routes from "./Router";

import { signout, auth, db, getUser } from "./services/firebase";

function App() {
  const [isAuth, setIsAuth] = useState(!!auth.currentUser);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        setIsAuth(true);
        setUser(await getUser());
      } else {
        setIsAuth(false);
        setUser(null);
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

  async function updateProfile() {
    setUser(await getUser());
  }

  return (
    <div>
      <Router>
        <React.Fragment>
          <AppAppBar
            isAuth={isAuth}
            setAuthentication={setAuthentication}
            user={user}
            updateProfile={updateProfile}
          />
          <Routes
            isAuth={isAuth}
            setAuthentication={setAuthentication}
            user={user}
            updateProfile={updateProfile}
          />
          <AppFooter />
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
