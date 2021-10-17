import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import bidsReducer from "../features/orderbook/bidOrdersSlice";
import asksReducer from "../features/orderbook/askOrdersSlice";
import productReducer from "../features/orderbook/productSlice";

import { enableMapSet } from 'immer'

enableMapSet()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    bids: bidsReducer,
    asks: asksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
