import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});
