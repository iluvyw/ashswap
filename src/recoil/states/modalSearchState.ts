import { atom } from 'recoil';

export const modalSearchState = atom<boolean>({
  key: 'modalSearch',
  default: false,
});
