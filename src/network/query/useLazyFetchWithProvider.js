import { useFetchWithProvider } from './useFetchWithProvider.js';

const useLazyFetchWithProvider = (props) => {
  const fetch_object = useFetchWithProvider({
    ...props,
    skip: true,
  });

  const { refetch: makeRequest } = fetch_object;
  return [makeRequest, fetch_object];
};

export { useLazyFetchWithProvider };
