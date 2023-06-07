import { modalSearchState } from '@/recoil/states/modalSearchState';
import { modalSettingState } from '@/recoil/states/modalSettingState';
import classNames from 'classnames';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ModalSetting from './ModalSetting';
import SearchFiled from './SearchFiled';
import SettingConnect from './SettingConnect';
import styles from './styles.module.css';
import { featureState } from '@/recoil/states/featureState';
import logo from 'src/assets/imgs/logo.png';
import Image from 'next/image';

const Header = () => {
  const [isShow, setIsShow] = useRecoilState(modalSettingState);
  const setIsShowModalSearch = useSetRecoilState(modalSearchState);
  const [feature, setFeature] = useRecoilState(featureState);

  return (
    <div className="flex h-16 w-full items-center justify-between sm:mt-2 sm:flex-col">
      <div className="flex-1 sm:order-2 sm:w-full">
        <div className="flex items-center justify-between pr-7">
          <div className="flex items-center sm:py-2">
            <h1
              className={`${
                feature !== 'TRADE' && 'text-disabled'
              } mr-4 cursor-pointer font-bold duration-200 ease-linear`}
              onClick={() => setFeature('TRADE')}
            >
              Trade
            </h1>
            <h1
              className={`${
                feature !== 'FUTURE' && 'text-disabled'
              } mr-4 cursor-pointer font-bold duration-200 ease-linear`}
              onClick={() => setFeature('FUTURE')}
            >
              Future
            </h1>
          </div>
          <button
            onClick={() => setIsShowModalSearch(true)}
            data-cy="search-btn"
            className="sm:hidden"
          >
            <SearchFiled />
          </button>
        </div>
      </div>
      <div className="relative flex w-[360px] items-center justify-end sm:order-1 sm:w-full">
        <div className="mr-auto hidden sm:block">
          <Image src={logo} width={36} height={36} />
        </div>
        <SettingConnect />
        <ModalSetting />
      </div>

      <div
        onClick={() => {
          setIsShow(false);
        }}
        className={classNames(
          styles.backdrop,
          styles.show,
          isShow ? '' : 'hide'
        )}
      ></div>
    </div>
  );
};

export default Header;
