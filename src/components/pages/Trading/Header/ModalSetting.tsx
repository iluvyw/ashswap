import classNames from 'classnames';
import React, { useState } from 'react';
import { CogIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ArrowDownIcon, USAFlag } from '@/assets';
import { useRecoilState } from 'recoil';
import { modalSettingState } from '@/recoil/states/modalSettingState';

const ModalSetting = () => {
  const [isShow, setIsShow] = useRecoilState(modalSettingState);
  const [isShowLangMenu, setIsShowLangMenu] = useState<boolean>(false);

  const [listMenuTheme, setListMenuTheme] = useState([
    {
      id: 'light',
      text: 'LIGHT',
      icon: <SunIcon className="mr-1 h-5 w-5" />,
      active: true,
    },
    {
      id: 'dark',
      text: 'DARK',
      icon: <MoonIcon className="mr-1 h-5 w-5" />,
      active: false,
    },
    {
      id: 'system',
      text: 'SYSTEM',
      icon: <CogIcon className="mr-1 h-5 w-5" />,
      active: false,
    },
  ]);

  const [listLang] = useState([
    {
      id: 'english',
      text: 'English',
    },
    {
      id: 'vietnamese',
      text: 'Vietnamese',
    },
    {
      id: 'francis',
      text: 'Francis',
    },
  ]);

  const handleChooseTheme = (_id: string) => {
    setListMenuTheme(
      listMenuTheme.map(value => {
        if (value.id === _id) return { ...value, active: true };
        return { ...value, active: false };
      })
    );
  };

  const renderChooseThemeMenu = () => {
    return (
      <>
        <div className="flex items-center justify-between">
          <h3 className="font-bold" data-cy="setting-text">
            Settings
          </h3>
          <button
            onClick={() => setIsShow(false)}
            className="rounded-lg bg-blackDefault px-2 py-1 font-bold text-white"
          >
            ESC
          </button>
        </div>

        <div className="my-5 h-[1px] w-full bg-blueBg" />
        <div className=" flex w-[436px] justify-between rounded-md bg-blueBg py-1 px-1">
          {listMenuTheme.map(value => {
            return (
              <button
                key={value.id}
                className={`flex w-[140px] items-center justify-center rounded-md transition-all duration-300 hover:bg-white ${
                  value.active ? 'bg-white' : ''
                } py-2`}
                onClick={() => handleChooseTheme(value.id)}
                data-cy={`setting-tab-${value.id}`}
              >
                {value.icon}
                <p className="mt-[2px] text-[12px] font-bold">{value.text}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <button
            onClick={() => setIsShowLangMenu(true)}
            className="flex w-full flex-col rounded-lg bg-blueBg p-3"
            data-cy={`language-btn`}
          >
            <p>Languages</p>

            <div className="mt-6 flex w-full items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={USAFlag}
                  width={20}
                  height={19}
                  className="rounded-md"
                />
                <p className="ml-2 mt-[2.5px] text-xs font-bold">English</p>
              </div>

              <div className="-rotate-90">
                <Image src={ArrowDownIcon} />
              </div>
            </div>
          </button>

          <button className="flex w-full flex-col rounded-lg bg-blueBg p-3">
            <p>Comma</p>

            <div className="mt-6 flex w-full items-center justify-between">
              <div className="flex items-center">
                <p className="mt-[2.5px] text-xs font-bold">e.g 1,000</p>
              </div>

              <div className="-rotate-90">
                <Image src={ArrowDownIcon} />
              </div>
            </div>
          </button>
        </div>
      </>
    );
  };

  const renderChooseLangMenu = () => {
    return (
      <>
        <div className="flex items-center justify-between">
          <button onClick={() => setIsShowLangMenu(false)} className=" ">
            <div className="rotate-90">
              <Image src={ArrowDownIcon} />
            </div>
          </button>
          <h3 className="font-bold" data-cy="language-text">
            Languages
          </h3>
          <button
            onClick={() => setIsShow(false)}
            className="rounded-lg bg-blackDefault px-2 py-1 font-bold text-white"
          >
            ESC
          </button>
        </div>

        <div className="my-5 h-[1px] w-full bg-blueBg" />

        <div className="w-[440px]">
          {listLang.map(value => (
            <button
              key={value.id}
              onClick={() => setIsShowLangMenu(true)}
              className="flex w-full flex-col rounded-lg  px-3 py-5"
            >
              <div className=" flex w-full items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={USAFlag}
                    width={20}
                    height={19}
                    className="rounded-md"
                  />
                  <p className="ml-2 mt-[2.5px] text-xs font-bold">
                    {value.text}
                  </p>
                </div>

                <div className="-rotate-90">
                  <Image src={ArrowDownIcon} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={classNames(
        'absolute top-[46px] right-[30px] z-50  rounded-2xl bg-white px-5 py-6 shadow-xl',
        `${isShow ? 'block' : 'hide'}`
      )}
    >
      {isShowLangMenu ? renderChooseLangMenu() : renderChooseThemeMenu()}
    </div>
  );
};

export default ModalSetting;
