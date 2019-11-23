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
  measurementId: "G-WHD8B2X2P7"
});

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export const db = firebase.firestore();

export const eventsQuery = db.collection("Eventos");

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

export const getUser = () => {
  return db
    .collection("Usuarios")
    .doc(auth.currentUser.email)
    .get()
    .then(r => r.data());
};

export const readUser = async email => {
  try {
    const data = await db
      .collection("Usuarios")
      .where("Email", "==", email)
      .get();

    let user = [];
    data.forEach(doc => {
      console.log(doc);
      user.push(doc.data());
    });

    return user;
  } catch (err) {
    return console.log(err);
  }
};

export const adduser = (
  firstName,
  lastName,
  email,
  typeUser,
  urlphoto,
  idusuario
) => {
  db.collection("Usuarios")
    .doc(idusuario)
    .set({
      Nombre: firstName,
      Apellido: lastName,
      Email: email,
      TipoUsuario: typeUser,
      photoURL: urlphoto,
      Likes: []
    });
};

export const addpost = (
  titulo,
  autor,
  lugar,
  descripcion,
  categoria,
  fecha,
  imgLink,
  idUsuario
) => {
  return db.collection("Eventos").add({
    idUsuario,
    Titulo: titulo,
    Autores: autor,
    Lugar: lugar,
    Descripcion: descripcion,
    Categoria: categoria,
    Fecha: fecha,
    photoEvent: imgLink,
    likesCount: 0,
    Likes: []
  });
};

export const signout = () => {
  return auth.signOut();
};

export const passwordRecovery = email => {
  return auth.sendPasswordResetEmail(email);
};

export async function getDocsDataFromQuery(query) {
  return query.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getAllEvents({ categoria }) {
  let q = eventsQuery;

  if (categoria) {
    q = eventsQuery.where("Categoria", "==", categoria);
  }

  return q.get().then(getDocsDataFromQuery);
}
