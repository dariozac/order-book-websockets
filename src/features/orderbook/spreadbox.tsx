import * as React from "react";
import { OrderBlock } from "./orderBookTypes";

interface Props {
  bid?: OrderBlock;
  ask?: OrderBlock;
  id: string;
}

const SpreadBox = ({ bid, ask, id }: Props) => {
    if(!bid || !ask){
        return <p>no bid or ask</p>
    }
  const spread = ask.price - bid.price;
  return (
    <div id={id} style={{flexGrow: 1 }}>
      Spread {(spread).toFixed(1)} ({((spread / bid.price) * 100).toFixed(2)}%)
    </div>
  );
};

export default React.memo(SpreadBox);
