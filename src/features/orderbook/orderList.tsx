import * as React from "react";
import { OrderBlock, OrderType, ProductIDs, ViewType } from "./orderBookTypes";
import OrderBox from "./orderBox";

interface Props {
  list: OrderBlock[];
  product: ProductIDs;
  baseDenominator: number | undefined;
  orderType: OrderType;
  viewType: ViewType;
}

const getList = (
  list: OrderBlock[],
  viewType: ViewType,
  orderType: OrderType
) => {
  if (viewType === ViewType.Desktop && orderType === OrderType.Ask) {
    return list.sort((a: OrderBlock, b: OrderBlock) => a.price - b.price);
  }
  return list.sort((a, b) => b.price - a.price);
};

const cols = ["price", "size", "total"];

const OrderList = ({
  viewType,
  list,
  product,
  baseDenominator,
  orderType,
}: Props) => {
 return  (
  <div className={"order-list"}>
    <div className="th">
      {viewType === ViewType.Desktop && orderType === OrderType.Ask
        ? cols.map((col) => {
            return <div className="td">{col}</div>;
          })
        : 
        cols.map((col) => {
              return <div className="td">{col}</div>;
            }).reverse()}
    </div>
    {getList(list, viewType, orderType)
      .slice(0, 10)
      .map((priceBlock: OrderBlock) => {
        return (
          <OrderBox
            key={priceBlock.price}
            price={priceBlock.price}
            size={priceBlock.size}
            total={priceBlock.total}
            baseDenominator={baseDenominator}
            orderType={orderType}
            viewType={viewType}
          />
        );
      })}
  </div>
)};

export default React.memo(OrderList);
