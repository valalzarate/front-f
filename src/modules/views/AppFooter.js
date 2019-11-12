/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "./../components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/info"
                className={classes.block}
              >
                Acera de nosotros
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/terms"
                className={classes.block}
              >
                Terminos y condiciones
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/privacy"
                className={classes.block}
              >
                Privacidad
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/eventos/"
                className={classes.block}
              >
                Eventos
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://www.instagram.com/vacile_quillero/?hl=es-la"
            className={aClasses}
            target="_blank"
          >
            Vacile quillero
          </a>{" "}
          para que conozcas más a Barranquilla
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
