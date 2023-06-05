import { ArrowDownIcon, SortIcon } from '@/assets';
import classNames from 'classnames';
import { atom } from 'recoil';
import { ArrangeTheInfoState } from '../types';
import moment from 'moment';

export const arrangeTheInfoState = atom<ArrangeTheInfoState>({
  key: 'arrangeTheInfo',
  default: {
    items: [
      {
        id: 1,
        show: true,
        text: 'Time',
        isHover: false,
        icon: SortIcon,
        Cell: item => (
          <td className="">
            <span className="caption mb-1 block">
              {moment(item.time).format('hh:mm')}
            </span>
            {moment(item.time).format('DD/MM/YYYY')}
          </td>
        ),
      },
      {
        id: 2,
        show: true,
        text: 'Order type',
        isHover: false,
        icon: ArrowDownIcon,
        Cell: item => <td className="px-1 py-2 align-bottom">{item.type}</td>,
      },
      {
        id: 3,
        show: true,
        text: 'Action',
        isHover: false,
        Cell: (item, customStyleText) => (
          <td
            className={classNames(
              'px-1 py-2 align-bottom font-bold',
              customStyleText
            )}
          >
            {item.action}
          </td>
        ),
      },
      {
        id: 4,
        show: true,
        text: 'Pair',
        isHover: false,
        Cell: item => (
          <td className="px-1 py-2 align-bottom text-xs font-bold">
            {item.pair}
          </td>
        ),
      },
      {
        id: 5,
        show: true,
        text: 'Price',
        isHover: false,
        icon: SortIcon,
        Cell: item => (
          <td className="px-1 py-2 text-right align-bottom text-xs">
            {item.price.value}
            <span className="caption ml-1">{item.price.token}</span>
          </td>
        ),
      },
      {
        id: 6,
        show: true,
        text: 'Amount',
        isHover: false,
        icon: SortIcon,
        Cell: item => (
          <td className="px-1 py-2 text-right align-bottom text-xs">
            {item.amount.value}
            <span className="caption ml-1">{item.amount.token}</span>
          </td>
        ),
      },
      {
        id: 8,
        show: false,
        text: 'Total value(USD)',
        isHover: false,
        Cell: item => (
          <td className="px-1 py-2 text-right align-bottom text-xs">
            {item.valueUSDC.value}
            <span className="caption ml-1">{item.valueUSDC.token}</span>
          </td>
        ),
      },
    ],
  },
});
