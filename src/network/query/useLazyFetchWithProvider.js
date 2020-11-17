import { useCallback, useEffect, useState } from 'react';
import { useFetchWithProvider } from './useFetchWithProvider.js';

const useLazyFetchWithProvider = (props) => {
  const [shouldRequest, setShouldRequest] = useState(false);

  const fetch_object = useFetchWithProvider({
    ...props,
    skip: !shouldRequest,
  });

  const makeRequest = useCallback(() => {
    setShouldRequest(true);
  }, []);

  return [makeRequest, fetch_object];
};

export { useLazyFetchWithProvider };
