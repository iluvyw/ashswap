import { OrderBookItem } from '@/api/models';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import classnames from 'classnames';
import 'react-tooltip/dist/react-tooltip.css';
import { BuyIcon, SellIcon } from '@/assets';

type OrderItemProps = {
  type: 'SELL' | 'BUY';
  item: OrderBookItem;
  id: string;
};

const OrderItem: React.FC<OrderItemProps> = ({ type, item, id }) => {
  const isSell = type === 'SELL';

  return (
    item && (
      <>
        <div
          className="group relative flex items-center justify-between px-1.5 py-0.5"
          id={id}
        >
          <span>{item.totalPrice.value}</span>
          <span
            className={classnames(
              'text-xs font-bold',
              isSell ? 'text-danger' : 'text-success'
            )}
          >
            {item.averagePrice.value}
          </span>
          <div
            className={classnames(
              'absolute right-0 h-full rounded-l bg-[#FF005C0D]',
              isSell ? 'bg-[#FF005C0D]' : 'bg-[#05C9A10D]'
            )}
            style={{ width: item.volumnCap * 2 }}
          ></div>
          <div className="absolute -left-4 hidden group-hover:block">
            <Image src={isSell ? SellIcon : BuyIcon} />
          </div>
        </div>

        <Tooltip
          anchorSelect={`#${id}`}
          className="z-10"
          place="left"
          variant="light"
          noArrow={true}
          style={{ padding: 0, borderRadius: '18px', opacity: 1 }}
        >
          <div className="card bg-white text-blackDefault shadow-3xl">
            <span className="text-sm font-bold">
              Click on price for quick importing
            </span>
            <hr className="mt-6 mb-4" />
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-disabled">
                  Average price ({item.averagePrice.token})
                </span>
                <span
                  className={classnames(
                    'text-xs font-bold',
                    isSell ? 'text-danger' : 'text-success'
                  )}
                >
                  {item.averagePrice.value}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-disabled">
                  Total {item.totalPrice.token}
                </span>
                <span className="text-xs">{item.totalPrice.value}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-disabled">
                  Total {item.totalAmount.token}
                </span>
                <span className="text-xs">{item.totalAmount.value}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-disabled">
                  Total value ({item.valueUSDC.token})
                </span>
                <span className="text-xs">${item.valueUSDC.value}</span>
              </div>
            </div>
          </div>
        </Tooltip>
      </>
    )
  );
};
export default OrderItem;
