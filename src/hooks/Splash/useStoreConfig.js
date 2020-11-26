import { useAppContext } from '../../context';
import { useFetchWithProvider } from '../../network';
import { useEffect } from 'react';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';

export const useStoreConfig = ({ storeId, currencyCode }) => {

    const [{ merchant_config }, { setMerchantConfig }] = useAppContext();

    const { data, loading, error } = useFetchWithProvider({
        endPoint: 'simiconnector/rest/v2/storeviews/',
        resourceId: storeId ?? 'default',
        initialGetParams: {
            currency: currencyCode
        },
        cancel: isObjectTruthy(merchant_config),
    });

    useEffect(() => {
        if (isObjectTruthy(data)) {
            setMerchantConfig(data.storeview);
        }
    }, [data, setMerchantConfig]);

    return null;

}