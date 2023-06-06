import {
  ArrangeFutureItem,
  ArrayTheInfoItem,
  Leverage,
  PairSearched,
  SystemCurrency,
} from '@/api/models';

export interface LimitOrder {
  action: 'SELL' | 'BUY';
  sell: SystemCurrency;
  buy: SystemCurrency;
}

export interface FutureOrder {
  action: 'LONG' | 'SHORT';
  buy: SystemCurrency;
  collateral: SystemCurrency;
  leverage: Leverage;
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

export interface ArrangeFutureState {
  items: Array<ArrangeFutureItem>;
}
