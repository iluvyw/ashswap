import { StaticImageData } from 'next/image';

export const enum OrderType {
  LIMIT_ORDER = 'Limit Order',
  LONG = 'Long',
  SHORT = 'Short',
}

export const enum OrderAction {
  BUY = 'BUY',
  SELL = 'SELL',
}

export const enum Trend {
  UP = 'Up',
  DOWN = 'Down',
}

export type SystemCurrency = {
  token: string;
  value: number;
  image?: StaticImageData;
};

export type WaitingOrder = {
  id: string | number;
  time: number;
  type: OrderType;
  action: OrderAction;
  pair: string;
  price: SystemCurrency;
  amount: SystemCurrency;
  valueUSDC: SystemCurrency;
};

export type OrderBookItem = {
  type: OrderAction;
  averagePrice: SystemCurrency;
  totalPrice: SystemCurrency;
  totalAmount: SystemCurrency;
  valueUSDC: SystemCurrency;
  volumnCap: number;
};

export type OrderBookList = {
  currentAverage: SystemCurrency;
  currentTrend: Trend;
  sellData: {
    tokenSell: string;
    tokenBuy: string;
    sellBook: OrderBookItem[];
  };
  buyData: {
    tokenSell: string;
    tokenBuy: string;
    buyBook: OrderBookItem[];
  };
};

export type USDFeeEstimated = {
  total: number;
  platformFee: number;
  gasFee: number;
};

export type PairToken = [
  {
    token: string;
    image: StaticImageData;
  },
  {
    token: string;
    image: StaticImageData;
  }
];

export type PairSearched = {
  id: string | number;
  pairToken: PairToken;
  percentChanged: number;
  priceChanged: number;
};

export type SearchInformation = {
  recentSearch: PairToken[];
  favoritedList: PairSearched[];
  topSearch: PairSearched[];
};

export type WalletBalance = SystemCurrency[];

export type ArrayTheInfoItem = {
  id: string | number;
  show: boolean;
  text: string;
  isHover: boolean;
  icon?: StaticImageData | string;
  Cell: (item: WaitingOrder, customStyleText?: string) => React.ReactElement;
};
