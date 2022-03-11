import { AxiosWithAuth } from '../auth';

export const getUserProfile = (success, failure) => {
  AxiosWithAuth.get('/user/profile')
    .then((response) => success(response))
    .catch((error) => failure(error));
};
