import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ModalCancelOrder from './ModalCancelOrder';
import ModalMore from './ModalMore';
import ModalOrderType from './ModalOrderType';
import { CloseIcon, MoreIcon } from '@/assets';
import { useRecoilState } from 'recoil';
import { arrangeTheInfoState } from '@/recoil/states/arrangeTheInfo';
import { OrderAction } from '@/api/models';
import { ordersState } from '@/recoil/states/ordersState';
import { WAITING_ORDER_LIST } from '@/api/fakeData';

export default function WaitingOrder() {
  const [modalCancelShow, setModalCancelShow] = useState<boolean>(false);
  const [modalMoreShow, setModalMoreShow] = useState<boolean>(false);
  const [modalOrderTypeShow, setModalOrderTypeShow] = useState<boolean>(false);
  const [arrangeTheInfo] = useRecoilState(arrangeTheInfoState);
  const [orders, setOrders] = useRecoilState(ordersState);
  const [idSelectedDelete, setIdSelectedDelete] = useState<number | string>();

  useEffect(() => {
    setOrders(WAITING_ORDER_LIST);
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              {arrangeTheInfo.items.map((value, index) => {
                if (!value.show) return null;
                return (
                  <th scope="col" key={index}>
                    <div
                      className={`${index === 0 ? 'ml-0' : ''} ${
                        !value.icon ? 'text-disabled' : ''
                      }`}
                      onClick={() => {
                        if (value.id === 2) setModalOrderTypeShow(true);
                      }}
                    >
                      {value.text}
                      {value.icon ? <Image src={value.icon} /> : null}
                    </div>
                  </th>
                );
              })}

              <th scope="col" className="w-9">
                <button
                  onClick={() => {
                    setModalMoreShow(true);
                  }}
                  data-cy="more-btn"
                >
                  <div className="px-1">
                    <Image src={MoreIcon} />
                  </div>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0
              ? orders.map((order, i) => {
                  return (
                    <tr key={i}>
                      {arrangeTheInfo.items.map(value => {
                        if (!value.show) return null;
                        return value.Cell(
                          order,
                          order.action === OrderAction.BUY
                            ? 'text-success'
                            : 'text-danger'
                        );
                      })}
                      <td className="px-1 py-2 align-bottom">
                        <button
                          onClick={() => {
                            setIdSelectedDelete(order.id);
                            setModalCancelShow(true);
                          }}
                          className="btn-small m-auto block h-4 p-0 hover:bg-red-300"
                          data-cy={`delete-order-btn-${i}`}
                        >
                          <Image src={CloseIcon} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {orders.length === 0 ? (
          <div className="mt-4 flex w-full justify-center">
            You have not placed any orders yet.
          </div>
        ) : null}
      </div>

      {modalCancelShow && (
        <ModalCancelOrder
          idSelected={idSelectedDelete}
          onClose={() => setModalCancelShow(false)}
        />
      )}

      {modalMoreShow && <ModalMore onClose={() => setModalMoreShow(false)} />}

      {modalOrderTypeShow && (
        <ModalOrderType onClose={() => setModalOrderTypeShow(false)} />
      )}
    </div>
  );
}
