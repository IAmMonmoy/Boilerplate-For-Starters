import axios from 'axios';
import { SERVER_API_URL } from '../utils/constants';
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
const setupAxiosInterceptors = () => {
  const onResponseSuccess = response => response.data.result;
  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
    }
    return Promise.reject(err);
  };
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
export default setupAxiosInterceptors;
