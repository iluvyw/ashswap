import { WaitingOrder } from '@/api/models';
import { atom } from 'recoil';

export const ordersState = atom<Array<WaitingOrder>>({
  key: 'ordersState',
  default: [],
});
