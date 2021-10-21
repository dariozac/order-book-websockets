import * as React from "react";
import { currencyFormat } from "./utils/utils";
import { OrderBlock, OrderType } from "./orderBookTypes";
import "./OrderBox.module.css";

interface Props extends OrderBlock {
  baseDenominator: number | undefined;
  orderType: OrderType;
}

const OrderBox = ({
  price,
  size,
  total,
  baseDenominator,
  orderType,
}: Props): JSX.Element => {
  return (
    <div
      id={"orderbox-container"}
      style={{
        background: `linear-gradient(to right, ${
          orderType === OrderType.Ask ? "rgba(255, 0, 0, 0.3)" : "rgba(76, 175, 80, 0.3)"
        }, ${
          orderType === OrderType.Ask ? "rgba(255, 0, 0, 0.3)" : "rgba(76, 175, 80, 0.3)"
        }) no-repeat`,
        backgroundSize: `calc(${
          total && baseDenominator ? (total / baseDenominator) * 100 : 0
        }%) calc(100%)`,
        backgroundPosition: "left",
        display: "flex",
        flexDirection: "row",
        justifyItems: "left",
        color: `${orderType === OrderType.Ask ? "red" : "green"}`,
      }}
    >
      <div className={"orderbox-column order-price"}>
        {currencyFormat(price)}
      </div>
      <div className={"orderbox-column order-size"}>
        {size.toLocaleString("en")}
      </div>
      <div className={"orderbox-column order-total"}>
        {total?.toLocaleString("en")}
      </div>
    </div>
  );
};

export default React.memo(OrderBox);
