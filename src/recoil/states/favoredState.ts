import { SEARCH_INFORMATION } from '@/api/fakeData';
import { atom } from 'recoil';
import { FavoredState } from '../types';

export const favoredState = atom<FavoredState>({
  key: 'favored',
  default: {
    listFavored: SEARCH_INFORMATION.favoritedList,
    listTopSearch: SEARCH_INFORMATION.topSearch,
  },
});
