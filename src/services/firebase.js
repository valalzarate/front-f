import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCyyqZlfpRRa8lZ4VmqbyhWM2jKPQ8fIOU",
  authDomain: "dondeestaelvacile.firebaseapp.com",
  databaseURL: "https://dondeestaelvacile.firebaseio.com",
  projectId: "dondeestaelvacile",
  messagingSenderId: "101954469429",
  appId: "1:101954469429:web:d5987879591af1892efb7c",
  measurementId: "G-WHD8B2X2P7"
});

const auth = firebase.auth();

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signout = () => {
  return auth.signOut();
};

export const passwordRecovery = email => {
  return auth.sendPasswordResetEmail(email);
};
