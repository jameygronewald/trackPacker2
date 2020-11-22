import axios from 'axios';
import { RegisterCredentials } from '../../views/Register/interfaces';
import { LoginCredentials } from '../../views/LandingPage/interfaces';

const config = { headers: { 'Content-Type': 'application/json' } };

export const userRequests = {
  register: (newUser: RegisterCredentials) =>
    axios.post('http://localhost:3001/api/user/register', newUser, config),

  loginUser: (credentials: LoginCredentials) =>
    axios.post('http://localhost:3001/api/auth', credentials, config),

  getUser: () => axios.get('http://localhost:3001/api/auth'),
};
