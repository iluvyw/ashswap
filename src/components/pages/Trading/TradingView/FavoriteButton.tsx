import { useRecoilState } from 'recoil';
import { PairToken } from '.';
import { favoredState } from '@/recoil/store';
import { Star3Icon, StarIcon } from '@/assets';
import Image from 'next/image';

export default function FavoriteButton({
  pairToken,
}: {
  pairToken: PairToken;
}) {
  const [favoredStateValue, setFavoredStateValue] =
    useRecoilState(favoredState);

  function isFavored() {
    const result = favoredStateValue.listFavored.find(
      favored =>
        favored.pairToken[0].token === pairToken.mainToken.token &&
        favored.pairToken[1].token === pairToken.comparedToken.token
    );
    return result !== undefined;
  }

  const handleTickFavored = () => {
    if (isFavored())
      return setFavoredStateValue({
        listTopSearch: [...favoredStateValue.listTopSearch],
        listFavored: favoredStateValue.listFavored.filter(
          value =>
            value.pairToken[0].token !== pairToken.mainToken.token ||
            value.pairToken[1].token !== pairToken.comparedToken.token
        ),
      });

    return setFavoredStateValue({
      listFavored: [
        ...favoredStateValue.listFavored,
        {
          id: favoredStateValue.listFavored.length + 1,
          pairToken: [pairToken.mainToken, pairToken.comparedToken],
          percentChanged: 5.09,
          priceChanged: 0.00023,
        },
      ],
      listTopSearch: [...favoredStateValue.listTopSearch],
    });
  };

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        handleTickFavored();
      }}
      className="mr-2 h-[20px]"
    >
      <Image src={isFavored() ? StarIcon : Star3Icon} width={20} height={20} />
    </button>
  );
}
