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

export const adduser = (firstName, lastName, email, typeUser, urlphoto, idusuario) => {
    db.collection('Usuarios').doc(idusuario).set({
    Nombre: firstName,
    Apellido:lastName,
    Email: email,
    TipoUsuario: typeUser,
    photoURL: urlphoto
  });
};


export const addpost = (titulo, autor, lugar, descripcion, fecha, imgLink, idUsuario) => {
  db.collection('Eventos').doc(titulo).set({
    Titulo: titulo,
    Autores: autor,
    Lugar: lugar,
    Descripcion: descripcion,
    Fecha: fecha,
    photoEvent: imgLink
  });
};

export const mostrarInfo = () => {
  var user = auth.currentUser;

  try {
    console.log("el uid es: "+user.uid);
    let cityRef = db.collection('Usuarios').doc(user.email);
  let getDoc = cityRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  } catch (error) {
    console.log(error);
  }
  
  // [END get_document]

};



export const signout = () => {
  return auth.signOut();
};

export const passwordRecovery = email => {
  return auth.sendPasswordResetEmail(email);
};
