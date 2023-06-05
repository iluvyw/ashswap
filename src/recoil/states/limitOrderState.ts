import { atom, selector, DefaultValue } from 'recoil';
import { WalletBalance } from '@/api/models';
import { WALLET_BALANCE } from '@/api/fakeData';
import coinEGLD from 'src/assets/imgs/coin-egld.png';
import coinBNB from 'src/assets/imgs/coin-bnb.png';
import { LimitOrder } from '../types';

export const limitOrderState = atom<LimitOrder>({
  key: 'limitOrder',
  default: {
    action: 'BUY',
    sell: {
      token: 'BNB',
      value: 0,
      image: coinBNB,
    },
    buy: {
      token: 'EGLD',
      value: 0,
      image: coinEGLD,
    },
  },
});

export const limitOrderValue = selector({
  key: 'limitOrderValue',
  get: ({ get }) => {
    const orderState = get(limitOrderState);
    return orderState;
  },
  set: ({ get, set }) => {
    const currentOrderState = get(limitOrderState);
    const switchOrderState: LimitOrder = {
      action: currentOrderState.action === 'BUY' ? 'SELL' : 'BUY',
      sell: {
        token: currentOrderState.buy.token,
        value: 0,
        image: currentOrderState.buy.image,
      },
      buy: {
        token: currentOrderState.sell.token,
        value: 0,
        image: currentOrderState.sell.image,
      },
    };
    set(limitOrderState, switchOrderState);
  },
});

export const setlimitOrder = selector({
  key: 'setlimitOrder',
  get: ({ get }) => {
    const orderState = get(limitOrderState);
    return orderState;
  },
  set: ({ set }, newLimitOrder: LimitOrder | DefaultValue) => {
    set(limitOrderState, newLimitOrder);
  },
});

export const userWalletBalance = atom<WalletBalance>({
  key: 'userWalletBalance',
  default: WALLET_BALANCE,
});
