export enum ProductIDs {
    XBTUSD = "PI_XBTUSD",
    ETHUSD = "PI_ETHUSD",
  }

  export interface OrderBlock {
      price: number;
      size: number;
      total: number | undefined;
  }

  export type OrderMap = Map<number, OrderBlock>