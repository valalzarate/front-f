import React from "react";
import { db, auth } from "../../services/firebase";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";


var numeroLikes;
var nombreEvento = "loading.";

function EventCardActions({ user, eventId }) {
  const [gusto, setGusto] = React.useState(false);
  const [asistencia, setAsistencia] = React.useState(false);
  

  const likesQuery = () =>
    db
      .collection("Likes")
      .doc(eventId)
      .collection("Usuarios")
      .doc(user.Email);

  const asistenciasQuery = () =>
    db
      .collection("Asistencias")
      .doc(eventId)
      .collection("Asistentes")
      .doc(user.Email);    

   const eventoActual = db.collection("Eventos").doc(eventId);

   eventoActual.get().then(doc => { numeroLikes = parseInt(doc.get("likesCount")) }); // aqui obtiene el número de likes actual del evento y lo asigna en numeroLikes

   let admin = require('firebase'); // se requiere para incrementar el valor de likes en la db


  async function darLike() {
    if (user) {
      await likesQuery().set({ eventId });
      sumarLike();
      setGusto(true);
    }
  }

  async function asistirEvento() {
    if (user) {
      await asistenciasQuery().set({ eventId });
      setAsistencia(true);
    }
  }
  
  async function desasistirEvento() {
    if (user) {
      await asistenciasQuery().delete();
      setAsistencia(false);
    }
  }

  async function quitarLike() {
    if (user) {
      await likesQuery().delete();
      await eventoActual.update({
        likesCount: admin.firestore.FieldValue.increment(-1)
        });
      setGusto(false);
    }
  }

  async function sumarLike() {
    if (user) {
      await eventoActual.update({
      likesCount: admin.firestore.FieldValue.increment(1)
      });
    }
  }

  
  React.useEffect(() => {
    if (user) {
      likesQuery()
        .get()
        .then(d => setGusto(d.exists));
    }
  });

  return (
    <div>
      {user ? (
        <div>
          <IconButton
            aria-label="add to favorites"
            onClick={() => (gusto ? quitarLike() : darLike())}
          >
            <FavoriteIcon color={gusto ? "error" : "action"} />
             {numeroLikes}
          </IconButton>
          <IconButton aria-label="save"
           onClick={() => (asistencia ? desasistirEvento() : asistirEvento())}
          >
            <BookmarkIcon color={asistencia ? "secondary" : "action"} />
          </IconButton>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EventCardActions;
