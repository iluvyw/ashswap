import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Collapsible from '@/components/Collapsible';
import classnames from 'classnames';
import { ORDER_DETAILS } from '@/api/fakeData';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userWalletBalance } from '@/recoil/store';
import {
  ActiveCheckbox,
  Arrow1Icon,
  Arrow2Icon,
  Arrow3Icon,
  ArrowDownIcon,
  ClearIcon,
  InactiveCheckbox,
} from '@/assets';
import { OrderType, Leverage, WaitingFuture } from '@/api/models';
import { modalSearchState } from '@/recoil/states/modalSearchState';
import { futureOrderValue } from '@/recoil/states/futureOrderState';
import LeverageInput from './LeverageInput';
import { futuresState } from '@/recoil/states/futuresState';
import { validate } from '@/utils/validate';

export default function CreateFuture() {
  const rate = '0.0002'; // 1 BNB = 0.00035 EGLD
  const entryPrice = 13422.01;
  const marketPrice = 13032.01;
  const fluctuatingRates = [10, 25, 50, 75, 100];

  const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET'>('LIMIT');
  const [futureOrder, setFutureOrder] = useRecoilState(futureOrderValue);
  const walletBalance = useRecoilValue(userWalletBalance);
  const [tabOpening, setTabOpening] = useState<'SHORT' | 'LONG'>('LONG');
  const [activeInput, setActiveInput] = useState<'TP' | 'SL' | null>(null);
  const [collateralSpend, setCollateralSpend] = useState<string>('');
  const [leverage, setLeverage] = useState<Leverage>(2);
  const [inputTp, setInputTp] = useState<string | undefined>(undefined);
  const [inputSl, setInputSl] = useState<string | undefined>(undefined);
  const [futureOrders, setFutureOrders] = useRecoilState(futuresState);

  const [inputPrice, setInputPrice] = useState<string>('');
  const setIsShow = useSetRecoilState(modalSearchState);

  function getBalanceByToken(token: string) {
    const balance = walletBalance.find(i => i.token === token);
    return balance?.value || 0;
  }

  function handleTabOpening() {
    setTabOpening(tabOpening === 'SHORT' ? 'LONG' : 'SHORT');
    setInputTp(undefined);
    setInputSl(undefined);
    setActiveInput(null);
    setFutureOrder(futureOrder);
  }

  function handleChangeValuePrice(value: string) {
    validate(value) && setInputPrice(value);
  }

  function handleChangeCollateralSpend(value: string) {
    validate(value) && setCollateralSpend(value);
  }

  function handleChangeValueTakeProfit(value: string) {
    validate(value) && setInputTp(value);
  }

  function handleChangeValueStopLoss(value: string) {
    validate(value) && setInputSl(value);
  }

  function checkDisableActionButton() {
    if (!collateralSpend || parseFloat(collateralSpend) == 0 || !inputPrice)
      return true;
    return false;
  }

  function handleSubmitOrder() {
    const valueSubmit: WaitingFuture = {
      id: `ORDER${Date.now()} ${Math.floor(1000 + Math.random() * 9000)}`,
      type: tabOpening === 'LONG' ? OrderType.LONG : OrderType.SHORT,
      token: futureOrder.buy,
      netPnl: {
        fluctuate: 1.98,
        amount: {
          token: futureOrder.collateral.token,
          value: parseFloat(collateralSpend),
        },
      },
      liqPrice: ORDER_DETAILS.liqPrice,
      takeProfit: {
        token: futureOrder.collateral.token,
        value: inputTp ? parseFloat(inputTp) : 0,
      },
      stopLoss: {
        token: futureOrder.collateral.token,
        value: inputSl ? parseFloat(inputSl) : 0,
      },
      entryPrice: entryPrice,
      marketPrice: marketPrice,
      size: {
        token: futureOrder.collateral.token,
        value: ORDER_DETAILS.positionSize,
      },
      collateral: {
        token: futureOrder.collateral.token,
        value: parseFloat(collateralSpend),
        image: futureOrder.collateral.image,
      },
      leverage: leverage,
    };

    setFutureOrders([valueSubmit, ...futureOrders]);
  }

  function setMarketPrice() {
    handleChangeValuePrice(rate);
  }

  function toggleTpCheckbox() {
    inputTp === undefined ? setInputTp('0') : setInputTp(undefined);
    if (activeInput === 'TP') {
      inputSl !== undefined ? setActiveInput('SL') : setActiveInput(null);
    } else {
      inputTp === undefined && setActiveInput('TP');
    }
  }

  function toggleSlCheckbox() {
    inputSl === undefined ? setInputSl('0') : setInputSl(undefined);
    if (activeInput === 'SL') {
      inputTp !== undefined ? setActiveInput('TP') : setActiveInput(null);
    } else {
      inputSl === undefined && setActiveInput('SL');
    }
  }

  useEffect(() => {
    setCollateralSpend('0');
    setLeverage(2);
    setInputTp(undefined);
    setInputSl(undefined);
  }, [tabOpening]);

  return (
    <div>
      <div className="card w-full bg-[#FDFDFF]/60">
        <ul className="flex flex-wrap gap-6 text-center text-sm font-bold uppercase">
          <li onClick={() => setOrderType('LIMIT')}>
            <button
              className={classnames(
                'inline-block uppercase tracking-wider',
                orderType === 'LIMIT' ? 'active' : 'text-gray-400'
              )}
            >
              Limit
            </button>
          </li>
          <li
            onClick={() => {
              setOrderType('MARKET');
              setInputPrice(rate);
            }}
          >
            <button
              className={classnames(
                'inline-block uppercase tracking-wider',
                orderType === 'MARKET' ? 'active' : 'text-gray-400'
              )}
            >
              Market
            </button>
          </li>
          {/* <li>
            <a
              href="#"
              className="inline-block cursor-not-allowed text-gray-400"
            >
              Short
            </a>
          </li> */}
        </ul>
        <div>
          <ul className="mt-7 flex w-full gap-1 rounded-md bg-blackBg p-1 text-sm uppercase">
            <li className="w-1/2" onClick={handleTabOpening}>
              <button
                className={classnames(
                  'active flex h-8 w-full items-center justify-center rounded-md font-bold uppercase duration-300 ease-in-out',
                  tabOpening === 'LONG' ? 'bg-success text-white' : null
                )}
              >
                LONG {futureOrder.buy.token}
              </button>
            </li>

            <li className="w-1/2" onClick={handleTabOpening} data-cy="sell-btn">
              <button
                className={classnames(
                  'flex h-8 w-full items-center justify-center rounded-md font-bold uppercase duration-300 ease-in-out',
                  tabOpening === 'SHORT' ? 'bg-danger text-white' : null
                )}
              >
                SHORT {futureOrder.buy.token}
              </button>
            </li>
          </ul>

          {orderType === 'LIMIT' && (
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
                  <div className="absolute right-2.5 bottom-2.5 flex h-5 w-fit cursor-pointer items-center rounded-lg bg-white px-2">
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
                    onChange={e => handleChangeValuePrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

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
                onChange={e => handleChangeCollateralSpend(e.target.value)}
                className="h-16 w-24 flex-auto p-2.5 text-right text-2xl"
                placeholder="0.0"
                name="collateral"
              />
            </div>
            <span className="mt-2 block text-right text-disabled">
              Balance:{' '}
              <span className="text-[#5D5FEF]">
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
                  activeInput === 'TP'
                    ? 'border-[#5D5FEF]'
                    : 'border-transparent',
                  inputTp !== undefined && 'bg-blueBg'
                )}
                onClick={() => setActiveInput('TP')}
              >
                <div
                  onClick={e => {
                    e.stopPropagation();
                    toggleTpCheckbox();
                  }}
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
                        handleChangeValueTakeProfit(e.target.value)
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
                  activeInput === 'SL'
                    ? 'border-[#5D5FEF]'
                    : 'border-transparent',
                  inputSl !== undefined && 'bg-blueBg'
                )}
                onClick={() => setActiveInput('SL')}
              >
                <div
                  onClick={e => {
                    e.stopPropagation();
                    toggleSlCheckbox();
                  }}
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
                      onChange={e => handleChangeValueStopLoss(e.target.value)}
                      placeholder="0.00"
                      className="transparent-input mr-1 p-0 text-right text-lg"
                    />
                    <h3>{futureOrder.collateral.token}</h3>
                  </div>
                )}
              </div>
            </div>
            {activeInput && (
              <div>
                <hr className="mt-4 mb-1" />
                <div className="flex flex-wrap gap-1">
                  <div className="flex cursor-pointer items-center rounded bg-blackBg p-1">
                    <Image
                      src={ClearIcon}
                      alt="clear-icon"
                      width={10}
                      height={10}
                    />
                    <span className="ml-1">Clear</span>
                  </div>
                  {fluctuatingRates.map((rate, index) => (
                    <div
                      className={classnames(
                        activeInput === 'TP' &&
                          'bg-[#F2FCFA] text-success duration-300 ease-linear hover:bg-success hover:text-[#F2FCFA]',
                        activeInput === 'SL' &&
                          'bg-[#FFF2F7] text-danger duration-300 ease-linear hover:bg-danger hover:text-[#FFF2F7]',
                        'w-10 cursor-pointer rounded p-1 text-center'
                      )}
                      key={index}
                    >
                      +{rate}%
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <Collapsible
          title={
            <div className="flex items-center justify-between gap-3">
              <span className="text-lg">Order Details</span>
              <Image src={ArrowDownIcon} />
            </div>
          }
          content={
            <div>
              <div className="flex justify-between">
                <span>EST. EXECUTION PRICE</span>
                <span className="text-xs text-disabled">{`$${ORDER_DETAILS.estExecutionPrice}`}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>SPREAD</span>
                <span className="text-xs text-disabled">{`${ORDER_DETAILS.spread}%`}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>POSITION SIZE</span>
                <span className="text-xs text-[#5D5FEF]">{`${ORDER_DETAILS.positionSize} ${futureOrder.collateral.token}`}</span>
              </div>
              <hr className="my-4" />
              <div className="mt-4 flex justify-between">
                <span>FEES</span>
                <span className="text-xs text-[#5D5FEF]">{`${ORDER_DETAILS.fees} ${futureOrder.collateral.token}`}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>LIQ.PRICE</span>
                <span className="text-xs text-disabled">{`$${ORDER_DETAILS.liqPrice}`}</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
