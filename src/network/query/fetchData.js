import axios from 'axios';
import { combineEndpoint } from '../utils/combineEndpoint.js';
import type { request } from './data.flow.js';

/***
 *
 * @param payload
 * @returns {Promise<T | {error: *}>}
 * This return error, or the whole respond (including status code, status text, data, ....)
 */
export const fetchData = async (payload) => {
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
      if (res?.data?.errors) {
        const errorList = res?.data?.errors;
        throw errorList?.length > 0
          ? errorList[0]?.message
          : `Unexpected Error 😢`;
      } else {
        return {
          data: res,
        };
      }
    })
    .catch((err) => {
      console.info(err.toString());
      return {
        error: err,
      };
    });
};
