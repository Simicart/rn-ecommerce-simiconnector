import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  products: {},
  categories: {},
  productDetails: {},
  quote_items: {},
  home_products: [],
};

// Suppose data shape stay the same
const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    addProducts(state, action: PayloadAction<{}>) {
      action.payload.products.forEach((product) => {
        if (product.entity_id) {
          state.products[product.entity_id] = product;
        }
      });
    },

    addCategories(state, action: PayloadAction<{}>) {
      // TODO: Streamline in tree formation
      action.payload.categories.forEach((category) => {
        if (category.entity_id) {
          state.categories[category.entity_id] = category;
        }
      });
    },

    addProductDetails(state, action: PayloadAction<{}>) {
      action.payload.product.forEach((product) => {
        if (product.id) {
          state.products[product.id] = product;
        }
      });
    },

    setQuoteItems(state, action: PayloadAction<{}>) {
      state.quote_items = action.payload;
    },

    setHomeData(state, action: PayloadAction<{}>) {
      state.home_products = action.payload.all_ids;
      this.addProducts(action.payload.homeproductlists);
    },
  },
});

export const {
  addCategories,
  addProducts,
  addProductDetails,
  setHomeData,
} = catalogSlice.actions;

export default catalogSlice.reducer;
export const catalogReducer = catalogSlice.reducer;
