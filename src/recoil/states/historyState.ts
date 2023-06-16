import { WaitingFuture } from '@/api/models';
import { atom } from 'recoil';

export const historyState = atom<Array<WaitingFuture>>({
  key: 'historyState',
  default: [],
});
