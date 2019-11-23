import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "./modules/components/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Redirect, useParams } from "react-router-dom";

import { db } from "./services/firebase";
import EventCardActions from "./modules/components/EventCardActions";

var EventoID = "loading..";
var numeroAsistentes;

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

function SignUp({ setAuthentication, isAuth, user }) {
  const classes = useStyles();
  const { idEvento } = useParams();
  const [evento, setEvento] = React.useState(null);
  const [existeEvento, setNoExisteEvento] = React.useState(null);
  const [asistentes, setAsistentes] = React.useState([]);

  React.useEffect(() => {
    db.collection("Eventos")
      .doc(idEvento)
      .get()
      .then(doc =>
        setEvento({
          id: doc.id,
          ...doc.data()
        })
      );

    db.collection("Asistencias")
      .doc(idEvento)
      .collection("Asistentes")
      .get()
      .then(asistentes => {
        setAsistentes(asistentes.docs.map(doc => doc.id));
      });
  });

  const eventoActual = db.collection("Eventos").doc(idEvento);

  eventoActual.get().then(doc => {
    numeroAsistentes = parseInt(doc.get("asistentesCount"));
  });

  const LikesActual = db.collection("Likes").doc(EventoID);
  const AsistenciasActual = db.collection("Asistencias").doc(EventoID);

  async function deleteEvent() {
    if (user) {
      EventoID = idEvento;
      LikesActual.delete();
      AsistenciasActual.delete();
      eventoActual.delete();
      setNoExisteEvento(true);
    }
  }

  let to = "/eventos";

  if (!idEvento) {
    return <Redirect to="/eventos"></Redirect>;
  }

  return evento ? (
    <div>
      {existeEvento ? <Redirect to={to}></Redirect> : <div></div>}

      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={evento.photoEvent}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h4" component="h2">
                  {evento.Titulo}
                </Typography>
                <Typography gutterBottom variant="overline" component="h2">
                  <b>Autor: </b> {evento.Autores}
                </Typography>
                <Typography gutterBottom variant="overline" component="h3">
                  <b>Fecha: </b>
                  {evento.Fecha}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="h2">
                  Descripción del Evento:
                </Typography>
                <Typography>{evento.Descripcion}</Typography>
              </CardContent>
              {isAuth && user ? (
                <CardActions>
                  <EventCardActions
                    eventId={evento.id}
                    user={user}
                  ></EventCardActions>
                  {evento.idUsuario == user.Email ? (
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteEvent()}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                  {evento.idUsuario == user.Email ? (
                    <IconButton aria-label="asistentes" color={"primary"}>
                      <CheckCircleIcon />
                      {numeroAsistentes}
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                </CardActions>
              ) : (
                <div></div>
              )}
            </Card>
            <Card>
                <CardContent>
                    <ul>
                        {
                            asistentes.map(asistente => (
                                <li>{asistente}</li>
                            ))
                        }
                    </ul>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  ) : (
    <div></div>
  );
}

export default withRoot(SignUp);
