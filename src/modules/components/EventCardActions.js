import React from "react";
import { db, auth } from "../../services/firebase";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkIcon from "@material-ui/icons/Bookmark";

function EventCardActions({ user, eventId }) {
  const [gusto, setGusto] = React.useState(false);
  const [asistencia, setAsistencia] = React.useState(false);

  const likesQuery = () =>
    db
      .collection("Usuarios")
      .doc(user.Email)
      .collection("likes")
      .doc(eventId);

  async function darLike() {
    if (user) {
      await likesQuery().set({ eventId });
      setGusto(true);
    }
  }

  async function quitarLike() {
    if (user) {
      await likesQuery().delete();
      setGusto(false);
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
          </IconButton>
          <IconButton aria-label="save">
            <BookmarkIcon color={"action"} />
          </IconButton>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EventCardActions;
