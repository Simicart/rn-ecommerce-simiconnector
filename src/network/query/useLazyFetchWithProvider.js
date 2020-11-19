import { useFetchWithProvider } from './useFetchWithProvider.js';

/***
 *
 * @param props
 * @returns {[function(): Promise<{data: *}|{error: *}>, {cancel: (function(): void), data: null, refetch: (function(): Promise<{data: *}|{error: *}>), loading: boolean, error: null}]}
 *
 * Work similarly as useFetchWithProvider, and lazily make request like useLazyFetch
 */
const useLazyFetchWithProvider = (props) => {
  const fetch_object = useFetchWithProvider({
    ...props,
    skip: true,
  });

  const { refetch: makeRequest } = fetch_object;
  return [makeRequest, fetch_object];
};

export { useLazyFetchWithProvider };
