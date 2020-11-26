import axios from 'axios';
import { combineEndpoint } from '../utils/combineEndpoint.js';
import type { request } from './data.flow.js';

export const fetchData = async (payload: request) => {
  const {
    method = 'GET',
    baseURL = '',
    endPoint = '',
    resourceId = '',
    token = '',
    headers = null,
    headerParams = null,
    bodyParams = null,
    timeout = 7000,
    source = null,
  } = payload;

  return axios
    .request({
      method: method,
      baseURL: baseURL,
      url: combineEndpoint(endPoint, resourceId),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ?? 'Please fill in secret 🔑'),
        ...headers,
      },
      params: headerParams,
      data: bodyParams,
      timeout: timeout,
      cancelToken: source?.token ?? null,
    })
    .then((res) => {
      return {
        data: res,
      };
    })
    .catch((err) => {
      return {
        error: err,
      };
    });
};
