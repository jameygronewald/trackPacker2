import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from './functions';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const LogoutButton = () => {
  const classes = useStyles();

  

  return (
    <div className={classes.root}>
      <div>
        <Link className='logoutButton' to='/'>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LogoutButton;
