import * as React from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ProductIDs, productIDs, switchProduct } from "./productSlice";
import { getBids, bids } from "./bidOrdersSlice";
import SpreadBox from "./spreadbox";
import OrderList from "./orderList";
import { OrderMap } from "./orderBookTypes";
import { getAsks, asks } from "./askOrdersSlice";

const OrderBook = () => {
  const product = useAppSelector<ProductIDs>(productIDs);
  const bidsMap = useAppSelector<OrderMap>(bids);
  const asksMap = useAppSelector<OrderMap>(asks);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const wsUrl = "wss://www.cryptofacilities.com/ws/v1";
    const ws = new WebSocket(wsUrl);
    console.log("websoct prod", [product]);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: [product],
        })
      );
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      dispatch(getBids(data.bids));
      dispatch(getAsks(data.asks));
    };

    // Handle any errors that occur.
    ws.onerror = function (error) {
      //console.dir(error);
    };

    return () => {
      ws.close();
    };
  }, [dispatch, product]);

  return (
    <>
      <h1>Order Book {product}</h1>
      <button onClick={() => dispatch(switchProduct())}>Toggle</button>
      <ul>
        <h2>Asks {asksMap?.size}</h2>
        <OrderList product={product}
          list={
            asksMap != null ? Array.from(asksMap?.values()).slice(0, 12) : []
          }
        />
        <SpreadBox
          bid={bidsMap != null ? Array.from(bidsMap?.values())[0] : undefined}
          ask={asksMap != null ? Array.from(asksMap?.values())[0] : undefined}
        />
        <OrderList product={product}
          list={
            bidsMap != null ? Array.from(bidsMap?.values()).slice(0, 12) : []
          }
        />
      </ul>
      <h2>bids {bidsMap?.size}</h2>
    </>
  );
};

export default OrderBook;
