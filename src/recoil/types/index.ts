import { ArrayTheInfoItem, PairSearched, SystemCurrency } from '@/api/models';

export interface LimitOrder {
  action: 'SELL' | 'BUY';
  sell: SystemCurrency;
  buy: SystemCurrency;
}

export interface FutureOrder {
  action: 'LONG' | 'SHORT';
  buy: SystemCurrency;
  collateral: SystemCurrency;
  leverage: 2 | 5 | 15 | 20 | 30 | 40 | 50;
  tp?: number;
  sl?: number;
}

export interface FavoredState {
  listFavored: PairSearched[];
  listTopSearch: PairSearched[];
}

export interface ArrangeTheInfoState {
  items: Array<ArrayTheInfoItem>;
}
