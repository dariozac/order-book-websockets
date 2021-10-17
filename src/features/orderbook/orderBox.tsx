import * as React from "react";
import { currencyFormat } from "./utils/utils";
import { OrderBlock } from "./orderBookTypes";

const OrderBox = ({price, size, total} : OrderBlock): JSX.Element => {
  return (
    <div>
      <div>
        {currencyFormat(price)} - {size.toLocaleString('en')} - {total?.toLocaleString('en')}
      </div>
    </div>
  );
};

export default React.memo(OrderBox);
