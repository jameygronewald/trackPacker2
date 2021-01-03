import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

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

const LogoutButton: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const { setUserState } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <div>
        <Link className='logoutButton' to='/'>
          <Button
            variant='contained'
            className={classes.button}
            onClick={() => {
              localStorage.clear();
              setUserState({ user: null, isAuthenticated: false });
            }}
          >
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LogoutButton;
