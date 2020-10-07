import axios from 'axios';
import { logsEnum, writeLog } from '../handlers';
import { environment } from '../config';

const baseURL = environment.baseURL;
export let axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (request) => {
    writeLog(logsEnum.info, `> Call to url:${request.url}`);
    return request;
  },
  (error) => {
    writeLog(logsEnum.info, `> Error call to url:${request.url}`);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    writeLog(logsEnum.info, `> RESPONSE from url:${response.config.url} status:${response.status}`);
    return response;
  },
  (error) => {
    writeLog(logsEnum.error, `> ERROR call to url:${error.config.url}`);
    let err;
    const errorResponse = error.response;
    if (typeof errorResponse !== 'undefined') {
      switch (error.response.status) {
        case 401:
          err = new Error('Access denied to the resource');
          err.status = 401;
          err.expose = true;
          break;
        case 404:
          err = new Error('Not Found');
          err.status = 404;
          err.expose = true;
          break;
        default:
          err = new Error('Internal Server Error');
          err.status = 500;
          err.expose = true;
          break;
      }
    } else {
      err = new Error('Internal Server Error');
      err.status = 500;
      err.expose = true;
    }

    return Promise.reject(err);
  },
);

export function postRequest(path, body) {
  return request(`${baseURL}${path}`, { method: 'post', body });
}

export function request(url, { method, body, headers }) {
  return axiosInstance({
    method: method,
    url: url,
    data: body,
    headers: headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
