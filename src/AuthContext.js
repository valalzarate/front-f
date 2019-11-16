import React, { useState, useEffect } from "react";

import { signout, auth, db } from "./services/firebase";

const AuthContext = React.createContext();
const Consumer = AuthContext.Consumer;

const Provider = props => {
  const [isAuth, setIsAuth] = useState(!!auth.currentUser);
  const [user, setUser] = useState(auth.currentUser);
  const [userDB, userDBLoaded] = React.useState(null);

  const setAuthentication = async val => {
    if (!val) {
      sessionStorage.clear();
      await signout();

      console.log("BAH");
    }

    setIsAuth(val);
  };

  const getUserDB = async email => {
    const user = await db
      .collection("Usuarios")
      .doc(email)
      .get();
    userDBLoaded(user);
  };

  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      console.log(currentUser);

      if (currentUser) {
        setIsAuth(true);
        setUser(currentUser);
        getUserDB(currentUser.email);
      } else {
        setIsAuth(false);
        setUser(currentUser);
      }
    });
  });

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setAuthentication: setAuthentication,
        user: user,
        userDB: userDB
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { Provider, Consumer };
