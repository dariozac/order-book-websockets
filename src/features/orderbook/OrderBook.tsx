import * as React from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ProductIDs, productIDs, switchProduct } from "./productSlice";
import { getBids, bids } from "./bidOrdersSlice";
import SpreadBox from "./spreadbox";
import OrderList from "./orderList";
import { OrderMap, OrderType } from "./orderBookTypes";
import { getAsks, asks } from "./askOrdersSlice";

import "./Orderbook.module.css";
import { usePageVisibility } from "./utils/visibility";


const OrderBook = () => {

  
  
  const product = useAppSelector<ProductIDs>(productIDs);
  const bidsMap = useAppSelector<OrderMap>(bids);
  const asksMap = useAppSelector<OrderMap>(asks);
  const dispatch = useAppDispatch();

  const [baseTotal, setBaseTotal] = React.useState<number | undefined>(0);
  const [paused, setPaused] = React.useState<boolean>(false);
  const isVisible = usePageVisibility();


  React.useEffect(() => {
    const wsUrl = "wss://www.cryptofacilities.com/ws/v1";
    const ws = new WebSocket(wsUrl);
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
      if(!isVisible){
        return () => {
          ws.close();

        };
      }
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
  }, [dispatch, product, paused, isVisible]);

  React.useEffect(() => {
    const baseTotalDenominator = (): number | undefined => {
      const bidTotalSize: number | undefined =
        bidsMap != null ? Array.from(bidsMap?.values())[9]?.total : undefined;
      const askTotalSize: number | undefined =
        asksMap != null ? Array.from(asksMap?.values())[9]?.total : undefined;

      if (!bidTotalSize || !askTotalSize) {
        return undefined;
      }

      return bidTotalSize > askTotalSize ? bidTotalSize : askTotalSize;
    };

    setBaseTotal(baseTotalDenominator);
  }, [asksMap, bidsMap]);

  React.useEffect(()=>{
// Change the title based on page visibility
if (isVisible) {
  
  document.title = "Active";
} else {
  setPaused(true)
  document.title = "Inactive";
}

  }, [isVisible])

  if (paused || !isVisible) {
    return (
      <button
        onClick={() => {

          setPaused(false);
        }}
      >
        start
      </button>
    );
  }

  return (
    <div className={"#orderbook"}>
      <h1>Order Book {product}</h1>
      <SpreadBox
        id={"spread-box-desktop"}
        bid={bidsMap != null ? Array.from(bidsMap?.values())[0] : undefined}
        ask={asksMap != null ? Array.from(asksMap?.values())[0] : undefined}
      />
<div id="order-lists">
<OrderList
        product={product}
        list={asksMap != null ? Array.from(asksMap?.values()).slice(0, 12) : []}
        baseDenominator={baseTotal}
        orderType={OrderType.Ask}
      />

      <SpreadBox
        id={"spread-box-mobile"}
        bid={bidsMap != null ? Array.from(bidsMap?.values())[0] : undefined}
        ask={asksMap != null ? Array.from(asksMap?.values())[0] : undefined}
      />

      <OrderList
        product={product}
        list={bidsMap != null ? Array.from(bidsMap?.values()).slice(0, 12) : []}
        baseDenominator={baseTotal}
        orderType={OrderType.Bid}
      />
</div>
      <div id="footer">
        <button
          id={"toggle-feed-btn"}
          onClick={() => dispatch(switchProduct())}
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default OrderBook;
