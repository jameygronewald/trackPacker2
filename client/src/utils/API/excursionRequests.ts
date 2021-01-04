import axios from 'axios';

export const excursionRequests = {
  addExcursion: (name: string) => axios.post('/api/excursion', name),

  deleteExcursion: (id: string) => axios.delete(`/api/excursion/${id}`),
};
