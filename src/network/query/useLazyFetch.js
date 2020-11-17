import { useCallback, useEffect, useState } from 'react';
import { useFetch } from './useFetch.js';

const useLazyFetch = (props) => {
  const fetch_object = useFetch({
    ...props,
    skip: true,
  });

  const { refetch: makeRequest } = fetch_object;
  return [makeRequest, fetch_object];
};

export { useLazyFetch };
