import { useAppContext } from '../../context';
import { useFetch } from './useFetch.js';

export const useFetchWithProvider = (props) => {
  const [appState] = useAppContext();
  const { baseURL, baseToken } = appState;

  return useFetch({
    baseURL: baseURL ?? '',
    token: baseToken ?? '',
    ...(props ?? {}),
  });
};
