import { atom } from 'recoil';

export const modalSettingState = atom<boolean>({
  key: 'modalSetting',
  default: false,
});
