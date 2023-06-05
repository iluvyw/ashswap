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

export default function Trading() {
  const [isCollapsedOrderBook, setIsCollapsedOrderBook] =
    useState<boolean>(false);

  return (
    <div className="flex w-full">
      <div className="card relative z-10 flex-1">
        <div className="w-full">
          <TradingView />
        </div>
        <div>
          <div className="my-5 flex">
            <h3 className="mr-8 text-lg font-bold">Limit Orders</h3>
            <h3 className="mr-8 text-lg font-bold text-disabled">
              Long - Short
            </h3>
            <h3 className="mr-8 text-lg font-bold text-disabled">
              Trade History
            </h3>
          </div>
          <WaitingOrder />
        </div>
        <div
          className="absolute -right-3 top-6 h-6 w-6 cursor-pointer"
          onClick={() => setIsCollapsedOrderBook(!isCollapsedOrderBook)}
        >
          <Icon
            defaultSrc={ArrowCircleLeftIcon3}
            hoverSrc={ArrowCircleLeftIcon2}
            focusSrc={ArrowCircleLeftIcon}
          />
        </div>
      </div>
      <div
        className={classnames(
          'card relative -ml-10 mr-6 flex flex-col bg-[#FDFDFF]/60 pl-16 duration-700 ease-in-out',
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
      <div className="w-[360px]">
        <CreateOrder />
      </div>

      <ModalSearch />
    </div>
  );
}
