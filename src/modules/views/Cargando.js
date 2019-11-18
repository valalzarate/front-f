import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(8, 0, 6)
  }
}));

export default function Eventos() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container className={classes.root} component="section">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              CARGANDO...
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             redireccionando de pagina
            </Typography>
          </Container>
        </div>
       </main>
    </React.Fragment>
  );
}
