import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { limitOrderState } from '@/recoil/store';
import Icon from '@/components/Icon';
import { AdvancedRealTimeChartProps } from 'react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart';
import {
  Arrow1Icon,
  Arrow2Icon,
  Arrow3Icon,
  CoinBNB,
  CoinEGLD,
} from '@/assets';
import { modalSearchState } from '@/recoil/states/modalSearchState';
import FavoriteButton from './FavoriteButton';

const AdvancedRealTimeChart = dynamic<AdvancedRealTimeChartProps>(
  () =>
    import('react-ts-tradingview-widgets').then(
      module => module.AdvancedRealTimeChart
    ),
  { ssr: false }
);

export type PairToken = {
  mainToken: {
    token: string;
    image: StaticImageData;
  };
  comparedToken: {
    token: string;
    image: StaticImageData;
  };
};

const initPair = {
  mainToken: {
    token: 'EGLD',
    image: CoinEGLD,
  },
  comparedToken: {
    token: 'BNB',
    image: CoinBNB,
  },
};

export default function TradingView() {
  const [pairToken, setPairToken] = useState<PairToken>(initPair);

  const pairWatching = useRecoilValue(limitOrderState);
  const setIsShow = useSetRecoilState(modalSearchState);

  function handleSwitchPair() {
    setPairToken(prevPair => ({
      mainToken: { ...prevPair.comparedToken },
      comparedToken: { ...prevPair.mainToken },
    }));
  }

  function getSymbolTrading() {
    return `CRYPTOCAP:${pairToken.mainToken.token}/CRYPTOCAP:${pairToken.comparedToken.token}`;
  }

  useEffect(() => {
    if (pairWatching.buy.image && pairWatching.sell.image) {
      setPairToken({
        mainToken: {
          token: pairWatching.sell.token,
          image: pairWatching.sell.image,
        },
        comparedToken: {
          token: pairWatching.buy.token,
          image: pairWatching.buy.image,
        },
      });
    }
  }, [pairWatching]);

  return (
    <div>
      <div className="mb-6 flex items-center">
        <div
          className="focus:blueBg flex cursor-pointer items-center rounded-lg px-2 py-1 hover:bg-blackBg"
          onClick={() => setIsShow(true)}
        >
          <FavoriteButton pairToken={pairToken} />
          <Image src={pairToken.mainToken.image} width={20} height={20} />
          <Image src={pairToken.comparedToken.image} width={20} height={20} />
          <span className="mx-2 text-lg font-bold">
            {pairToken.mainToken.token}/{pairToken.comparedToken.token}
          </span>
          <Icon
            defaultSrc={Arrow1Icon}
            hoverSrc={Arrow2Icon}
            focusSrc={Arrow3Icon}
            className="easy-in-out cursor-pointer duration-500 hover:-rotate-180"
            onClick={e => {
              e.stopPropagation();
              handleSwitchPair();
            }}
          />
        </div>
        <div className="flex-auto" />
        <div className="mr-4 flex w-24 flex-col items-end gap-1">
          <span className="text-disabled">$55.32</span>
          <span className="text-xs font-bold text-danger">0.00023003</span>
        </div>
        <div className="mr-4 flex w-24 flex-col items-end gap-1">
          <span className="text-disabled">24h change</span>
          <span className="text-xs text-danger">-1.43%</span>
        </div>
        <div className="mr-4 flex w-16 flex-col items-end gap-1">
          <span className="text-disabled">24h High</span>
          <span className="text-xs">2.8</span>
        </div>
        <div className="flex w-16 flex-col items-end gap-1">
          <span className="text-disabled">24h Low</span>
          <span className="text-xs">1.2</span>
        </div>
      </div>
      <ul className="mb-6 flex w-min overflow-hidden rounded bg-blueBg text-center text-xs">
        <li className="dark w-12 rounded py-2 dark:bg-blackDefault dark:text-white">
          5m
        </li>
        <li className="w-12 py-2">15m</li>
        <li className="w-12 py-2">1h</li>
        <li className="w-12 py-2">4h</li>
        <li className="w-12 py-2">1d</li>
        <li className="w-12 py-2">1w</li>
        <li className="w-12 py-2">1m</li>
      </ul>

      {pairToken && (
        <div className="h-[500px] pb-8">
          <AdvancedRealTimeChart
            symbol={getSymbolTrading()}
            theme="light"
            interval="5"
            style="7"
            hide_side_toolbar={true}
            hide_top_toolbar={true}
            hide_legend={true}
            autosize={true}
            withdateranges={false}
            disabled_features={['adaptive_logo']}
            container_id="tradingview_e6d2a"
          ></AdvancedRealTimeChart>
        </div>
      )}
    </div>
  );
}
