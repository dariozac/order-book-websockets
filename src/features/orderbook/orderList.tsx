import * as React from "react";
import { OrderBlock, ProductIDs } from "./orderBookTypes";
import OrderBox from "./orderBox";

interface Props {
  list: OrderBlock[];
  product: ProductIDs
}

const OrderList = ({ list, product }: Props) => {
  return (
    <div>
      {list
        .slice(0, 10)
        .sort((a, b) => b.price - a.price)
        .map((priceBlock: OrderBlock) => {
          return <OrderBox key={priceBlock.price} price={priceBlock.price} size={priceBlock.size} total={priceBlock.total} />;
        })}
    </div>
  );
};

export default OrderList
