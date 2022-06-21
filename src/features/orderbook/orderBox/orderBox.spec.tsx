import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderBox from "./orderBox";
import { OrderType, ViewType } from "../orderBookTypes";
import { currencyFormat } from "../utils/utils";
import { debug } from "console";

const baseDenominator = 10000;

const orderblock = {
  price: 1000,
  size: 3000,
  total: 5000,
};

describe("Order Box Tests", () => {
  test("loads and displays ASK DESKTOP", async () => {
    render(
      <OrderBox
        baseDenominator={baseDenominator}
        orderType={OrderType.Ask}
        viewType={ViewType.Desktop}
        price={orderblock.price}
        size={orderblock.size}
        total={orderblock.total}
      />
    );
   
    expect(screen.findByTestId('ask-order-price')).toBeDefined();
    expect(screen.findByTestId("desktop-ask-order-price")).toHaveTextContent("1000.00");
    expect(screen.findByTestId("ask-order-price")).toHaveStyle(
      "background: linear-gradient"
    );
  });
});
