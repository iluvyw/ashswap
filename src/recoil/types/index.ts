import { ArrayTheInfoItem, PairSearched, SystemCurrency } from '@/api/models';

export interface LimitOrder {
  action: 'SELL' | 'BUY';
  sell: SystemCurrency;
  buy: SystemCurrency;
}

export interface FavoredState {
  listFavored: PairSearched[];
  listTopSearch: PairSearched[];
}

export interface ArrangeTheInfoState {
  items: Array<ArrayTheInfoItem>;
}
