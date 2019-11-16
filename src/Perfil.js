import withRoot from "./modules/withRoot";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import { Consumer } from "./AuthContext";

import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import Grid from "@material-ui/core/Grid";

import { mostrarInfo } from "./services/firebase";

var auth;
var db;
var currentUser;
var nombrePersona;
var apellidoPersona;
var correoPersona;

const useStyles = makeStyles(theme => ({
  imgFluid: {
    maxWidth: "100%",
    height: "auto"
  },
  imgRounded: {
    borderRadius: "6px !important"
  },
  imgRoundedCircle: {
    borderRadius: "50% !important"
  }
}));

function Perfil() {

  const classes = useStyles();

  const [sent, setSent] = React.useState(false);

  const handleSubmit = () => {
    setSent(true);
  };

  const firebase = require("firebase");
    // Required for side-effects
     require("firebase/firestore");
     require("firebase/auth");
    auth = firebase.auth();
    db = firebase.firestore();
    currentUser = auth.currentUser;
  // Create a query against the collection


    try {
      let docRef = db.collection('Usuarios').doc(currentUser.email);
      let getDoc = docRef.get().then(doc => {
      nombrePersona = doc.get("Nombre");
      apellidoPersona = doc.get("Apellido");
      correoPersona = doc.get("Email");
    })
    } catch (error) {}





  return (
    <Consumer>
      {({user, isAuth, userDB}) => (
        <div>
          <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom align="center">
              Perfil de<br/>
            </Typography>
            <Typography variant="h4" gutterBottom marked="center" align="center">
              {nombrePersona}
            </Typography>
          </React.Fragment>

          <Grid container justify="center" alignItems="center">
            <Avatar alt="Remy Sharp" src={(user && user.photoUrl) || ''} className={classes.bigAvatar} />
          </Grid>

          <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
            {({ handleSubmit2, submitting }) => (
              <form onSubmit={handleSubmit2} className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} margin-top = "0.8px" >
                    <Field
                      autoFocus
                      component={RFTextField}
                      autoComplete="fname"
                      fullWidth
                      defaultValue = {nombrePersona}
                      label="Nombre"
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={RFTextField}
                      autoComplete="lname"
                      fullWidth
                      defaultValue = {apellidoPersona}
                      label="Apellido"
                      name="apellido"
                    />
                  </Grid>
                </Grid>
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  disabled={true}
                  fullWidth
                  defaultValue = {correoPersona}
                  label="Correo"
                  margin="normal"
                  name="email"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? "Actualizando…" : "Actualizar"}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
      </div>
      )}
    </Consumer>
  )
}


function getDocument(db) {
  // [START get_document]
  let cityRef = db.collection('Usuarios').doc('hisaaca10@gmail.com');
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
  // [END get_document]

  return getDoc;
}


export default withRoot(Perfil);