import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";

import { login } from "./services/firebase";

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

function SignIn() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = values => {
    const errors = required(["email", "contraseña"], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async ({ email, password }) => {
    setSent(true);

    try {
      const user = await login(email, password);
      sessionStorage.setItem("user", user.user.uid);
    } catch (e) {
      setSent(false);
    }
  };

  return (
    <div>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" align="center">
            {"¿Todavia no tienes cuenta? "}
            <Link href="/signup/" align="center" underline="always">
              ¡Crea tu cuenta aquí!
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={() => {}}
          // subscription={{ submitting: true }}
          validate={validate}
          render={({ handleSubmit, submitting, values }) => (
            <form
              onSubmit={ev => {
                ev.preventDefault();
                onSubmit(values);
              }}
              className={classes.form}
              noValidate
            >
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Correo"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
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
                size="large"
                color="secondary"
                fullWidth
                type="submit"
              >
                {submitting || sent ? "Procesando…" : "Iniciar sesión"}
              </FormButton>
            </form>
          )}
        ></Form>
        <Typography align="center">
          <Link underline="always" href="/forgotPassword/">
            ¿Olvidaste tu contraseña?
          </Link>
        </Typography>
      </AppForm>
    </div>
  );
}

export default withRoot(SignIn);
