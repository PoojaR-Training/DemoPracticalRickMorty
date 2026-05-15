/**
 * @fileoverview Axios instance configured for the Rick and Morty API.
 * Base URL, timeout and response interceptors are set here.
 */

import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return Promise.reject(new Error('Resource not found'));
      }
      if (status >= 500) {
        return Promise.reject(new Error('Server error. Please try again.'));
      }
    } else if (error.request) {
      return Promise.reject(
        new Error('Network error. Please check your connection.'),
      );
    }
    return Promise.reject(error);
  },
);
