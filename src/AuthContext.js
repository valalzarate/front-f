import React, { useState, useEffect } from "react";

import {
  signout,
  auth,
  db,
  getAllAsistencias,
  getAllGustados
} from "./services/firebase";

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

  const [gustados, setGustados] = useState({});
  const [asistencias, setAsistencias] = useState({});

  async function addGustado(id) {
    await db
      .collection("Gustados")
      .doc(`${id}${auth.currentUser.email}`)
      .set({
        idEvento: id,
        idUsuario: auth.currentUser.email
      });

    setGustados({
      [`${id}${auth.currentUser.email}`]: true,
      ...gustados
    });

    console.log(gustados);
  }

  async function addAsistencia(id) {
    await db
      .collection("Asistencias")
      .doc(`${id}${auth.currentUser.email}`)
      .set({
        idEvento: id,
        idUsuario: auth.currentUser.email
      });

    setAsistencias({
      [`${id}${auth.currentUser.email}`]: true,
      ...asistencias
    });

    console.log(asistencias);
  }

  const setAuthentication = async val => {
    if (!val) {
      setGustados([]);
      setAsistencias([]);
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

        getAllAsistencias()
          .then(docs => docs.map(d => d.id))
          .then(docs => setAsistencias(docs));

        getAllGustados()
          .then(docs => docs.map(d => d.id))
          .then(docs => setGustados(docs));
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
        updateProfile: updateProfile,

        asistencias,
        gustados,
        addGustado,
        addAsistencia
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { Provider, Consumer };
