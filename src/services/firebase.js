import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCyyqZlfpRRa8lZ4VmqbyhWM2jKPQ8fIOU",
  authDomain: "dondeestaelvacile.firebaseapp.com",
  databaseURL: "https://dondeestaelvacile.firebaseio.com",
  projectId: "dondeestaelvacile",
  storageBucket: "dondeestaelvacile.appspot.com",
  messagingSenderId: "101954469429",
  appId: "1:101954469429:web:d5987879591af1892efb7c",
  measurementId: "G-WHD8B2X2P7",
});

export const auth = firebase.auth();
export const db = firebase.firestore();

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signup = (email, password, firstName, lastName) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.updateProfile({
        displayName: `${firstName} ${lastName}`
        
      });
    });
};

export const adduser = (email, firstName, lastName) => {
    db.collection('usuarios').add({
    nombre: firstName,
    apellido:lastName,
    correo: email,
  });
};

export const signout = () => {
  return auth.signOut();
};

export const passwordRecovery = email => {
  return auth.sendPasswordResetEmail(email);
};
