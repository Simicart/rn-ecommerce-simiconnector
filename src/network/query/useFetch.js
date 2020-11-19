import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { request } from './data.flow.js';

const combineEndpoint = (endPoint = '', resourceId = '') => {
  if (!endPoint) {
    return '/';
  }
  const result =
    (/^http.*$/.test(endPoint) ? '' : '/') +
    endPoint +
    (endPoint[endPoint.length - 1] === '/' ? '' : '/') +
    resourceId;
  console.info(`request with ${result}`);
  return result;
};

const isDeeplyEqual = (a, b): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/***
 *
 * @param payload
 * @returns {{cancel: (function(): void), data: null, refetch: (function(): Promise<{data: *} | {error: *}>), loading: boolean, error: null}}
 *
 * A hook that request data, and return loading state, data or error, and other means to control request
 * <p> Example: </p>
 *
 * <code> useFetch({
 *   baseURL: 'https://example.com',
 *   endPoint: '/posts'
 * })
 * </code>
 */

const useFetch = (payload: request = {}) => {
  const {
    baseURL = '',
    method = 'GET',
    endPoint = '',
    resourceId = '',
    initialGetParams = null,
    initialBodyParams = null,
    headers: initialHeader = null,
    timeout = 10000,
    skip = false,
    token = null,
    cancel = false,
  } = payload;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [headerParams, setHeaderParams] = useState(initialGetParams);
  const [bodyParams, setBodyParams] = useState(initialBodyParams);
  const [headers, setHeaders] = useState(initialHeader);

  if (!isDeeplyEqual(initialGetParams, headerParams)) {
    setHeaderParams(initialGetParams);
  }

  if (!isDeeplyEqual(initialBodyParams, bodyParams)) {
    setBodyParams(initialBodyParams);
  }

  if (!isDeeplyEqual(initialHeader, headers)) {
    setHeaders(initialHeader);
  }

  // cancel request
  const CancelToken = axios.CancelToken;

  const source = useMemo(CancelToken.source, [
    resourceId,
    headerParams,
    bodyParams,
    baseURL,
    endPoint,
  ]);

  const cancelRequest = useCallback(() => {
    console.info('Request cancelled');
    source.cancel('_request_cancelled');
  }, [resourceId, headerParams, bodyParams, baseURL, endPoint]);

  const fetchData = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(true);
    console.log(headerParams);

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
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.error) {
          const errorList = res.data.errors;
          setError(errorList);

          const errorObject =
            errorList?.length > 1
              ? errorList[0]
              : {
                  code: -16,
                  message: `Unexpected Error 😢`,
                };

          console.info(
            `Message successfully failed with code: ``${errorObject?.code} --> ${errorObject?.message} 🌧️`
          );

          setError(errorObject);
          setLoading(false);
        } else {
          setData(res.data);
          setError(null);
          console.info(
            `request status: ${res.status} --> ${res.statusText} 🔥`
          );
          setLoading(false);
        }

        return {
          data: res.data,
        };
      })
      .catch((err) => {
        if (err.message === '_request_cancelled') {
          setLoading(false);
        } else {
          setError(err);
          console.info(`done with error: ${err.toString()} 🌧️`);
          console.info(err);
          setLoading(false);

          return {
            error: err,
          };
        }
      });
  }, [resourceId, headerParams, bodyParams, baseURL, endPoint]);

  const refetch = useCallback(async () => {
    console.info('re fetched');
    if (isLoading) {
      try {
        source.cancel('Re-fetched');
      } catch (e) {
        console.info(e);
      }
      // no need to change loading, as request is made right after
      // setLoading(false);
    }
    return fetchData();
  }, [isLoading, source, fetchData]);

  useEffect(() => {
    if (!skip && !cancel) {
      console.info('fetching');
      fetchData();
    }
  }, [fetchData, skip]);

  return {
    loading: isLoading,
    data: data,
    error: error,
    cancel: cancelRequest,
    refetch: refetch,
  };
};

export { useFetch };
