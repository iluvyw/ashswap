import { ArrowRightWhite, ClockIcon, SettingIcon } from '@/assets';
import { modalSettingState } from '@/recoil/states/modalSettingState';
import Image from 'next/image';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const SettingConnect = () => {
  const setIsShow = useSetRecoilState(modalSettingState);

  return (
    <div className="flex items-center">
      <button className="mr-2 rounded-xl bg-white px-2 pt-2 pb-1">
        <Image src={ClockIcon} />
      </button>

      <button
        onClick={() => setIsShow(true)}
        className="mr-2 rounded-xl bg-white px-2 pt-2 pb-1"
        data-cy="setting-btn"
      >
        <Image src={SettingIcon} />
      </button>

      <button className="flex items-center justify-center rounded-xl bg-blackDefault pl-3 pr-2 pt-[11px] pb-[10px]">
        <p className="text-xs font-bold text-white">Connect Wallet</p>
        <Image src={ArrowRightWhite} />
      </button>
    </div>
  );
};

export default SettingConnect;
