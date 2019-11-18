import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";

const styles = theme => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    background: "#c31432",
    background: "-webkit-linear-gradient(to left, #673AB7, #c31432)",
    background: "linear-gradient(to left, #673AB7, #c31432)",
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: "#FFB300"
  }
});

function AppAppBar({ classes, isAuth, setAuthentication, user }) {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {"El Vacile"}
          </Link>
          <div className={classes.right}>
            {isAuth && user ? (
              <div>
                {
                  <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    className={classes.rightLink}
                    href="/crearEvento"
                  >
                    Crear evento
                  </Link>
                }
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/perfil"
                >
                  {`¡Hola, ${user.Nombre}!`}
                </Link>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="#"
                  onClick={e => setAuthentication(false)}
                >
                  {`Salir`}
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/login"
                >
                  {"Iniciar Sesión"}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href="/signup/"
                >
                  {"Crear Cuenta"}
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
