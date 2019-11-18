import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Field, Form, FormSpy } from "react-final-form";
import AppForm from "./modules/views/AppForm";
import Typography from "./modules/components/Typography";
import FileUpload from "./modules/components/FileUpload";
import { required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import { Redirect } from "react-router-dom";

import { addpost } from "./services/firebase";

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

function SignUp({ setAuthentication, isAuth, user  }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = values => {
    const errors = required(
      ["titulo", "autor", "lugar", "descripcion", "fecha"],
      values
    );

    return errors;
  };

  const onSubmit = async ({ titulo, autor, lugar, descripcion, fecha }) => {
    setSent(true);

    try {
      console.log("titulo: " + titulo);
      addpost(
        titulo,
        autor,
        lugar,
        descripcion,
        fecha,
        "aun no hay",
        "hisaaca20@gmail.com"
      );
    } catch (e) {
      setSent(false);
    }
  };

  return (
    <div>
      {isAuth ? <div /> : <Redirect to="/login?continue=/crearEvento" />}

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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Autor"
                    name="autor"
                    required
                  />
                </Grid>
              </Grid>

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

              <FileUpload />

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
