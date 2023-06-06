import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Collapsible from '@/components/Collapsible';
import classnames from 'classnames';
import { USD_FEE_ESTIMATED } from '@/api/fakeData';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userWalletBalance } from '@/recoil/store';
import {
  Arrow1Icon,
  Arrow2Icon,
  Arrow3Icon,
  ArrowDownIcon,
  Quick25,
  Quick25n2,
  Quick25n3,
  Quick50,
  Quick50n2,
  SwapDeco,
} from '@/assets';
import { WaitingOrder, OrderType, OrderAction } from '@/api/models';
import { ordersState } from '@/recoil/states/ordersState';
import { modalSearchState } from '@/recoil/states/modalSearchState';
import { featureState } from '@/recoil/states/featureState';
import { futureOrderValue } from '@/recoil/states/futureOrderState';

export default function CreateFuture() {
  const rate = 0.0002; // 1 BNB = 0.00035 EGLD

  const feature = useRecoilValue(featureState);
  const [futureOrder, setFutureOrder] = useRecoilState(futureOrderValue);
  const walletBalance = useRecoilValue(userWalletBalance);
  const [tabOpening, setTabOpening] = useState<'SHORT' | 'LONG'>('LONG');
  const [collateralSpend, setCollateralSpend] = useState<number>(0);
  const [inputSpend, setInputSpend] = useState<number>(0);
  const [inputBuy, setInputBuy] = useState<number>(0);
  const [inputPrice, setInputPrice] = useState<number | null>();
  const [coinUnitCalculated, setCoinUnitCalculated] = useState<string[]>([]);
  const [orders, setOrders] = useRecoilState(ordersState);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const setIsShow = useSetRecoilState(modalSearchState);

  function getBalanceByToken(token: string) {
    const balance = walletBalance.find(i => i.token === token);
    return balance?.value || 0;
  }

  function handleTabOpening() {
    setTabOpening(tabOpening === 'SHORT' ? 'LONG' : 'SHORT');
    setIsSwapped(false);
    setFutureOrder(futureOrder);
  }

  function getMainTokenHandling() {
    const state = futureOrder.action;
    if (state === 'LONG') return futureOrder.action;
    return futureOrder.action;
  }

  function handleQuickSetInputSpend(percent: number) {
    // handleChangeValueSpend(
    //   (getBalanceByToken(futureOrder.action.token) * percent) / 100
    // );
  }

  function handleSwitchCoinUnitCalculated() {
    // setCoinUnitCalculated(prev => [prev[1], prev[0]]);
    // const _rate = !isSwapped ? 1 / (inputPrice || rate) : inputPrice || rate;
    // if (tabOpening === 'BUY') {
    //   setInputSpend(inputBuy * _rate);
    // } else {
    //   setInputBuy(inputSpend * _rate);
    // }
    // setIsSwapped(prev => !prev);
  }

  function handleChangeValuePrice(value: number) {
    // setInputPrice(value);
    // const _rate = isSwapped ? 1 / value : value;
    // if (tabOpening === 'BUY') {
    //   setInputSpend(inputBuy * _rate);
    // } else {
    //   setInputBuy(inputSpend * _rate);
    // }
  }

  function handleChangeCollateralSpend(value: number) {
    setCollateralSpend(value);
  }

  function handleChangeValueBuy(value: number) {
    // setInputBuy(value);
    // const _rate = isSwapped ? 1 / (inputPrice || rate) : inputPrice || rate;
    // if (tabOpening === 'BUY') setInputSpend(value * (_rate || rate));
    // else setInputSpend(value / (_rate || rate));
  }

  function checkDisableActionButton() {
    if (!collateralSpend || collateralSpend == 0) return true;
    return false;
  }

  function handleSubmitOrder() {
    const valueSubmit: WaitingOrder = {
      id: `ORDER${Date.now()} ${Math.floor(1000 + Math.random() * 9000)}`,
      time: Date.now(),
      type: OrderType.LIMIT_ORDER,
      action: tabOpening as OrderAction,
      pair: tabOpening === 'LONG' ? 'BNB-EGLD' : 'EGLD-BNB',
      price: {
        token: coinUnitCalculated[1],
        value: inputPrice ?? 0.0,
      },
      amount: {
        token: 'EGLD',
        value: tabOpening === 'LONG' ? inputBuy : inputSpend,
      },
      valueUSDC: {
        token: 'BNB',
        value: tabOpening === 'LONG' ? inputSpend : inputBuy,
      },
    };

    setOrders([valueSubmit, ...orders]);
  }

  function setMarketPrice() {
    handleChangeValuePrice(rate);
  }

  useEffect(() => {
    setInputBuy(0);
    setInputSpend(0);
  }, [tabOpening]);

  return (
    <div className={`${feature !== 'FUTURE' && 'hidden'}`}>
      <div className="card w-full bg-[#FDFDFF]/60">
        <ul className="flex flex-wrap gap-6 text-center text-sm font-bold uppercase">
          <li>
            <a href="#" className="active inline-block" aria-current="page">
              Future Order
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block cursor-not-allowed text-gray-400"
            >
              Long
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block cursor-not-allowed text-gray-400"
            >
              Short
            </a>
          </li>
        </ul>
        <div>
          <ul className="mt-7 flex w-full gap-1 rounded-md bg-blackBg p-1 text-sm uppercase">
            <li className="w-1/2" onClick={handleTabOpening}>
              <a
                href="#"
                className={classnames(
                  'active flex h-8 w-full items-center justify-center rounded-md font-bold duration-300 ease-in-out',
                  tabOpening === 'LONG' ? 'bg-success text-white' : null
                )}
                aria-current="page"
              >
                LONG {futureOrder.buy.token}
              </a>
            </li>

            <li className="w-1/2" onClick={handleTabOpening} data-cy="sell-btn">
              <a
                href="#"
                className={classnames(
                  'flex h-8 w-full items-center justify-center rounded-md font-bold duration-300 ease-in-out',
                  tabOpening === 'SHORT' ? 'bg-danger text-white' : null
                )}
              >
                SHORT {futureOrder.buy.token}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex w-full items-center gap-9">
            <div>
              <span className="block text-xs text-disabled">
                <span className="capitalize">
                  {futureOrder.action.toLowerCase()}
                </span>
                &nbsp;{futureOrder.buy.token} when
              </span>
              <span className="flex-auto text-lg">
                1 {futureOrder.buy.token} =
              </span>
            </div>
            <div className="h-16 w-24 flex-auto items-center text-right text-2xl">
              <div className="relative h-16 w-full">
                <div
                  className="absolute right-2.5 bottom-2.5 flex h-5 w-fit cursor-pointer items-center rounded-lg bg-white px-2"
                  onClick={handleSwitchCoinUnitCalculated}
                >
                  <span className="mr-1 text-xs text-black">
                    {futureOrder.collateral.token}
                  </span>
                  <Icon
                    defaultSrc={Arrow1Icon}
                    hoverSrc={Arrow2Icon}
                    focusSrc={Arrow3Icon}
                    width={15}
                    height={15}
                    className="easy-in-out my-auto flex-shrink-0 cursor-pointer duration-500 hover:-rotate-180"
                  />
                </div>
                <button
                  onClick={setMarketPrice}
                  className="absolute top-0 right-2.5 text-[0.6rem] text-[#A5A6F6]"
                >
                  Set to market
                </button>
                <input
                  type="number"
                  name="price"
                  id="input-group-1"
                  className="h-16 w-full pr-20 pt-5 text-right text-xl"
                  placeholder="0.0"
                  value={inputPrice ?? ''}
                  onChange={e => handleChangeValuePrice(e.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>

          <div className="card -mx-6 mt-8 -mb-6">
            <div className="flex gap-5">
              <div>
                <span className="mb-4 ml-2 block text-xs text-disabled">
                  Collateral
                </span>
                <div
                  className="focus:blueBg flex w-28 cursor-pointer items-center rounded-lg py-1 px-2 hover:bg-blackBg"
                  onClick={() => setIsShow(true)}
                >
                  {futureOrder.collateral.image && (
                    <Image
                      src={futureOrder.collateral.image}
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="ml-2 flex-1 text-lg font-bold">
                    {futureOrder.collateral.token}
                  </span>
                </div>
              </div>
              <input
                type="number"
                id="input-group-1"
                value={collateralSpend}
                onChange={e =>
                  handleChangeCollateralSpend(e.target.valueAsNumber)
                }
                className="h-16 w-24 flex-auto p-2.5 text-right text-2xl"
                placeholder="0.0"
                name="spend"
              />
            </div>
            <span className="mt-2 block text-right text-disabled">
              Balance:{' '}
              <span className="text-blackDefault">
                {getBalanceByToken(futureOrder.collateral.token)}
              </span>
            </span>

            {/* <div className="relative mb-6 mt-8 flex justify-center">
              <Image
                src={SwapDeco}
                className="z-10 cursor-pointer"
                onClick={handleTabOpening}
              />
              <div className="absolute -top-[36%] left-0 z-10 flex w-full items-end gap-1">
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(25)}
                >
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    25%
                  </span>
                </div>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(50)}
                >
                  <Icon
                    defaultSrc={Quick50}
                    hoverSrc={Quick50n2}
                    focusSrc={Quick50n2}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    50%
                  </span>
                </div>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(75)}
                >
                  <Icon
                    defaultSrc={Quick50}
                    hoverSrc={Quick50n2}
                    focusSrc={Quick50n2}
                    className="-scale-x-100 transform"
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    75%
                  </span>
                </div>
                <div
                  className="group relative"
                  onClick={() => handleQuickSetInputSpend(100)}
                >
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    100%
                  </span>
                </div>
              </div>
            </div> */}

            <button
              className={classnames(
                'btn-big mt-4 mb-3 w-full font-bold uppercase',
                tabOpening === 'LONG' ? 'btn-success' : 'btn-danger',
                checkDisableActionButton() ? 'btn-disabled' : ''
              )}
              onClick={() => handleSubmitOrder()}
              disabled={checkDisableActionButton()}
              data-cy="submit-order-btn"
            >
              {futureOrder.action} {futureOrder.buy.token}
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <Collapsible
          title={
            <div className="flex items-center gap-3">
              <span className="text-lg">Fee Estimated</span>
              <Image src={ArrowDownIcon} />
              <span className="flex-auto text-right text-xs text-disabled">{`~ $${USD_FEE_ESTIMATED.total}`}</span>
            </div>
          }
          content={
            <div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-xs text-disabled">{`$${USD_FEE_ESTIMATED.platformFee}`}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>Network Gas Fee</span>
                <span className="text-xs text-disabled">{`~ $${USD_FEE_ESTIMATED.gasFee}`}</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
