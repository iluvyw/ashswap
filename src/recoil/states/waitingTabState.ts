import { atom } from 'recoil';

export const waitingTabState = atom<'LIMIT' | 'FUTURE' | 'HISTORY'>({
  key: 'waitingTabState',
  default: 'LIMIT',
});
