import { WaitingFuture } from '@/api/models';
import { atom } from 'recoil';

export const futuresState = atom<Array<WaitingFuture>>({
  key: 'futuresState',
  default: [],
});
