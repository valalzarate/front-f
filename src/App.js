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
        {({
          isAuth,
          setAuthentication,
          updateProfile,
          user,
          asistencias,
          gustados,
          addGustado,
          addAsistencia
        }) => (
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
                  asistencias={asistencias}
                  gustados={gustados}
                  addGustado={addGustado}
                  addAsistencia={addAsistencia}
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
