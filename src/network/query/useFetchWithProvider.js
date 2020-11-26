import { useAppContext, useCustomerContext } from '../../context';
import { useFetch } from './useFetch.js';

/***
 *
 * @param props
 * @returns {{cancel: (function(): void), data: null, refetch: (function(): Promise<{data: *}|{error: *}>), loading: boolean, error: null}}
 *
 * When a component has MagicProvider or AppContextProvider, this hook can be used.
 * <p>It take baseURL and token </p> from redux to use as default value.
 * <p> you should set baseURL and token with setBaseURL and setBaseToken from useAppContext before using it.
 *
 * <p>Example<p>
 *   <code>
 *     useFetchWithProvider({
 *       endpoint: '/posts'
 *     }
 *    </code
 */

export const useFetchWithProvider = (props) => {
  const [appState] = useAppContext();
  const { baseURL, baseToken } = appState;
  const [customerState] = useCustomerContext();
  const { email, password, hashed_password, isLoggedIn } = customerState;
  const { initialGetParams } = props;

  let requestParams = initialGetParams ?? {};
  if (isLoggedIn) {
    requestParams = {
      email: email,
      password: hashed_password || password,
      ...requestParams,
    };
  }

  return useFetch({
    baseURL: baseURL ?? '',
    token: baseToken ?? '',
    ...props,
    initialGetParams: requestParams,
  });
};
