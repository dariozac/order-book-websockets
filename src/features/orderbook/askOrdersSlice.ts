import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

import {OrderBlock, OrderMap} from './orderBookTypes';
import { switchProduct } from "./productSlice";
  
export interface AskOrdersState {
    asksMap: OrderMap;
  }
  
  const initialState: AskOrdersState = {
    asksMap: new Map(),
  };

  const processAsks = (currentAsks: OrderMap, newAsks: number[][]): OrderMap => {
    const newAsksMap = new Map<number, OrderBlock>();
    const oldAsks = currentAsks;
  
    if (newAsks == null) {
      return currentAsks;
    }
    for (let ask of newAsks?.sort((a, b) => b[0] - a[0])) {
      if (ask[1] === 0) {
        oldAsks.delete(ask[0]);
      } else {
        newAsksMap.set(ask[0], {
          price: ask[0],
          size: ask[1],
          total: undefined,
        });
      }
    }
  
    const newMap: Map<number, OrderBlock> = new Map([
      ...currentAsks,
      ...newAsksMap,
    ]);
    // add totals
    const withTotals = Array.from(newMap.values()).map((row: OrderBlock) => {
      const getCumTotal = (priceBlocks: OrderBlock[]) =>
        priceBlocks
          .filter((priceBlock) => priceBlock.price < row.price)
          .reduce((a: number, c: OrderBlock) => a + c.size, row.size);
      return {
        price: row.price,
        size: row.size,
        total: getCumTotal(Array.from(newMap.values())),
      };
    });
  
    const mapWithTotals = new Map<number, OrderBlock>();
  
    withTotals
      .sort((a, b) => a.price - b.price)
      .forEach((x) => mapWithTotals.set(x.price, x));
  
    return mapWithTotals;
  };
  

export const askOrdersSlice = createSlice({
    name: "askOrders",
    initialState,
    reducers: {
        getAsks: (state, action: PayloadAction<number[][]>) => {  
            state.asksMap = processAsks(state.asksMap, action.payload);
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(switchProduct,()=> {
          return initialState
        })
    },
  });
  export const { getAsks } = askOrdersSlice.actions;
  export const asks = (state: RootState) => state.asks.asksMap;
  export default askOrdersSlice.reducer;
  