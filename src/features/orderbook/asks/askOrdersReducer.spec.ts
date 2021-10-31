import askOrdersReducer, { AskOrdersState, getAsks } from "./askOrdersSlice";

import { enableMapSet } from "immer";

enableMapSet();

describe("ask orders reducer", () => {
  const initialState: AskOrdersState = {
    asksMap: new Map(),
  };
  it("should handle initial state", () => {
    expect(askOrdersReducer(undefined, { type: "unknown" })).toEqual({
      asksMap: new Map(),
    });
  });

  it("should handle adding new asks", () => {
    const actual = askOrdersReducer(initialState, getAsks([[61600, 5000]]));
    expect(actual.asksMap).toEqual(
      new Map([[61600, { price: 61600, size: 5000, total: 5000 }]])
    );
  });

  it("should update ask size", () => {
    const actual = askOrdersReducer(
      {
        asksMap: new Map([[61600, { price: 61600, size: 5000, total: 5000 }]]),
      },
      getAsks([[61600, 10000]])
    );
    expect(actual.asksMap).toEqual(
      new Map([[61600, { price: 61600, size: 10000, total: 10000 }]])
    );
  });

  it("should remove ask size of 0", () => {
    const actual = askOrdersReducer(
      {
        asksMap: new Map([[61600, { price: 61600, size: 5000, total: 5000 }]]),
      },
      getAsks([[61600, 0]])
    );
    expect(actual.asksMap).toEqual(new Map([]));
  });
});
