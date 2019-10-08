import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";

import { signup } from "./services/firebase";

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

function SignUp({ setAuthentication }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = values => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    setSent(true);

    try {
      const user = await signup(email, password, firstName, lastName);
      sessionStorage.setItem("user", user.user.uid);
      setAuthentication(true);
    } catch (e) {
      setSent(false);
    }
  };

  return (
    <div>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Crear cuenta
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/login/" underline="always">
              ¿Ya tienes cuenta?
            </Link>
          </Typography>
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
                    label="Nombre"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Apellido"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Correo"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Contraseña"
                type="password"
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
                {submitting || sent ? "Procesando…" : "Crear Cuenta"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </div>
  );
}

export default withRoot(SignUp);
