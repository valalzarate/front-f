import React from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import Routes from "./Router";
import { Provider, Consumer } from "./AuthContext";

function App() {
  return (
    <Provider>
      <Consumer>
      {({isAuth, setAuthentication}) => (
         <Router>
         <React.Fragment>
           <AppAppBar 
             isAuth={isAuth} 
             setAuthentication={setAuthentication} 
           />
           {<Routes isAuth={isAuth} setAuthentication={setAuthentication} />}
           <AppFooter />
         </React.Fragment>
       </Router>
      )}
      </Consumer>
    </Provider>
  );
}

export default App;
