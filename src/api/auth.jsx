import { baseUrl } from '.';
import Axios from 'axios';

export const registerUser = (data, success, failure) => {
  Axios.post(`${baseUrl}/auth/register`, data)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const loginUser = (data, success, failure) => {
  Axios.post(`${baseUrl}/auth/login`, data)
    .then((response) => success(response))
    .catch((error) => failure(error));
};
