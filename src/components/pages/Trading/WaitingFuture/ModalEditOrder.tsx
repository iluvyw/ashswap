import { WaitingFuture } from '@/api/models';
import { Quick25, Quick25n2, Quick25n3 } from '@/assets';
import Icon from '@/components/Icon';
import { futuresState } from '@/recoil/states/futuresState';
import { userWalletBalance } from '@/recoil/store';
import classnames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Modal from 'src/components/Modal';
import { ORDER_DETAILS } from '@/api/fakeData';

type ModalCancelOrderProps = {
  onClose: () => void;
  idSelected?: number | string;
};
const ModalEditOrder: React.FC<ModalCancelOrderProps> = ({
  onClose,
  idSelected,
}) => {
  const [futureOrders, setFutureOrders] = useRecoilState(futuresState);
  const [futureOrder, setFutureOrder] = useState<WaitingFuture | undefined>(
    undefined
  );
  const [editType, setEditType] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT');
  const [collateralSpend, setCollateralSpend] = useState<number>(0);
  const walletBalance = useRecoilValue(userWalletBalance);

  useEffect(() => {
    idSelected && setFutureOrder(futureOrderAtId(idSelected));
  }, []);

  function getBalanceByToken(token: string) {
    const balance = walletBalance.find(i => i.token === token);
    return balance?.value || 0;
  }

  function futureOrderAtId(_id: number | string) {
    return futureOrders.find(value => value.id === _id);
  }

  function updateItemAtIndex(
    array: Array<WaitingFuture>,
    _id: number | string
  ) {
    const index = futureOrders.findIndex(value => value.id === _id);
    Object.freeze(array);
    const updatedItem = futureOrder && {
      ...futureOrder,
      collateral: {
        ...futureOrder.collateral,
        value: collateralSpend,
      },
    };
    const tempArray = [...array];
    updatedItem && index !== -1 && (tempArray[index] = updatedItem);
    return tempArray;
  }

  const handleUpdated = () => {
    if (idSelected)
      setFutureOrders(updateItemAtIndex(futureOrders, idSelected));
    onClose();
  };

  function handleChangeCollateralSpend(value: number) {
    setCollateralSpend(value);
  }

  return (
    <Modal width={715} onClose={onClose} className="transparent-important">
      <div className="flex gap-5">
        <div className="card h-fit w-[320px] text-xs">
          <h2 className="mb-2 text-sm font-bold">Price</h2>
          <div className="mb-2 flex w-full items-center justify-between">
            <h3>Mark price</h3>
            <h3 className="text-disabled">${futureOrder?.marketPrice}</h3>
          </div>
          <div className="mb-2 flex w-full items-center justify-between">
            <h3>Entry price</h3>
            <h3 className="text-disabled">${futureOrder?.entryPrice}</h3>
          </div>
          <div className="mb-2 flex w-full items-center justify-between">
            <h3>Liq. price</h3>
            <h3 className="text-disabled">${futureOrder?.liqPrice}</h3>
          </div>
          <hr className="my-3" />
          <h2 className="mb-2 text-sm font-bold">Order Size</h2>
          <div className="mb-2 flex w-full items-center justify-between">
            <h3>Size</h3>
            <h3 className="text-disabled">
              <span className="mr-1 text-success">(+2.5)%</span>$
              {futureOrder?.size.value}
            </h3>
          </div>
          <h3 className="mb-2 text-right text-disabled line-through">
            ${futureOrder?.size.value}
          </h3>
          <div className="mb-2 flex w-full items-center justify-between">
            <h3>Collateral</h3>
            <h3 className="text-disabled">
              {futureOrder?.collateral.value} {futureOrder?.collateral.token}
            </h3>
          </div>
          <h3 className="mb-2 text-right text-disabled line-through">
            {futureOrder?.collateral.value} {futureOrder?.collateral.token}
          </h3>
          <div className="mb-2 flex w-full items-center justify-between">
            <h3>Fees</h3>
            <h3 className="text-disabled">
              {ORDER_DETAILS.fees} {futureOrder?.collateral.token}
            </h3>
          </div>
        </div>
        <div className="card w-[379px]">
          <div className="mb-6 flex items-center justify-between">
            <span className={`text-lg font-bold`}>{`Edit ${
              futureOrder && futureOrder.type
            } ${futureOrder && futureOrder.token.token}`}</span>
            <button
              onClick={onClose}
              className="rounded-lg bg-blackDefault px-2 py-1 font-bold text-white"
            >
              ESC
            </button>
          </div>
          <div>
            <ul className="flex flex-wrap gap-6 text-center text-sm font-bold uppercase">
              <li onClick={() => setEditType('DEPOSIT')}>
                <a
                  className={classnames(
                    'inline-block cursor-pointer',
                    editType === 'DEPOSIT' ? 'active' : 'text-gray-400'
                  )}
                  aria-current="page"
                >
                  Limit
                </a>
              </li>
              <li
                onClick={() => {
                  setEditType('WITHDRAW');
                }}
              >
                <a
                  className={classnames(
                    'inline-block cursor-pointer',
                    editType === 'WITHDRAW' ? 'active' : 'text-gray-400'
                  )}
                >
                  Market
                </a>
              </li>
            </ul>
            <hr className="my-2" />
            <div className="my-6 flex items-center gap-5">
              <div>
                <span className="mb-2 ml-2 block text-xs text-disabled">
                  Collateral
                </span>
                <div className="focus:blueBg flex w-28 items-center rounded-lg py-1 px-2">
                  {futureOrder && futureOrder.collateral.image && (
                    <Image
                      src={futureOrder.collateral.image}
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="ml-2 flex-1 text-lg font-bold">
                    {futureOrder && futureOrder.collateral.token}
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
                name="collateral"
              />
            </div>
            <span className="mt-2 block text-right text-disabled">
              Balance:{' '}
              <span className="text-[#5D5FEF]">
                {futureOrder && getBalanceByToken(futureOrder.collateral.token)}
              </span>
            </span>
            <div className="relative mb-10 mt-8 flex justify-center">
              <div className="absolute -top-[36%] left-0 z-10 flex w-full items-end gap-1">
                <div className="group relative cursor-pointer">
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    25%
                  </span>
                </div>
                <div className="group relative cursor-pointer">
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    50%
                  </span>
                </div>
                <div className="group relative cursor-pointer">
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    75%
                  </span>
                </div>
                <div className="group relative cursor-pointer">
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    100%
                  </span>
                </div>
              </div>
            </div>
            <button
              className="btn-big w-full bg-black font-bold text-white duration-200 hover:drop-shadow-lg"
              onClick={handleUpdated}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalEditOrder;
