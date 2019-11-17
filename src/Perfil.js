import withRoot from "./modules/withRoot";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Consumer } from "./AuthContext";
import Button from "@material-ui/core/Button";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import Grid from "@material-ui/core/Grid";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

export const auth = firebase.auth();
export const db = firebase.firestore();

var nombrePersona;
var    apellidoPersona;
var    correoPersona;

const useStyles = makeStyles(theme => ({
  igFluid: {
    maxWidth: "100%",
    height: "auto"
  },
  imgRounded: {
    borderRadius: "6px !important"
  },
  imgRoundedCircle: {
    borderRadius: "50% !important"
  },
  headAvatar: {
    width: "100 px",
    height: "100 px"
  }
}));

function Perfil({ user, isAuth, userDB }) {
  const classes = useStyles();
  require("firebase/firestore");

 const db = firebase.firestore();
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async ({ firstName, apellido }) => {
    setSent(true);

    try {
      const user = auth.currentUser;
      const userActual = db.collection("Usuarios").doc(user.email);
      user.updateProfile({ displayName: firstName +" "+ apellido});
      userActual.update({Nombre: firstName,Apellido: apellido});
    } catch (error) {
      setSent(false);
    }
    
    
  };

  try {
    let docRef = db.collection('Usuarios').doc(user.email).get().then(doc => {
    nombrePersona = doc.get("Nombre");
    apellidoPersona = doc.get("Apellido");
    correoPersona = doc.get("Email");
    console.log("ekl correoSd: "+correoPersona);
  })
  } catch (error) {}
  

  function uploadImage(event) {
    const user = auth.currentUser;
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(user.email);
    const task = storageRef.put(file);
    const userActual = db.collection("Usuarios").doc(user.email);

    task.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error.message);
      },
      async () => {
        const photoURLNEW = await storageRef.getDownloadURL();
        user.updateProfile({photoURLNEW}); //actualiza la foto en autentificacion
        userActual.update({photoURL: photoURLNEW}); //actualiza la foto en la database
      }
    );

    auth.currentUser.updateProfile({
      photoURL: ""
    });
  }

  return (
    <div>
      {!isAuth ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <AppForm>
            <React.Fragment>
              <Typography variant="h3" gutterBottom align="center">
                Perfil de
                <br />
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                marked="center"
                align="center"
              >
               {user.displayName}
              </Typography>
            </React.Fragment>

            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              style={{}}
            >
              <Avatar
                alt="Remy Sharp"
                src={user && user.photoURL ? user.photoURL : ""}
              />


              <Grid>
                {" "}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  
                  multiple
                  type="file"
                  style={{
                    display: "none"
                  }}
                  onChange={e => uploadImage(e)}
                 
                />
                <label
                  htmlFor="contained-button-file"
                  style={{
                    paddingTop: "10px"
                  }}
                >
                  <Button
                    id="upload-button"
                    variant="contained"
                    component="span"
                    className={classes.button}
                  >
                    Actualizar Imagen
                  </Button>
                </label>
              </Grid>
            </Grid>

            <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
              {({ handleSubmit, submitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} margin-top="0.8px">
                      <Field
                        autoFocus
                        component={RFTextField}
                        autoComplete="fname"
                        defaultValue = {user.name}
                        fullWidth
                        label="Nombre"
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={RFTextField}
                        autoComplete="lname"
                        fullWidth
                        label="Apellido"
                        name="apellido"
                      />
                    </Grid>
                  </Grid>
                  <Field
                    autoComplete="email"
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    defaultValue = {user.email}
                    disabled = {true}
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
                    {submitting || sent ? "Actualizando…" : "Actualizar Información"}
                  </FormButton>
                </form>
              )}
            </Form>
          </AppForm>
        </div>
      )}
    </div>
  );
}

export default withRoot(Perfil);