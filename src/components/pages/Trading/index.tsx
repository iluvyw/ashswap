import { useEffect, useState } from 'react';

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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { waitingTabState } from '@/recoil/states/waitingTabState';
import { featureState } from '@/recoil/states/featureState';
import { futuresState } from '@/recoil/states/futuresState';
import { WAITING_FUTURE_LIST, WAITING_ORDER_LIST } from '@/api/fakeData';
import { ordersState } from '@/recoil/states/ordersState';

export default function Trading() {
  const [isCollapsedOrderBook, setIsCollapsedOrderBook] =
    useState<boolean>(false);
  const feature = useRecoilValue(featureState);
  const [waitingTab, setWaitingTab] = useRecoilState(waitingTabState);
  const setFutures = useSetRecoilState(futuresState);
  const setOrders = useSetRecoilState(ordersState);

  useEffect(() => {
    setOrders(WAITING_ORDER_LIST);
    setFutures(WAITING_FUTURE_LIST);
  }, []);

  return (
    <div className="flex w-full sm:flex-col sm:gap-5">
      <div className="card relative z-10 flex-1 sm:flex sm:overflow-x-scroll">
        <div className="w-full sm:w-fit">
          <TradingView />
        </div>
        <div className="sm:hidden">
          <div className="my-5 flex">
            <h3
              className={classnames(
                'mr-8 cursor-pointer text-lg font-bold',
                waitingTab === 'LIMIT' ? 'text-black' : 'text-disabled'
              )}
              onClick={() => setWaitingTab('LIMIT')}
            >
              Limit Orders
            </h3>
            <h3
              className={classnames(
                'mr-8 cursor-pointer text-lg font-bold',
                waitingTab === 'FUTURE' ? 'text-black' : 'text-disabled'
              )}
              onClick={() => setWaitingTab('FUTURE')}
            >
              Long - Short
            </h3>
            <h3 className="mr-8 text-lg font-bold text-disabled">
              Trade History
            </h3>
          </div>
          {waitingTab === 'LIMIT' && <WaitingOrder />}
          {waitingTab === 'FUTURE' && <WaitingFuture />}
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
        <div
          className={classnames(
            'card relative ml-16 hidden w-60 flex-col bg-[#FDFDFF]/60 bg-blackBg duration-700 ease-in-out sm:flex'
          )}
        >
          <div className="w-40">
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
