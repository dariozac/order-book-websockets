export enum ProductIDs {
  XBTUSD = "PI_XBTUSD",
  ETHUSD = "PI_ETHUSD",
}

export interface OrderBlock {
  price: number;
  size: number;
  total: number | undefined;
}

export enum OrderType {
  Bid = "bid",
  Ask = "ask",
}

export enum ViewType {
  Desktop = "desktop",
  Mobile = "mobile",
}

export type OrderMap = Map<number, OrderBlock>;
