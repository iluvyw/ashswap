import { atom } from 'recoil';

export const featureState = atom<'TRADE' | 'FUTURE'>({
  key: 'featureState',
  default: 'TRADE',
});
