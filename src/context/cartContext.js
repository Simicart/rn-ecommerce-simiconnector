import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cart_slice from '../store/cart_slice.js';

const CartContext = createContext();

const CartContextProviderCore = (props) => {
  const { cart_slice, cartState, children } = props;

  const cartApi = useMemo(
    () => ({
      ...cart_slice,
    }),
    [cart_slice]
  );

  const contextValue = useMemo(() => [cartState, cartApi], [
    cartApi,
    cartState,
  ]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

const mapStateToProps = ({ cart }) => ({ cartState: cart });

const mapDispatchToProps = (dispatch) => ({
  cart_slice: bindActionCreators(cart_slice, dispatch),
});

const cartContextProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContextProviderCore);

export { cartContextProvider };
export const useCartContext = () => useContext(CartContext);
