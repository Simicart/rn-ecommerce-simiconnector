import { useAppContext } from '../../context';

export const useLoading = () => {
  const [appState, appApi] = useAppContext();

  const { isLoading, loadingType } = appState;

  const { setLoading, setLoadingType } = appApi;

  return {
    loading: isLoading,
    loadingType: loadingType,
    setLoading: setLoading,
    setLoadingType: setLoadingType,
  };
};
