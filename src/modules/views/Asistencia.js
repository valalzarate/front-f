import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getAllEvents, eventsQuery, db } from "../../services/firebase";
import qs from "qs";
import EventCardActions from "../components/EventCardActions";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.white,
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

export default function Asistencia({ isAuth, user, location }) {

  const classes = useStyles();
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    if (user && events.length == 0) {
      db
        .collection('Eventos')
        .get()
        .then(async eventos => {
          

          let arr = []


          for (let evento of eventos.docs) {
            arr.push(
              db.collection('Asistencias')
                .doc(evento.id)
                .collection('Asistentes')
                .doc(user.Email)
                .get()
                .then((asistencia) => ({
                  evento: {
                    id: evento.id,
                    ...evento.data()
                  },
                  exists: asistencia.exists
                }))
            )
          }

          Promise.all(arr).then(responses => {
            let temp = []

            for (let response of responses) {
              if (response.exists) temp.push(response.evento)
            }

            setEvents(temp)
          })
          
        })
    }
  }, [user]);

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container className={classes.root} component="section">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Eventos a los que iré
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Aquí podrás encontrar todos los eventos en los que te has apuntado.
            </Typography>
            <div className={classes.heroButtons}></div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {events.map(evento => (
              <Grid item key={evento.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={evento.photoEvent}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {evento.Titulo}
                    </Typography>
                    <Typography>{evento.Descripcion}</Typography>

                    <ul>
                      <li>
                        <b>Fecha: </b> {evento.Fecha}
                      </li>
                      <li>
                        <b>Lugar: </b> {evento.Lugar}
                      </li>
                      <li>
                        <b>Categoría: </b> {evento.Categoria}
                      </li>
                      <li>
                        <b>Autor: </b> {evento.Autores}
                      </li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={`/evento/${evento.id}`}
                    >
                      ver más
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
