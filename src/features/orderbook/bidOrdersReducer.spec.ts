import bidOrdersReducer, { BidOrdersState, getBids } from "./bidOrdersSlice";

import { enableMapSet } from "immer";

enableMapSet();

describe("bid orders reducer", () => {
  const initialState: BidOrdersState = {
    bidsMap: new Map(),
  };
  it("should handle initial state", () => {
    expect(bidOrdersReducer(undefined, { type: "unknown" })).toEqual({
      bidsMap: new Map(),
    });
  });

  it("should handle adding new bids", () => {
    const actual = bidOrdersReducer(initialState, getBids([[61600, 5000]]));
    expect(actual.bidsMap).toEqual(
      new Map([[61600, { price: 61600, size: 5000, total: 5000 }]])
    );
  });

  it("should update bid size", () => {
    const actual = bidOrdersReducer(
      {
        bidsMap: new Map([[61600, { price: 61600, size: 5000, total: 5000 }]]),
      },
      getBids([[61600, 10000]])
    );
    expect(actual.bidsMap).toEqual(
      new Map([[61600, { price: 61600, size: 10000, total: 10000 }]])
    );
  });

  it("should remove bid size of 0", () => {
    const actual = bidOrdersReducer(
      {
        bidsMap: new Map([[61600, { price: 61600, size: 5000, total: 5000 }]]),
      },
      getBids([[61600, 0]])
    );
    expect(actual.bidsMap).toEqual(new Map([]));
  });
});
