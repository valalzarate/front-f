import React, { useState, useEffect } from "react";

import { signout, auth, db } from "./services/firebase";

const AuthContext = React.createContext();
const Consumer = AuthContext.Consumer;

const getUser = email =>
  db
    .collection("Usuarios")
    .doc(email)
    .get()
    .then(d => d.data());

const Provider = props => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const setAuthentication = async val => {
    if (!val) {
      sessionStorage.clear();
      await signout();
    }

    setIsAuth(val);
  };

  useEffect(() => {
    auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        setIsAuth(true);
        setUser(await getUser(currentUser.email));
      } else {
        setIsAuth(false);
        setUser(null);
      }
    });
  });

  async function updateProfile() {
    setUser(await getUser(auth.currentUser.email));
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setAuthentication: setAuthentication,
        user: user,
        updateProfile: updateProfile
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { Provider, Consumer };
