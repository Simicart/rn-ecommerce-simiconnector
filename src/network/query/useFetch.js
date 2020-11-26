import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isDeeplyEqual } from '../../utils/isObjectDeeplyEqual.js';
import { request } from './data.flow.js';
import { resolveNetworkStatus } from '../utils/resolveNetworkStatus.js';
import { fetchData as _fetch_data } from './fetchData.js';

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
    timeout = 20000,
    token = null,
    skip = false,
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
    console.log(JSON.stringify(headerParams ?? {}));
    setData(null);
    setError(null);
    setLoading(true);

    return _fetch_data({
      method: method,
      baseURL: baseURL,
      endPoint: endPoint,
      resourceId: resourceId,
      token: token,
      headers: headers,
      headerParams: headerParams,
      bodyParams: bodyParams,
      timeout: timeout,
      source: source,
    })
      .then(({ data: res }) => {
        setData(res?.data);
        setError(null);
        console.info(
          `request status: ${res?.status} --> ` +
            `${res?.statusText ?? resolveNetworkStatus(res.status)}`
        );
        setLoading(false);
        return {
          data: res?.data,
        };
      })
      .catch(({ error }) => {
        if (error?.message === '_request_cancelled') {
          setLoading(false);
        } else {
          setError(error);
          console.info(`done with error: ${error?.toString()} 🌧️`);
          console.info(error);
          setLoading(false);

          return {
            error: error,
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
