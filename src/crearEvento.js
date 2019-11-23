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
import FileUpload from "./modules/components/FileUpload";
import { required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import { Redirect } from "react-router-dom";

import { addpost, db } from "./services/firebase";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  feedback: {
    marginTop: theme.spacing(2)
  }
}));

function SignUp({ setAuthentication, isAuth, user }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [category, setCategory] = React.useState("Playeros");
  const [image, setImage] = React.useState(null);
  const [eventCreated, setEventCreated] = React.useState(null)

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
        .then(r => 
          setEventCreated({
            id: r.id,
            ...r.data()
          })
        )
    } catch (e) {
      setSent(false);
    }
  };

  if (eventCreated) {
    return <Redirect to={`/evento/${eventCreated.id}`}></Redirect>
  }

  return (
    <div>
      {isAuth ? (
        user && user.TipoUsuario == 0 ? (
          <Redirect to="/" />
        ) : (
          <div />
        )
      ) : (
        <Redirect to="/login?continue=/crearEvento" />
      )}

      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Crear Evento
          </Typography>
          <Typography variant="body2" align="center"></Typography>
        </React.Fragment>
        <Form
          onSubmit={() => {}}
          // subscription={{ submitting: true }}
          validate={validate}
        >
          {({ submitting, values }) => (
            <form
              onSubmit={ev => {
                ev.preventDefault();
                onSubmit(values);
              }}
              className={classes.form}
              noValidate
            >
              <Grid>
                <label>Imagen del evento</label><br></br>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{
                    
                  }}
                  onChange={e => setImage(e.target.files[0])}
                />
              </Grid>

              <br></br>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="Titulo"
                    name="titulo"
                    required
                  />
                </Grid>
              </Grid>

              <InputLabel style={{ marginTop: "10px" }}>Categoria</InputLabel>
              <Select
                name="categoria"
                onChange={e => setCategory(e.target.value)}
                value={category}
              >
                <MenuItem value="Playeros">Playeros</MenuItem>
                <MenuItem value="Relajación">Relajación</MenuItem>
                <MenuItem value="Aventureros">Aventureros</MenuItem>
                <MenuItem value="Tour">Tour</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Gastronómicos">Gastronómicos</MenuItem>
                <MenuItem value="Caminatas">Caminatas</MenuItem>
                <MenuItem value="Fitness">Fitness</MenuItem>
                <MenuItem value="Lectura">Lectura</MenuItem>
              </Select>

              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="lugar"
                autoComplete="current-lugar"
                label="Lugar"
                type="lugar"
                margin="normal"
              />

              <Field
                autoComplete="descripcion"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Descripcion"
                type="textarea"
                margin="normal"
                name="descripcion"
                multiline={true}
                rows={8}
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="fecha"
                autoComplete="current-fecha"
                label="Fecha"
                type="fecha"
                margin="normal"
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
                {submitting || sent ? "Procesando…" : "Crear"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </div>
  );
}

export default withRoot(SignUp);
