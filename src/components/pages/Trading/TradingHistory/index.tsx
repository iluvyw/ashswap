import React, { useState } from 'react';
import Image from 'next/image';
import ModalMore from './ModalMore';
import ModalOrderType from './ModalOrderType';
import { MoreIcon } from '@/assets';
import { useRecoilState, useRecoilValue } from 'recoil';
import { arrangeFutureInfoState } from '@/recoil/states/arrangeFutureInfo';
import { historyState } from '@/recoil/states/historyState';

export default function TradingHistory() {
  const [modalMoreShow, setModalMoreShow] = useState<boolean>(false);
  const [modalOrderTypeShow, setModalOrderTypeShow] = useState<boolean>(false);
  const [arrangeFutureInfo] = useRecoilState(arrangeFutureInfoState);
  const history = useRecoilValue(historyState);

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
            {history.length > 0
              ? history.map((order, i) => {
                  return (
                    <tr key={i}>
                      {arrangeFutureInfo.items.map(value => {
                        if (!value.show) return null;
                        return value.Cell(order);
                      })}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {history.length === 0 ? (
          <div className="mt-4 flex w-full justify-center">
            You have not placed any orders yet.
          </div>
        ) : null}
      </div>

      {modalMoreShow && <ModalMore onClose={() => setModalMoreShow(false)} />}

      {modalOrderTypeShow && (
        <ModalOrderType onClose={() => setModalOrderTypeShow(false)} />
      )}
    </div>
  );
}
