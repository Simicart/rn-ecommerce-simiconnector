import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  checkout_steps: {},
  currentCheckoutStep: '',
  selectedShippingAddress: '',
  selectedBillingAddress: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialState,
  reducers: {
    setCheckoutStepStatus(
      state,
      action: PayloadAction<{ step?: string, status: boolean }>
    ) {
      if (action.payload.step) {
        state.checkout_steps[action.payload.step] = action.payload.status;
      } else {
        //  fall back to current checkout step
        state.checkout_steps[state.currentCheckoutStep] = action.payload.status;
      }
    },

    setCurrentCheckoutStep(state, action: PayloadAction<string>) {
      state.currentCheckoutStep = action.payload;
    },

    setShippingAddress(state, action: PayloadAction<string>) {
      state.selectedShippingAddress = action.payload;
    },

    setBillingAddress(state, action: PayloadAction<string>) {
      state.selectedBillingAddress = action.payload;
    },
  },
});

export const {
  setBillingAddress,
  setCheckoutStepStatus,
  setCurrentCheckoutStep,
  setShippingAddress,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
export const checkoutReducer = checkoutSlice.reducer;
