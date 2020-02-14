import axios from 'axios';
import { HttpError } from './error';

export default function getClient(config = {}) {
  const client = axios.create(config);

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        throw new HttpError(error.response);
      }
      throw error;
    }
  );

  return client;
}
