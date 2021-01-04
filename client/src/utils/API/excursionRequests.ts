import axios from 'axios';
import { NewExcursion } from '../../views/Excursions/interfaces';

export const excursionRequests = {
  addExcursion: (name: NewExcursion) => axios.post('/api/excursion', name),

  deleteExcursion: (id: string) => axios.delete(`/api/excursion/${id}`),
};
