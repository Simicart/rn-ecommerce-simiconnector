import { useEffect } from 'react';
import { useCustomerContext } from '../../context';
import { useLazyFetchWithProvider } from '../../network';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';

export const useLogIn = async ({ email, password, start }) => {
  const [, customerApi] = useCustomerContext();
  const { setLoggedIn } = customerApi;
  const [request, { data, error, loading }] = useLazyFetchWithProvider({
    endPoint: '',
    initialGetParams: {
      email: email,
      password: password,
    },
  });

  useEffect(() => {
    if (start) {
      request();
    }
  }, [start]);

  if (error && !loading) {
    console.info(`Error logging in:${error.toString()}`);
  } else if (isObjectTruthy(data) && !loading) {
    console.log(JSON.stringify(data?.customer?.simi_hash, null, 2));
    setLoggedIn({
      email: email,
      password: password,
      hashed_password: data?.customer?.simi_hash ?? '',
    });
  }
};
