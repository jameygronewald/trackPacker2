import React from 'react';
import { makeStyles, Toolbar, Typography } from '@material-ui/core';
import logo from './logo.png';
import LogoutButton from './LogoutButton';
import './Nav.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
  },
  logo: {
    maxWidth: 100,
  },
}));

const Nav = () => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} navbar`}>
      <Toolbar color='transparent' variant='dense'>
        <img
          src={logo}
          alt='logo'
          className={classes.logo}
        />
        <Typography variant='h5' className={classes.title}>
          TrackPacker
        </Typography>
        <LogoutButton />
      </Toolbar>
    </div>
  );
};

export default Nav;
