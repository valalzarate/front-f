import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import  Button  from '@material-ui/core/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundI =
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

 const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundI})`, // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundI} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        ¡EL VACILE HA LLEGADO!
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Descubre los mejores eventos que hay en baranquilla, disfruta de las mejores actividades con nosotros.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/signup/"
      >
        Comienza ya
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        ¡Descubre todas las aventuras que barranquilla te ofrece!
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);

