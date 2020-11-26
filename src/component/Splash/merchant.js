import { useStoreConfig } from '../../hooks/Splash/useStoreConfig';

const MerchantConfig = (props) => {
  const { storeId, currencyCode } = props;

  useStoreConfig({ storeId, currencyCode });

  return null;
};

export default MerchantConfig;
