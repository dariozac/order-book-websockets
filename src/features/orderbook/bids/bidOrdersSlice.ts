import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { OrderMap, OrderBlock } from "../orderBookTypes";
import { switchProduct } from "../productSlice";

export interface BidOrdersState {
  bidsMap: OrderMap;
}

const initialState: BidOrdersState = {
  bidsMap: new Map(),
};

const processBids = (currentBids: OrderMap, newBids: number[][]): OrderMap => {
  const newBidsMap = new Map<number, OrderBlock>();
  const oldBids = currentBids;

  if (newBids == null) {
    return currentBids;
  }
  for (let bid of newBids?.sort((a, b) => b[0] - a[0])) {
    if (bid[1] === 0) {
      oldBids.delete(bid[0]);
    } else {
      newBidsMap.set(bid[0], {
        price: bid[0],
        size: bid[1],
        total: undefined,
      });
    }
  }

  const newMap: Map<number, OrderBlock> = new Map([
    ...currentBids,
    ...newBidsMap,
  ]);
  // add totals
  const withTotals = Array.from(newMap.values()).map((row: OrderBlock) => {
    const getCumTotal = (priceBlocks: OrderBlock[]) =>
      priceBlocks
        .filter((priceBlock) => priceBlock.price > row.price)
        .reduce((a: number, c: OrderBlock) => a + c.size, row.size);
    return {
      price: row.price,
      size: row.size,
      total: getCumTotal(Array.from(newMap.values())),
    };
  });

  const mapWithTotals = new Map<number, OrderBlock>();

  withTotals
    .sort((a, b) => b.price - a.price)
    .forEach((priceBlock) => mapWithTotals.set(priceBlock.price, priceBlock));

  return mapWithTotals;
};

export const bidOrderSlice = createSlice({
  name: "bidOrders",
  initialState,
  reducers: {
    getBids: (state, action: PayloadAction<number[][]>) => {
      state.bidsMap = processBids(state.bidsMap, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchProduct, () => {
        return initialState
      })
  },
});
export const { getBids } = bidOrderSlice.actions;
export const bids = (state: RootState) => state.bids.bidsMap;
export default bidOrderSlice.reducer;
