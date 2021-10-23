import * as React from "react";
import { OrderBlock, OrderType, ProductIDs } from "./orderBookTypes";
import OrderBox from "./orderBox";

interface Props {
  list: OrderBlock[];
  product: ProductIDs;
  baseDenominator: number | undefined;
  orderType: OrderType
}

const OrderList = ({ list, product, baseDenominator, orderType }: Props) => {
  return (
    <div>
      {list
        .slice(0, 10)
        .sort((a, b) => b.price - a.price)
        .map((priceBlock: OrderBlock) => {
          return <OrderBox 
          key={priceBlock.price}
          price={priceBlock.price}
           size={priceBlock.size} 
           total={priceBlock.total}
            baseDenominator={baseDenominator}
            orderType={orderType}
            />;
        })}
    </div>
  );
};

export default OrderList
