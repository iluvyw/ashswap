import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Collapsible from '@/components/Collapsible';
import classnames from 'classnames';
import { USD_FEE_ESTIMATED } from '@/api/fakeData';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userWalletBalance } from '@/recoil/store';
import {
  ActiveCheckbox,
  Arrow1Icon,
  Arrow2Icon,
  Arrow3Icon,
  ArrowDownIcon,
  InactiveCheckbox,
} from '@/assets';
import { WaitingOrder, OrderType, OrderAction, Leverage } from '@/api/models';
import { ordersState } from '@/recoil/states/ordersState';
import { modalSearchState } from '@/recoil/states/modalSearchState';
import { featureState } from '@/recoil/states/featureState';
import { futureOrderValue } from '@/recoil/states/futureOrderState';
import LeverageInput from './LeverageInput';

export default function CreateFuture() {
  const rate = 0.0002; // 1 BNB = 0.00035 EGLD

  const feature = useRecoilValue(featureState);
  const [futureOrder, setFutureOrder] = useRecoilState(futureOrderValue);
  const walletBalance = useRecoilValue(userWalletBalance);
  const [tabOpening, setTabOpening] = useState<'SHORT' | 'LONG'>('LONG');
  const [collateralSpend, setCollateralSpend] = useState<number>(0);
  const [leverage, setLeverage] = useState<Leverage>(2);
  const [inputTp, setInputTp] = useState<number | undefined>(undefined);
  const [inputSl, setInputSl] = useState<number | undefined>(undefined);

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
    setInputPrice(value);
  }

  function handleChangeCollateralSpend(value: number) {
    setCollateralSpend(value);
  }

  function handleChangeValueTakeProfit(value: number) {
    setInputTp(value);
  }

  function handleChangeValueStopLoss(value: number) {
    setInputSl(value);
  }

  function checkDisableActionButton() {
    if (!collateralSpend || collateralSpend == 0 || !inputPrice) return true;
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

  function toggleTpCheckbox() {
    inputTp === undefined ? setInputTp(0) : setInputTp(undefined);
  }

  function toggleSlCheckbox() {
    inputSl === undefined ? setInputSl(0) : setInputSl(undefined);
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
            <LeverageInput leverage={leverage} setLeverage={setLeverage} />
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
            <div className="flex w-full gap-5">
              <div
                className={classnames(
                  'h-fit w-1/2 rounded-lg border p-2 duration-300 ease-linear hover:bg-blueBg',
                  inputTp !== undefined
                    ? 'border-[#5D5FEF] bg-blueBg'
                    : 'border-transparent'
                )}
              >
                <div
                  onClick={toggleTpCheckbox}
                  className="flex cursor-pointer items-center"
                >
                  <Image
                    src={
                      inputTp === undefined ? InactiveCheckbox : ActiveCheckbox
                    }
                    width={24}
                    height={24}
                    alt="checkbox"
                  />
                  <h3 className="ml-2 text-sm">Take profit</h3>
                </div>
                {inputTp !== undefined && (
                  <div className="mt-10 flex items-center">
                    <input
                      type="number"
                      value={inputTp}
                      onChange={e =>
                        handleChangeValueTakeProfit(e.target.valueAsNumber)
                      }
                      placeholder="0.00"
                      className="transparent-input mr-1 p-0 text-right text-lg"
                    />
                    <h3>{futureOrder.collateral.token}</h3>
                  </div>
                )}
              </div>

              <div
                className={classnames(
                  'h-fit w-1/2 rounded-lg border p-2 duration-300 ease-linear hover:bg-blueBg',
                  inputSl !== undefined
                    ? 'border-[#5D5FEF] bg-blueBg'
                    : 'border-transparent'
                )}
              >
                <div
                  onClick={toggleSlCheckbox}
                  className="flex cursor-pointer items-center"
                >
                  <Image
                    src={
                      inputSl === undefined ? InactiveCheckbox : ActiveCheckbox
                    }
                    width={24}
                    height={24}
                    alt="checkbox"
                  />
                  <h3 className="ml-2 text-sm">Stop loss</h3>
                </div>
                {inputSl !== undefined && (
                  <div className="mt-10 flex items-center">
                    <input
                      type="number"
                      value={inputSl}
                      onChange={e =>
                        handleChangeValueStopLoss(e.target.valueAsNumber)
                      }
                      placeholder="0.00"
                      className="transparent-input mr-1 p-0 text-right text-lg"
                    />
                    <h3>{futureOrder.collateral.token}</h3>
                  </div>
                )}
              </div>
            </div>
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
