import { useAppContext } from '../context';

export const useLoading = () => {
  const [appState, appApi] = useAppContext();

  const { isLoading, loadingType, loadingVectors } = appState;

  const {
    setLoading,
    setLoadingType,
    addLoadingVector,
    removeLoadingVector,
    setGlobalLoading,
    unsetGlobalLoading,
  } = appApi;

  return {
    loading: isLoading,
    loadingType: loadingType,
    loadingVectors: loadingVectors,
    setLoading: setLoading,
    setLoadingType: setLoadingType,
    addLoadingVector: addLoadingVector,
    removeLoadingVector: removeLoadingVector,
    setGlobalLoading: setGlobalLoading,
    unsetGlobalLoading: unsetGlobalLoading,
  };
};
