import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customer_actions from '../store/customer.js';

const CustomerContext = createContext();

const CustomerContextProviderCore = (props) => {
  const { customer_actions, customerState, children } = props;

  const customerApi = useMemo(
    () => ({
      ...customer_actions,
    }),
    [customer_actions]
  );

  const contextValue = useMemo(() => [customerState, customerApi], [
    customerApi,
    customerState,
  ]);

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

const mapStateToProps = ({ customer }) => ({ customerState: customer });

const mapDispatchToProps = (dispatch) => ({
  customer_actions: bindActionCreators(customer_actions, dispatch),
});

const customerContextProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerContextProviderCore);

export { customerContextProvider };
export const useCustomerContext = () => useContext(CustomerContext);
