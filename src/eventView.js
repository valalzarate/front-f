import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, Form, FormSpy } from "react-final-form";
import AppForm from "./modules/views/AppForm";
import Typography from "./modules/components/Typography";
import { required } from "./modules/form/validation";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Redirect } from "react-router-dom";

import { addpost, db } from "./services/firebase";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function SignUp({ setAuthentication, isAuth, user }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [category, setCategory] = React.useState("Playeros");
  const [image, setImage] = React.useState(null);

  const validate = values => {
    const errors = required(
      ["titulo", "lugar", "descripcion", "fecha"],
      values
    );

    return errors;
  };

  async function uploadImage(file, idEvento) {

    const userActual = db.collection("Eventos").doc(idEvento);

    const storageRef = firebase
      .storage()
      .ref(`events/${user.Email}/${idEvento}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error.message);
      },
      async () => {
        const photoURL = await storageRef.getDownloadURL();
        userActual.update({
          photoEvent: photoURL
        });

      }
    );
  }

  const onSubmit = async ({ titulo, lugar, descripcion, fecha }) => {
    setSent(true);

    try {
      const newPost = await addpost(
        titulo,
        `${user.Nombre} ${user.Apellido}`,
        lugar,
        descripcion,
        category,
        fecha,
        "loading..",
        user.Email
      );

       const url = await uploadImage(image, newPost.id);
      
      newPost
        .get()
        .then(r => r.data())
        .then(console.log);
    } catch (e) {
      setSent(false);
    }
  };

  const cards = [1];

  return (
    <div>
      {isAuth ? (
        user && user.TipoUsuario == 0 ? (
          <Redirect to="/" />
        ) : (
          <div />
        )
      ) : (
        <Redirect to="/eventoVista" />
      )}

             <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={1}>
            {cards.map(card => (
              <Grid item key={card} xs={14} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      Titulo del Evento
                    </Typography>
                      <Typography gutterBottom variant="overline" component="h2">
                        Autor: 
                       </Typography >
                      <Typography gutterBottom variant="overline" component="h3">
                        Fecha: 
                      </Typography>
                    <Typography gutterBottom variant="subtitle2" component="h2">
                      Descripción del Evento:
                    </Typography>
                    <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum id nulla sit amet gravida. Proin facilisis dictum lorem in volutpat. Phasellus sed blandit dui. Aliquam erat volutpat. Morbi rhoncus sem a pharetra vestibulum. Quisque odio mauris, sollicitudin nec risus vel, pellentesque pharetra urna. In aliquam ligula a urna imperdiet, sit amet fermentum turpis imperdiet. Phasellus elementum pulvinar nunc et scelerisque. Donec eget ex imperdiet, congue libero in, placerat libero. Sed id nulla pellentesque, semper dolor vel, molestie sapien.

Curabitur ultricies quam justo, a egestas quam mo ultricies dolor, ut cursus odio tempor at. Aliquam finibus ex eget felis aliquet, sed pulvinar diam congue. Proin dictum tempor scelerisque. Sed quis facilisis dolor. Vivamus mauris purus, efficitur nec rutrum vel, pharetra et lacus. Vestibulum eget scelerisque lorem. Mauris ac purus ut sapien pharetra congue. Vivamus pharetra dapibus imperdiet. Ut eu dolor vel magna volutpat dapibus. Morbi ac dolor in risus hendrerit malesuada nec quis ante. Nullam non neque erat. Cras interdum hendrerit pulvinar. Suspendisse ornare quis libero eu pretium.

                    </Typography>
                  </CardContent>
                  <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                 </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

    
    </div>
  );
}

export default withRoot(SignUp);
