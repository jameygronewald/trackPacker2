import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginCredentials } from './interfaces';
import { userRequests } from '../../utils/API/userRequests';
import {
  Container,
  TextField,
  Box,
  Button,
  makeStyles,
} from '@material-ui/core';
import './LandingPage.css';

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

interface Props {}

const LandingPage = (props: Props) => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await userRequests.loginUser(credentials);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container maxWidth='sm'>
        <Box m='2rem' p={2} mx='auto'>
          <form className='login' onSubmit={handleSubmit}>
            <Box
              alignItems='center'
              justifyContent='center'
              display='flex'
              p={2}
              mx='auto'
            >
              <TextField
                onChange={e => handleChange(e)}
                value={credentials.email}
                name='email'
                label='Email'
              />
            </Box>
            <Box
              alignItems='center'
              justifyContent='center'
              display='flex'
              p={2}
              mx='auto'
            >
              <TextField
                onChange={e => handleChange(e)}
                value={credentials.password}
                name='password'
                type='password'
                label='Password'
              />
            </Box>
            <Box
              alignItems='center'
              justifyContent='center'
              display='flex'
              p={2}
              mx='auto'
            >
              <Button
                type='submit'
                className={classes.button}
                variant='contained'
              >
                LOGIN
              </Button>
            </Box>
            <Box
              alignItems='center'
              justifyContent='center'
              display='flex'
              p={2}
              mx='auto'
            >
              <Link className='registerLink' to='/register'>
                <Button className={classes.button} variant='contained'>
                  Register
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
