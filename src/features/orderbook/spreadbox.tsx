import * as React from "react";
import { OrderBlock } from "./orderBookTypes";

interface Props {
  bid?: OrderBlock;
  ask?: OrderBlock;
}

const SpreadBox = ({ bid, ask }: Props) => {
    if(!bid || !ask){
        return <p>no bid or offer</p>
    }
  const spread = ask.price - bid.price;
  return (
    <div style={{ border: "1px red solid" }}>
      Spread {spread} - {((spread / bid.price) * 100).toFixed(5)}%
    </div>
  );
};

export default SpreadBox;
