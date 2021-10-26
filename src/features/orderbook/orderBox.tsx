import * as React from "react";
import { currencyFormat } from "./utils/utils";
import { OrderBlock, OrderType, ViewType } from "./orderBookTypes";
import "./OrderBox.module.css";

interface Props extends OrderBlock {
  baseDenominator: number | undefined;
  orderType: OrderType;
  viewType: ViewType;
}

const getColumns = (
  { price, size, total }: OrderBlock,
  orderType: OrderType,
  viewType: ViewType
) => {
  if (orderType === OrderType.Ask && viewType === ViewType.Desktop) {
    return (
      <>
        <div className={"td order-price"}>{currencyFormat(price)}</div>
        <div className={"td order-size"}>{size.toLocaleString("en")}</div>
        <div className={"td order-total"}>{total?.toLocaleString("en")}</div>
      </>
    );
  }
  return (
    <>
      <div className={"td order-total"}>{total?.toLocaleString("en")}</div>
      <div className={"td order-size"}>{size.toLocaleString("en")}</div>
      <div className={"td order-price"}>{currencyFormat(price)}</div>
    </>
  );
};

const OrderBox = ({
  price,
  size,
  total,
  baseDenominator,
  orderType,
  viewType,
}: Props): JSX.Element => {
  return (
    <div
      className={"tr"}
      style={{
        background: `linear-gradient(${
          orderType === OrderType.Ask && viewType === ViewType.Desktop
            ? "to left"
            : "to right"
        }, ${
          orderType === OrderType.Ask
            ? "rgba(255, 0, 0, 0.3)"
            : "rgba(76, 175, 80, 0.3)"
        }, ${
          orderType === OrderType.Ask
            ? "rgba(255, 0, 0, 0.3)"
            : "rgba(76, 175, 80, 0.3)"
        }) no-repeat`,
        backgroundSize: `calc(${
          total && baseDenominator ? (total / baseDenominator) * 100 : 0
        }%) calc(100%)`,
        color: `${orderType === OrderType.Ask ? "red" : "green"}`,
        backgroundPosition: `${
          orderType === OrderType.Ask && viewType === ViewType.Desktop
            ? "left"
            : "right"
        }`,
      }}
    >
      {getColumns({ price, size, total }, orderType, viewType)}
    </div>
  );
};

export default React.memo(OrderBox);
