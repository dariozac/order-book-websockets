import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export enum ProductIDs {
  XBTUSD = "PI_XBTUSD",
  ETHUSD = "PI_ETHUSD",
}

export interface ProductState {
  productIDs: ProductIDs;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  productIDs: ProductIDs.XBTUSD,
  status: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    switchProduct: (state) => {

      state.productIDs === ProductIDs.XBTUSD
        ? state.productIDs = ProductIDs.ETHUSD
        : state.productIDs = ProductIDs.XBTUSD;
    },

  },
 
});
export const { switchProduct } = productSlice.actions;
export const productIDs = (state: RootState) => state.product.productIDs;
export default productSlice.reducer;
