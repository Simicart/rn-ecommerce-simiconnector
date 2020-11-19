import { useFetch } from './useFetch.js';

/***
 *
 * @param props
 * @returns {[function(): Promise<{data: *}|{error: *}>, {cancel: (function(): void), data: null, refetch: (function(): Promise<{data: *}|{error: *}>), loading: boolean, error: null}]}
 *
 * Create a request function and a requestStatus Object.
 * <p> When the function is evoked, the request starts. </p>
 * <p> Example: </p>
 * <code>
 *    const [makeRequest , {data, error}] = useLazyFetch({
 *   baseURL: 'https://example.com',
 *   endPoint: '/posts'
 *    })
 *  </code>
 */

const useLazyFetch = (props) => {
  const fetch_object = useFetch({
    ...props,
    skip: true,
  });

  const { refetch: makeRequest } = fetch_object;
  return [makeRequest, fetch_object];
};

export { useLazyFetch };
