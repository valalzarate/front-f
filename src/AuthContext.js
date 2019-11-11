import React, { useState, useEffect } from "react";

import { signout, auth } from "./services/firebase";

const AuthContext = React.createContext();
const Consumer = AuthContext.Consumer;
const Provider = (props) => {
  const [isAuth, setIsAuth] = useState(!!auth.currentUser);
  const [user, setUser] = useState(null);
  const setAuthentication = val => {
    if (!val) {
      signout();
      sessionStorage.clear();
    }
    setIsAuth(val);
  };

  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (user) {
        setIsAuth(true);
        setUser(currentUser);
      } else {
        setIsAuth(false);
        setUser(currentUser);
      }
    });
  }, [setIsAuth, user]);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setAuthentication: setAuthentication
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}
  
export { Provider, Consumer }