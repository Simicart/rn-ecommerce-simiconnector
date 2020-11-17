import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { request } from './data.flow.js';

const combineEndpoint = (endPoint = '', resourceId = '') => {
  if (!endPoint) {
    return '/';
  }
  const x =
    (/^http.*$/.test(endPoint) ? '' : '/') +
    endPoint +
    (endPoint[endPoint.length - 1] === '/' ? '' : '/') +
    resourceId;
  console.info(`request with ${x}`);
  return x;
};

const isDeeplyEqual = (a, b): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const useFetch = (payload: request = {}) => {
  const {
    baseURL = '',
    method = 'GET',
    endPoint = '',
    resourceId = '',
    initialGetParams = {},
    initialBodyParams = {},
    headers = {},
    timeout = 5000,
    skip = false,
    token = null,
  } = payload;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [headerParams, setHeaderParams] = useState(initialGetParams);
  const [bodyParams, setBodyParams] = useState(initialBodyParams);
  const [currentHeaders, setHeaders] = useState(headers);

  useEffect(() => {
    if (!isDeeplyEqual(initialGetParams, headerParams)) {
      setHeaderParams(initialGetParams);
    }
  }, [initialGetParams]);

  useEffect(() => {
    if (!isDeeplyEqual(initialBodyParams, bodyParams)) {
      setBodyParams(initialBodyParams);
    }
  }, [initialBodyParams]);

  useEffect(() => {
    if (!isDeeplyEqual(headers, currentHeaders)) {
      setHeaders(headers);
    }
  }, [currentHeaders]);

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

    return axios
      .request({
        method: method,
        baseURL: baseURL,
        url: combineEndpoint(endPoint, resourceId),
        headers: {
          'Content-Type': 'application/json',
          //  Unsafe usage of md5
          // secret should not be empty string :)
          'Authorization': 'Bearer ' + (token ?? 'Please fill in secret 🔑'),
          ...currentHeaders,
        },
        params: headerParams,
        data: bodyParams,
        timeout: timeout,
        cancelToken: source.token,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setError(null);
        console.info(`request status: ${res.status} --> ${res.statusText} 🔥`);

        return {
          data: res.data,
        };
      })
      .catch((err) => {
        if (err.message === '_request_cancelled') {
          setLoading(false);
        } else {
          setError(err);
          setLoading(false);
          console.info(`done with error: ${err.toString()} 🌧️`);
          console.info(err);

          return {
            error: err,
          };
        }
      });
  }, [resourceId, headerParams, bodyParams, baseURL, endPoint]);

  const refetch = async () => {
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
  };

  useEffect(() => {
    if (!skip) {
      if (baseURL) {
        console.info('fetching');
        fetchData();
      } else {
        console.info('currently request with no url ☂️');
      }
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
