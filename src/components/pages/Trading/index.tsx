import { useState } from 'react';

import classnames from 'classnames';
import Icon from '@/components/Icon';
import {
  ArrowCircleLeftIcon,
  ArrowCircleLeftIcon2,
  ArrowCircleLeftIcon3,
} from '@/assets';
import TradingView from './TradingView';
import WaitingOrder from './WaitingOrder';
import OrderBook from './OrderBook';
import CreateOrder from './CreateOrder';
import ModalSearch from './ModalSearch';
import CreateFuture from './CreateFuture';
import WaitingFuture from './WaitingFuture';
import { useRecoilValue } from 'recoil';
import { featureState } from '@/recoil/states/featureState';

export default function Trading() {
  const [isCollapsedOrderBook, setIsCollapsedOrderBook] =
    useState<boolean>(false);
  const feature = useRecoilValue(featureState);

  return (
    <div className="flex w-full sm:flex-col sm:gap-5">
      <div className="card relative z-10 flex-1 sm:overflow-x-scroll">
        <div className="w-full sm:w-fit">
          <TradingView />
        </div>
        <div className="sm:hidden">
          <div className="my-5 flex">
            <h3
              className={classnames(
                'mr-8 text-lg font-bold',
                feature === 'TRADE' ? 'text-black' : 'text-disabled'
              )}
            >
              Limit Orders
            </h3>
            <h3
              className={classnames(
                'mr-8 text-lg font-bold',
                feature === 'FUTURE' ? 'text-black' : 'text-disabled'
              )}
            >
              Long - Short
            </h3>
            <h3 className="mr-8 text-lg font-bold text-disabled">
              Trade History
            </h3>
          </div>
          {feature === 'TRADE' && <WaitingOrder />}
          {feature === 'FUTURE' && <WaitingFuture />}
        </div>
        <div
          className="absolute -right-3 top-6 h-6 w-6 cursor-pointer sm:hidden"
          onClick={() => setIsCollapsedOrderBook(!isCollapsedOrderBook)}
        >
          <Icon
            defaultSrc={ArrowCircleLeftIcon3}
            hoverSrc={ArrowCircleLeftIcon2}
            focusSrc={ArrowCircleLeftIcon}
            className={!isCollapsedOrderBook ? 'rotate-180' : ''}
          />
        </div>
      </div>
      <div
        className={classnames(
          'card relative -ml-10 mr-6 flex flex-col bg-[#FDFDFF]/60 pl-16 duration-700 ease-in-out sm:hidden',
          isCollapsedOrderBook ? 'w-12' : 'w-60'
        )}
      >
        <div
          className={classnames(
            isCollapsedOrderBook ? 'opacity-0' : 'opacity-100',
            'absolute top-6 right-6 w-40 duration-700 ease-in-out'
          )}
        >
          <OrderBook />
        </div>
        <span
          className={classnames(
            'absolute top-12 -right-5 rotate-90 text-sm font-bold text-disabled duration-700 ease-in-out',
            isCollapsedOrderBook ? 'opacity-100' : 'opacity-0'
          )}
        >
          Orderbook
        </span>
      </div>
      <div className="w-[360px] sm:w-full">
        {feature === 'TRADE' && <CreateOrder />}
        {feature === 'FUTURE' && <CreateFuture />}
      </div>

      <ModalSearch />
    </div>
  );
}
