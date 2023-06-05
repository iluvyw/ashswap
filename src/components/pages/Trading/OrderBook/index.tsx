import Image from 'next/image';
import { ORDER_BOOK } from '@/api/fakeData';
import { Trend } from '@/api/models';
import OrderItem from './OrderItem';
import { BuyIcon, SellIcon } from '@/assets';

export default function OrderBook() {
  const { sellData, buyData, currentAverage, currentTrend } = ORDER_BOOK;
  return (
    <>
      <div>
        <div className="mb-4 flex justify-between">
          <span className="caption">Sell ({sellData.tokenSell})</span>
          <span className="caption">Price ({sellData.tokenBuy})</span>
        </div>
        {sellData.sellBook.map((item, i) => (
          <OrderItem
            type="SELL"
            item={item}
            key={`${item}-${i}`}
            id={`sell-${i}`}
          />
        ))}
      </div>
      {currentTrend === Trend.DOWN && (
        <div className="my-4 flex items-center">
          <span className="mr-2 text-lg font-bold text-danger">
            {currentAverage.value}
          </span>
          <Image src={SellIcon} className="rotate-90" />
        </div>
      )}
      {currentTrend === Trend.UP && (
        <div className="my-4 flex items-center">
          <span className="mr-2 text-lg font-bold text-success">
            {currentAverage.value}
          </span>
          <Image src={BuyIcon} />
        </div>
      )}

      <div>
        <div className="mb-4 flex justify-between">
          <span className="caption">Buy ({buyData.tokenBuy})</span>
          <span className="caption">Price ({buyData.tokenSell})</span>
        </div>
        {buyData.buyBook.map((item, i) => (
          <OrderItem
            type="BUY"
            item={item}
            key={`${item}-${i}`}
            id={`buy-${i}`}
          />
        ))}
      </div>
    </>
  );
}
