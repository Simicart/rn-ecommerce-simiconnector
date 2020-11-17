import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  app_config: {},
  merchant_config: {},
  isLoading: false,
  loadingType: 'none',
  loadingVectors: [],
  hasUpdate: false,
  stack: 'splash',
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppConfig(state, action: PayloadAction<{}>) {
      state.app_config = action.payload;
    },

    setMerchantConfig(state, action: PayloadAction<{}>) {
      state.merchant_config = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setLoadingType(state, action: PayloadAction<string>) {
      state.loadingType = action.payload;
    },

    addLoadingVector(state, action: PayloadAction<string>) {
      state.loadingVectors.push(action.payload);
      state.isLoading = true;
    },

    removeLoadingVector(state, action: PayloadAction<string>) {
      state.loadingVectors = state.loadingVectors.filter(
        (vector) => vector !== action.payload
      );
      if (state.loadingVectors.length === 0) {
        state.isLoading = false;
      }
    },

    // setGlobalLoading(state) {
    //   state.loadingVectors.push('global');
    //   state.isLoading = true;
    // },
    //
    // unsetGlobalLoading(state) {
    //   state.loadingVectors = state.loadingVectors.filter(vector => vector !== 'global');
    //   if (state.loadingVectors.length === 0) {
    //     state.isLoading = false;
    //   }
    // },

    setUpdateNotification(state, action: PayloadAction<boolean>) {
      state.hasUpdate = action.payload;
    },

    setRouteName(state, action: PayloadAction<boolean>) {
      state.stack = action.payload;
    },
  },
});

export const {
  setAppConfig,
  setMerchantConfig,
  setLoading,
  setLoadingType,
  setUpdateNotification,
  addLoadingVector,
  removeLoadingVector,
  setRouteName,
} = appSlice.actions;

export const setGlobalLoading = () => (dispatch) => {
  dispatch(addLoadingVector('global'));
};

export const unsetGlobalLoading = () => (dispatch) => {
  dispatch(removeLoadingVector('global'));
};

export const appReducer = appSlice.reducer;
// setGlobalLoading,
// unsetGlobalLoading

export default {
  ...appSlice.actions,
  setGlobalLoading,
  unsetGlobalLoading,
};
