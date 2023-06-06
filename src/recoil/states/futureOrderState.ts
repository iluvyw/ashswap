import { atom, selector, DefaultValue } from 'recoil';
import { WalletBalance } from '@/api/models';
import { WALLET_BALANCE } from '@/api/fakeData';
import coinEGLD from 'src/assets/imgs/coin-egld.png';
import coinBNB from 'src/assets/imgs/coin-bnb.png';
import { FutureOrder } from '../types';

export const futureOrderState = atom<FutureOrder>({
  key: 'futureOrder',
  default: {
    action: 'LONG',
    buy: {
      token: 'EGLD',
      value: 0,
      image: coinEGLD,
    },
    collateral: {
      token: 'BNB',
      value: 0,
      image: coinBNB,
    },
    leverage: 2,
  },
});

export const futureOrderValue = selector({
  key: 'futureOrderValue',
  get: ({ get }) => {
    const orderState = get(futureOrderState);
    return orderState;
  },
  set: ({ get, set }) => {
    const currentOrderState = get(futureOrderState);
    const switchOrderState: FutureOrder = {
      action: currentOrderState.action === 'LONG' ? 'SHORT' : 'LONG',
      buy: {
        token: currentOrderState.buy.token,
        value: 0,
        image: currentOrderState.buy.image,
      },
      collateral: {
        token: currentOrderState.collateral.token,
        value: 0,
        image: currentOrderState.collateral.image,
      },
      leverage: 2,
    };
    set(futureOrderState, switchOrderState);
  },
});

export const setfutureOrder = selector({
  key: 'setfutureOrder',
  get: ({ get }) => {
    const orderState = get(futureOrderState);
    return orderState;
  },
  set: ({ set }, newFutureOrder: FutureOrder | DefaultValue) => {
    set(futureOrderState, newFutureOrder);
  },
});

export const userWalletBalance = atom<WalletBalance>({
  key: 'userWalletBalance',
  default: WALLET_BALANCE,
});
