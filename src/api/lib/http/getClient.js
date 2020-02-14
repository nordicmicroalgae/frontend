import axios from 'axios';
import { HttpError, HttpClientError, HttpServerError } from './error';

export default function getClient(config = {}) {
  const client = axios.create(config);

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status <= 499) {
          throw new HttpClientError(error.response);
        }
        if (error.response.status >= 500 && error.response.status <= 599) {
          throw new HttpServerError(error.response);
        }
        throw new HttpError(error.response);
      }
      throw error;
    }
  );

  return client;
}
