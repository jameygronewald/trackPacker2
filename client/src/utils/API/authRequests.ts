import axios from 'axios';
import { RegisterCredentials } from '../../views/Register/interfaces';

export const authRequests = {
  register: (user: RegisterCredentials) => axios.post('/api/auth/register', user, {headers: {'Content-Type': 'application/json'}}),
};
