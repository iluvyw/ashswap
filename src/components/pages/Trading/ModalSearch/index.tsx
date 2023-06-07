import Modal from 'src/components/Modal';
import Image from 'next/image';
import { SEARCH_INFORMATION } from '@/api/fakeData';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { setlimitOrder } from '@/recoil/store';
import { PairToken } from '@/api/models';
import { ArrowDownGreen, ArrowDownRed, SearchIcon, StarIcon } from '@/assets';
import { favoredState } from '@/recoil/states/favoredState';
import { modalSearchState } from '@/recoil/states/modalSearchState';

const ModalSearch: React.FC = () => {
  const setOrder = useSetRecoilState(setlimitOrder);
  const [favoredStateValue, setFavoredStateValue] =
    useRecoilState(favoredState);

  const [isShow, setIsShow] = useRecoilState(modalSearchState);

  const handleSearch = (item: PairToken) => {
    setOrder({
      action: 'BUY',
      sell: {
        token: item[0].token,
        value: 0,
        image: item[0].image,
      },
      buy: {
        token: item[1].token,
        value: 0,
        image: item[1].image,
      },
    });
    setIsShow(false);
  };

  const handleTickFavored = (id: string | number, tick: boolean) => {
    if (tick)
      return setFavoredStateValue({
        listTopSearch: [
          favoredStateValue.listFavored.filter(value => value.id === id)[0],
          ...favoredStateValue.listTopSearch,
        ],
        listFavored: favoredStateValue.listFavored.filter(
          value => value.id != id
        ),
      });

    return setFavoredStateValue({
      listFavored: [
        favoredStateValue.listTopSearch.filter(value => value.id === id)[0],
        ...favoredStateValue.listFavored,
      ],
      listTopSearch: favoredStateValue.listTopSearch.filter(
        value => value.id != id
      ),
    });
  };

  return (
    <Modal
      classNameContainer={`${isShow ? '' : 'hide'}`}
      onClose={() => setIsShow(false)}
      width={460}
    >
      <div>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src={SearchIcon} />
          </div>
          <input
            type="text"
            id="input-group-1"
            className="h-12 bg-white p-2.5 px-10 text-sm"
            placeholder="Try usdt-usdc"
          />
          <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-3">
            <button
              onClick={() => setIsShow(false)}
              className="rounded-lg bg-blackDefault px-2 py-1 font-bold text-white"
            >
              ESC
            </button>
          </div>
        </div>
        <div className="mt-9 flex">
          <div className="w-full p-4">
            <div className="mb-7 flex w-full items-center gap-4 text-xs">
              <span className="w-1/2 font-light text-disabled">
                Favorited Pairs
              </span>
              <span className="w-1/4 text-right font-light text-disabled">
                24h Change
              </span>
              <span className="w-1/4 text-right font-light text-disabled">
                Price
              </span>
            </div>
            {favoredStateValue.listFavored.map((item, i) => (
              <div
                className="mb-9 flex w-full items-center justify-between gap-4"
                key={`${item.pairToken}-${i}`}
              >
                <div className="flex w-1/2 items-center">
                  <button
                    className="rounded-lg p-[6px] hover:bg-blueBg"
                    onClick={() => handleTickFavored(item.id, true)}
                    data-cy={`remove-btn-${i}`}
                  >
                    <Image src={StarIcon} />
                  </button>
                  <Image src={item.pairToken[0].image} width={16} height={16} />
                  <Image src={item.pairToken[1].image} width={16} height={16} />
                  <span className="ml-2 text-sm">
                    {item.pairToken[0].token}-{item.pairToken[1].token}
                  </span>
                </div>
                {item.percentChanged >= 0 && (
                  <>
                    <div className="flex w-1/4 items-center justify-end gap-1">
                      <span className="text-right text-xs text-success">
                        +{item.percentChanged}%
                      </span>
                      <Image src={ArrowDownGreen} />
                    </div>
                    <span className="text-bold w-1/4 rounded bg-[#F2FCFA] p-1 text-right text-sm text-success">
                      <span>{item.priceChanged}</span>
                    </span>
                  </>
                )}
                {item.percentChanged < 0 && (
                  <>
                    <div className="flex w-1/4 items-center justify-end gap-1">
                      <span className="text-right text-xs text-danger">
                        +{item.percentChanged}%
                      </span>
                      <Image src={ArrowDownRed} />
                    </div>
                    <span className="text-bold w-1/4 rounded bg-[#FFF2F7] p-1 text-right text-sm text-danger">
                      {item.priceChanged}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="mb-2" />
        <div className="mt-5 flex flex-wrap gap-2">
          {SEARCH_INFORMATION.recentSearch.map((item, i) => (
            <button
              className="btn-default"
              key={`${item}-${i}`}
              onClick={() => handleSearch(item)}
            >
              {item[0].token}/{item[1].token}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default ModalSearch;
