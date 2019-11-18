import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import Routes from "./Router";

import { signout, auth, db, getUser } from "./services/firebase";

import { Provider, Consumer } from "./AuthContext";

function App() {
  return (
    <Provider>
      <Consumer>
        {({ isAuth, setAuthentication, updateProfile, user }) => (
          <Router>
            <React.Fragment>
              <AppAppBar
                isAuth={isAuth}
                setAuthentication={setAuthentication}
                user={user}
                updateProfile={updateProfile}
              />
              {
                <Routes
                  isAuth={isAuth}
                  setAuthentication={setAuthentication}
                  user={user}
                  updateProfile={updateProfile}
                />
              }
              <AppFooter />
            </React.Fragment>
          </Router>
        )}
      </Consumer>
    </Provider>
  );
}

export default App;
