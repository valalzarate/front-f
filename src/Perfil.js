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

  return (
    <Consumer>
      {({user, isAuth, userDB}) => (
        <div>
          <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom align="center">
              Perfil<br/>
            </Typography>
            <Typography variant="h4" gutterBottom marked="center" align="center">
              {userDB && userDB.Nombre}
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

export default withRoot(Perfil);