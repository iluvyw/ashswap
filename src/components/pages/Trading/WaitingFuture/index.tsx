import React, { useState } from 'react';
import Image from 'next/image';
import ModalCancelOrder from './ModalCancelOrder';
import ModalMore from './ModalMore';
import ModalOrderType from './ModalOrderType';
import { CloseIcon, EditIcon, MoreIcon } from '@/assets';
import { useRecoilState, useRecoilValue } from 'recoil';
import { futuresState } from '@/recoil/states/futuresState';
import { arrangeFutureInfoState } from '@/recoil/states/arrangeFutureInfo';
import ModalEditOrder from './ModalEditOrder';

export default function WaitingFuture() {
  const [modalCancelShow, setModalCancelShow] = useState<boolean>(false);
  const [modalMoreShow, setModalMoreShow] = useState<boolean>(false);
  const [modalOrderTypeShow, setModalOrderTypeShow] = useState<boolean>(false);
  const [modalEditOrder, setModalEditOrder] = useState<boolean>(false);
  const [arrangeFutureInfo] = useRecoilState(arrangeFutureInfoState);
  const futures = useRecoilValue(futuresState);
  const [idSelectedDelete, setIdSelectedDelete] = useState<number | string>();

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              {arrangeFutureInfo.items.map((value, index) => {
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
            {futures.length > 0
              ? futures.map((order, i) => {
                  return (
                    <tr key={i}>
                      {arrangeFutureInfo.items.map(value => {
                        if (!value.show) return null;
                        return value.Cell(order);
                      })}
                      <td className="flex py-2 align-bottom">
                        <button
                          onClick={() => {
                            setIdSelectedDelete(order.id);
                            setModalEditOrder(true);
                          }}
                          className="btn-small m-auto block h-4 w-4 p-[3px] hover:bg-red-300"
                          data-cy={`delete-order-btn-${i}`}
                        >
                          <Image src={EditIcon} />
                        </button>
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
        {futures.length === 0 ? (
          <div className="mt-4 flex w-full justify-center">
            You have not placed any orders yet.
          </div>
        ) : null}
      </div>

      {modalEditOrder && (
        <ModalEditOrder
          idSelected={idSelectedDelete}
          onClose={() => setModalEditOrder(false)}
        />
      )}

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
