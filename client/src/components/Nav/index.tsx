import React, { useContext } from 'react';
import LogoutButton from './LogoutButton';
import { UserContext } from '../../context/UserContext';

import logo from './logo.png';
import { makeStyles, Toolbar, Typography } from '@material-ui/core';
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

const Nav: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const { isAuthenticated } = useContext(UserContext);

  return (
    <div className={`${classes.root} navbar`}>
      <Toolbar color='transparent' variant='dense'>
        <img src={logo} alt='logo' className={classes.logo} />
        <Typography variant='h5' className={classes.title}>
          TrackPacker
        </Typography>
        {isAuthenticated && <LogoutButton />}
      </Toolbar>
    </div>
  );
};

export default Nav;
