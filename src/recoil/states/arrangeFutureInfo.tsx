import { ArrowDownIcon, SortIcon } from '@/assets';
import { atom } from 'recoil';
import { ArrangeFutureState } from '../types';
import Image from 'next/image';
import { OrderType } from '@/api/models';

export const arrangeFutureInfoState = atom<ArrangeFutureState>({
  key: 'arrangeFutureInfo',
  default: {
    items: [
      {
        id: 1,
        show: true,
        text: 'Type',
        isHover: false,
        icon: ArrowDownIcon,
        Cell: item => (
          <td>
            <div className="flex items-center">
              <span
                className={`${
                  item.type === OrderType.LONG ? 'text-success' : 'text-danger'
                } font-bold`}
              >
                {item.type}
              </span>{' '}
              <span className="caption ml-1">{item.leverage}x</span>
            </div>
          </td>
        ),
      },
      {
        id: 2,
        show: true,
        text: 'Token',
        isHover: false,
        Cell: item => (
          <td>
            <div className="flex items-center">
              {item.token.image && (
                <Image
                  src={item.token.image}
                  alt="token"
                  width={10}
                  height={10}
                />
              )}
              <span className="ml-1 font-bold">{item.token.token}</span>
            </div>
          </td>
        ),
      },
      {
        id: 3,
        show: true,
        text: 'Net Pnl',
        isHover: false,
        icon: SortIcon,
        Cell: item => (
          <td className="text-right">
            <span
              className={`${
                item.netPnl.fluctuate >= 0 ? 'text-success' : 'text-danger'
              } caption`}
            >
              ({item.netPnl.fluctuate < 0 ? '-' : '+'}
              {item.netPnl.fluctuate}%)
            </span>
            <span className="mx-1">{item.netPnl.amount.value}</span>
            <span className="caption">{item.netPnl.amount.token}</span>
          </td>
        ),
      },
      {
        id: 4,
        show: false,
        text: 'Liq. Price',
        isHover: false,
        Cell: item => <td className="text-right">${item.liqPrice}</td>,
      },
      {
        id: 5,
        show: true,
        text: 'Stop Loss',
        isHover: false,
        Cell: item => (
          <td className="text-right">
            {item.stopLoss.value} {item.stopLoss.token}
          </td>
        ),
      },
      {
        id: 6,
        show: true,
        text: 'Take Profit',
        isHover: false,
        Cell: item => (
          <td className="text-right">
            {item.takeProfit.value} {item.takeProfit.token}
          </td>
        ),
      },
      {
        id: 7,
        show: false,
        text: 'Entry Price',
        isHover: false,
        Cell: item => <td className="text-right">${item.entryPrice}</td>,
      },
      {
        id: 8,
        show: true,
        text: 'Market Price',
        isHover: false,
        Cell: item => <td className="text-right">${item.marketPrice}</td>,
      },
      {
        id: 9,
        show: true,
        text: 'Size',
        isHover: false,
        icon: SortIcon,
        Cell: item => (
          <td className="text-right">
            {item.size.value} <span className="caption">{item.size.token}</span>
          </td>
        ),
      },
      {
        id: 10,
        show: true,
        text: 'Collateral',
        isHover: false,
        Cell: item => (
          <td className="text-right">
            {item.size.value} {item.size.token}
          </td>
        ),
      },
    ],
  },
});
