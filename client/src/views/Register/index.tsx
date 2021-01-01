import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RegisterCredentials } from './interfaces';
import { userRequests } from '../../utils/API/userRequests';
import { UserContext } from '../../context/UserContext';
import setAuthToken from "../../utils/setAuthTokenToHeaders";
import {
  Container,
  TextField,
  Box,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import './Register.css';

interface Props {}

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

const Register = (props: Props) => {
  const classes = useStyles();

  const [registerFormData, setRegisterFormData] = useState<RegisterCredentials>(
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }
  );

  const { email, password, firstName, lastName } = registerFormData;

  const { setUserState, userState, isAuthenticated } = useContext(
    UserContext
  );

  const handleChange = (e: any) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await userRequests.register(registerFormData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    setAuthToken(token)
    const userResponse = await userRequests.getUser();
    console.log(userResponse.data);
    setUserState({ ...userState, user: userResponse, isAuthenticated: true, token });
  };

  if (isAuthenticated) {
    return <Redirect to='/inventory' />;
  }

  return (
    <div>
      <Container maxWidth='sm'>
        <Box m='2rem' p={2} mx='auto'>
          <Box
            alignItems='center'
            justifyContent='center'
            display='flex'
            p={2}
            mx='auto'
          >
            <Typography variant='h4'>Welcome To TrackPacker!</Typography>
          </Box>
          <form onSubmit={handleSubmit} className='login'>
            <Box
              alignItems='center'
              justifyContent='center'
              display='flex'
              p={2}
              mx='auto'
            >
              <TextField
                name='firstName'
                label='First'
                value={firstName}
                onChange={e => handleChange(e)}
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
                name='lastName'
                label='Last'
                value={lastName}
                onChange={e => handleChange(e)}
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
                name='email'
                label='Email'
                value={email}
                onChange={e => handleChange(e)}
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
                type='password'
                name='password'
                label='Password'
                value={password}
                onChange={e => handleChange(e)}
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
                Create Account
              </Button>
            </Box>
            <Box
              alignItems='center'
              justifyContent='center'
              display='flex'
              p={2}
              mx='auto'
            >
              <Link className='backToLoginLink' to='/'>
                <Button className={classes.button} variant='contained'>
                  Back To Login
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
