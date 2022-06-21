import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum ProductIDs {
  XBTUSD = "PI_XBTUSD",
  ETHUSD = "PI_ETHUSD",
}

export interface ProductState {
  productIDs: ProductIDs;
  status: "up" | "loading" | "error";
  error?: string;
}

const initialState: ProductState = {
  productIDs: ProductIDs.XBTUSD,
  status: "up",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    switchProduct: (state) => {
      state.productIDs === ProductIDs.XBTUSD
        ? (state.productIDs = ProductIDs.ETHUSD)
        : (state.productIDs = ProductIDs.XBTUSD);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { switchProduct, setError } = productSlice.actions;
export const productIDs = (state: RootState) => state.product.productIDs;
export const error = (state: RootState) => state.product.error;
export default productSlice.reducer;
