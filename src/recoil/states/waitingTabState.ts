import { atom } from 'recoil';

export const waitingTabState = atom<'LIMIT' | 'FUTURE'>({
  key: 'waitingTabState',
  default: 'LIMIT',
});
