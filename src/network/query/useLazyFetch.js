import { useCallback, useEffect, useState } from 'react';
import { useFetch } from './useFetch.js';

const useLazyFetch = (props) => {
  const [shouldRequest, setShouldRequest] = useState(false);

  const fetch_object = useFetch({
    ...props,
    skip: !shouldRequest,
  });

  const makeRequest = useCallback(() => {
    setShouldRequest(true);
  }, []);

  return [makeRequest, fetch_object];
};

export { useLazyFetch };
