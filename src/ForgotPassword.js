import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";

import { passwordRecovery } from "./services/firebase";

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

function ForgotPassword() {
  const classes = useStyles();

  const [sent, setSent] = React.useState(false);

  const validate = values => {
    const errors = required(["email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async ({ email } = {}) => {
    setSent(true);

    try {
      await passwordRecovery(email);
    } catch (e) {
      setSent(false);
    }
  };

  return (
    <div>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            ¿Olvidaste tu contraseña?
          </Typography>
          <Typography variant="body2" align="center">
            {"Ingresa tu correo debajo y te enviaremos" +
              "un link para reiniciar tu contraseña."}
          </Typography>
        </React.Fragment>
        <Form onSubmit={() => {}} validate={validate}>
          {({ submitting, values }) => (
            <form
              onSubmit={ev => {
                ev.preventDefault();
                onSubmit(values);
              }}
              className={classes.form}
              noValidate
            >
              <Field
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
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
              >
                {submitting || sent
                  ? "Procesando…"
                  : "Enviar link de recuperación"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </div>
  );
}

export default withRoot(ForgotPassword);
