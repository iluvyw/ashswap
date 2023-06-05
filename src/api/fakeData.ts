import {
  OrderAction,
  OrderBookList,
  Trend,
  USDFeeEstimated,
  SearchInformation,
  WalletBalance,
} from './models';
import coinASH from 'src/assets/imgs/coin-ash.png';
import coinEGLD from 'src/assets/imgs/coin-egld.png';
import coinBNB from 'src/assets/imgs/coin-bnb.png';
import coinUSDT from 'src/assets/imgs/coin-usdt.png';

// export const WAITING_ORDER_LIST: WaitingOrder[] = [
//   {
//     time: 1677835884886,
//     type: OrderType.LIMIT_ORDER,
//     action: OrderAction.BUY,
//     pair: 'EGLD-ASH',
//     price: {
//       token: 'ASH',
//       value: 11111.12,
//     },
//     amount: {
//       token: 'EGLD',
//       value: 212.213,
//     },
//     valueUSDC: {
//       token: 'USDC',
//       value: 890.19,
//     },
//   },
//   {
//     time: 1677835884886,
//     type: OrderType.LIMIT_ORDER,
//     action: OrderAction.SELL,
//     pair: 'BTC-USDT',
//     price: {
//       token: 'USDT',
//       value: 11111.12,
//     },
//     amount: {
//       token: 'BTC',
//       value: 212.213,
//     },
//     valueUSDC: {
//       token: 'USDC',
//       value: 890.19,
//     },
//   },
//   {
//     time: 1677835884886,
//     type: OrderType.LIMIT_ORDER,
//     action: OrderAction.BUY,
//     pair: 'EGLD-ASH',
//     price: {
//       token: 'ASH',
//       value: 11111.12,
//     },
//     amount: {
//       token: 'EGLD',
//       value: 212.213,
//     },
//     valueUSDC: {
//       token: 'USDC',
//       value: 890.19,
//     },
//   },
//   {
//     time: 1677835884886,
//     type: OrderType.LIMIT_ORDER,
//     action: OrderAction.BUY,
//     pair: 'EGLD-ASH',
//     price: {
//       token: 'ASH',
//       value: 11111.12,
//     },
//     amount: {
//       token: 'EGLD',
//       value: 212.213,
//     },
//     valueUSDC: {
//       token: 'USDC',
//       value: 890.19,
//     },
//   },
// ];

export const ORDER_BOOK: OrderBookList = {
  currentAverage: {
    token: 'ASH',
    value: 0.000232,
  },
  currentTrend: Trend.DOWN,
  sellData: {
    tokenSell: 'EGLD',
    tokenBuy: 'ASH',
    sellBook: [
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 80,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 60,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 22,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 30,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 17,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 74,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 18,
      },
      {
        type: OrderAction.SELL,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 46,
      },
    ],
  },
  buyData: {
    tokenSell: 'ASH',
    tokenBuy: 'EGLD',
    buyBook: [
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 80,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 40,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 30,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 15,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 45,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 65,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 27,
      },
      {
        type: OrderAction.BUY,
        averagePrice: {
          token: 'ASH',
          value: 0.000232,
        },
        totalPrice: {
          token: 'EGLD',
          value: 0.0076,
        },
        totalAmount: {
          token: 'ASH',
          value: 9999.11,
        },
        valueUSDC: {
          token: 'USDC',
          value: 9999.222,
        },
        volumnCap: 60,
      },
    ],
  },
};

export const USD_FEE_ESTIMATED: USDFeeEstimated = {
  total: 0.18,
  platformFee: 0.15,
  gasFee: 0.03,
};

export const SEARCH_INFORMATION: SearchInformation = {
  recentSearch: [
    [
      {
        token: 'BNB',
        image: coinBNB,
      },
      {
        token: 'EGLD',
        image: coinEGLD,
      },
    ],
    [
      {
        token: 'USDT',
        image: coinUSDT,
      },
      {
        token: 'EGLD',
        image: coinEGLD,
      },
    ],
    [
      {
        token: 'USDT',
        image: coinUSDT,
      },
      {
        token: 'BNB',
        image: coinBNB,
      },
    ],
  ],
  favoritedList: [
    {
      id: 1,
      pairToken: [
        { token: 'EGLD', image: coinEGLD },
        { token: 'ASH', image: coinASH },
      ],
      percentChanged: 5.09,
      priceChanged: 0.00023,
    },
    {
      id: 2,
      pairToken: [
        { token: 'EGLD', image: coinEGLD },
        { token: 'ASH', image: coinASH },
      ],
      percentChanged: -1.09,
      priceChanged: 0.00023,
    },
    {
      id: 3,
      pairToken: [
        { token: 'EGLD', image: coinEGLD },
        { token: 'ASH', image: coinASH },
      ],
      percentChanged: -1.09,
      priceChanged: 0.00023,
    },
  ],
  topSearch: [
    {
      id: 4,
      pairToken: [
        { token: 'EGLD', image: coinEGLD },
        { token: 'ASH', image: coinASH },
      ],
      percentChanged: 5.09,
      priceChanged: 0.00023,
    },
    {
      id: 5,
      pairToken: [
        { token: 'EGLD', image: coinEGLD },
        { token: 'ASH', image: coinASH },
      ],
      percentChanged: -1.09,
      priceChanged: 0.00023,
    },
  ],
};

export const WALLET_BALANCE: WalletBalance = [
  {
    token: 'BNB',
    value: 1201801.21,
  },
  {
    token: 'EGLD',
    value: 9992.21,
  },
  {
    token: 'USDT',
    value: 12238.21,
  },
];
