import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";

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

function SignUp() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <div>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contactanos
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/login/" underline="always">
              {'Cuentanos que piensas, si tienes alguna duda o sugerencia.'
              + 'recuerda que siempre estamos atentos a tus mensajes.'},
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit2, submitting }) => (
            <form onSubmit={handleSubmit2} className={classes.form} noValidate>
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
                    label="Asunto"
                    name="Subject"
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
                name="message"
                label="Mensaje"
                type="textarea"
                margin="normal"
                multiline={true}
                rows={8}
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
                {submitting || sent ? "Procesando…" : "Enviar"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </div>
  );
}

export default withRoot(SignUp);
