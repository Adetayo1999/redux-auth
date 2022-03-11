import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { baseUrl } from '../api';

const Auth = {
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    let decoded;
    try {
      decoded = jwt_decode(token);
    } catch (error) {
      decoded = null;
    }
    if (!decoded || !decoded.iat || !decoded.exp) {
      return false;
    }
    return true;
  }
};

export const AxiosWithAuth = Axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default Auth;
