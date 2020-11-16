import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as checkout_actions from '../store/checkout_slice.js';

const CheckoutContext = createContext();

const CheckoutContextProviderCore = (props) => {
  const { checkout_actions, checkoutState, children } = props;

  const checkoutApi = useMemo(
    () => ({
      ...checkout_actions,
    }),
    [checkout_actions]
  );

  const contextValue = useMemo(() => [checkoutState, checkoutApi], [
    checkoutApi,
    checkoutState,
  ]);

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

const mapStateToProps = ({ checkout }) => ({ checkoutState: checkout });

const mapDispatchToProps = (dispatch) => ({
  checkout_actions: bindActionCreators(checkout_actions, dispatch),
});

const checkoutContextProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContextProviderCore);

export { checkoutContextProvider };
export const useCheckoutContext = () => useContext(CheckoutContext);
