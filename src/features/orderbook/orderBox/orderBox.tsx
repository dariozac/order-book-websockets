import * as React from "react";
import { currencyFormat } from "../utils/utils";
import { OrderBlock, OrderType, ViewType } from "../orderBookTypes";
import styles from "./OrderBox.module.css";

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
        <div data-testid='ask-order-price' className={`${styles.td} ${styles.orderPrice}`}>{currencyFormat(price)}</div>
        <div data-testid='ask-order-size' className={`${styles.td} ${styles.orderSize}`}>{size.toLocaleString("en")}</div>
        <div data-testid='desktop-ask-order-total' className={`${styles.td} ${styles.orderTotal}`}>{total?.toLocaleString("en")}</div>
      </>
    );
  }
  return (
    <>
      <div className={`${styles.td} ${styles.orderTotal}`}>{total?.toLocaleString("en")}</div>
      <div className={`${styles.td} ${styles.orderSize}`}>{size.toLocaleString("en")}</div>
      <div data-testid='mobile-ask-order-price' className={`${styles.td} ${styles.orderPrice}`}>{currencyFormat(price)}</div>
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
      className={styles.tr}
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
