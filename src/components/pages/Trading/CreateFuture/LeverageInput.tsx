import { Leverage } from '@/api/models';
import { BikeIcon, Diamond1Icon } from '@/assets';
import Image from 'next/image';
import React from 'react';

export default function LeverageInput({
  leverage,
  setLeverage,
}: {
  leverage: Leverage;
  setLeverage: React.Dispatch<React.SetStateAction<Leverage>>;
}) {
  const leveragePoints: Leverage[] = [2, 5, 15, 20, 30, 40, 50];

  const percentage = (leverage: Leverage) => {
    const index = leveragePoints.indexOf(leverage);
    if (index === leveragePoints.length - 1) {
      return '100';
    }
    return parseInt(
      ((index / leveragePoints.length) * 100).toString()
    ).toString();
  };

  return (
    <>
      <div className="my-4 flex flex-row items-center justify-between">
        <span className="text-xs text-disabled">Leverage</span>
        <div className="flex h-[16px] items-center">
          <h1 className="mr-1 text-sm font-bold text-[#5D5FEF]">{leverage}x</h1>
          <Image src={BikeIcon} alt="bike-icon" width={16} height={16} />
        </div>
      </div>
      <div className="group">
        <div className="relative my-2 h-[14px] w-full">
          <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 overflow-hidden bg-blueBg duration-200 ease-linear group-hover:h-[8px]">
            <div
              className={'h-full bg-[#5D5FEF]'}
              style={{ width: `calc(${percentage(leverage)}% + 1rem + 6px)` }}
            />
          </div>
          <div className="absolute top-1/2 left-0 flex w-full -translate-y-1/2 items-center justify-between px-4">
            {leveragePoints.map(point => (
              <div
                key={point}
                className="flex h-[14px] w-[14px] items-center justify-center"
              >
                <Image src={Diamond1Icon} width={8} height={8} alt="icon" />
              </div>
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={6}
            onChange={e => setLeverage(leveragePoints[e.target.valueAsNumber])}
            value={leveragePoints.indexOf(leverage)}
            className="absolute top-1/2 left-0 flex h-0 w-full -translate-y-1/2 px-4"
          />
        </div>
        <div className="relative flex w-full items-center justify-between px-4">
          {leveragePoints.map((point, index) => (
            <h3
              key={index}
              className="flex h-[14px] w-[14px] cursor-pointer items-center justify-center text-xs font-extralight"
              onClick={() => setLeverage(point as Leverage)}
            >
              {point}x
            </h3>
          ))}
        </div>
      </div>
    </>
  );
}
