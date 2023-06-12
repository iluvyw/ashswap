import {
  OrderAction,
  OrderBookList,
  Trend,
  USDFeeEstimated,
  SearchInformation,
  WalletBalance,
  OrderDetails,
  ChartData,
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

export const ORDER_DETAILS: OrderDetails = {
  estExecutionPrice: 27342.12,
  spread: 0.04,
  positionSize: 2350,
  fees: 20,
  liqPrice: 26816.92,
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

export const CHART_DATA: ChartData[] = [
  {
    mainToken: 'BNB',
    comparedToken: 'EGLD',
    data: [
      {
        time: '2018-10-19',
        open: 180.34,
        high: 180.99,
        low: 178.57,
        close: 179.85,
      },
      {
        time: '2018-10-22',
        open: 180.82,
        high: 181.4,
        low: 177.56,
        close: 178.75,
      },
      {
        time: '2018-10-23',
        open: 175.77,
        high: 179.49,
        low: 175.44,
        close: 178.53,
      },
      {
        time: '2018-10-24',
        open: 178.58,
        high: 182.37,
        low: 176.31,
        close: 176.97,
      },
      {
        time: '2018-10-25',
        open: 177.52,
        high: 180.5,
        low: 176.83,
        close: 179.07,
      },
      {
        time: '2018-10-26',
        open: 176.88,
        high: 177.34,
        low: 170.91,
        close: 172.23,
      },
      {
        time: '2018-10-29',
        open: 173.74,
        high: 175.99,
        low: 170.95,
        close: 173.2,
      },
      {
        time: '2018-10-30',
        open: 173.16,
        high: 176.43,
        low: 172.64,
        close: 176.24,
      },
      {
        time: '2018-10-31',
        open: 177.98,
        high: 178.85,
        low: 175.59,
        close: 175.88,
      },
      {
        time: '2018-11-01',
        open: 176.84,
        high: 180.86,
        low: 175.9,
        close: 180.46,
      },
      {
        time: '2018-11-02',
        open: 182.47,
        high: 183.01,
        low: 177.39,
        close: 179.93,
      },
      {
        time: '2018-11-05',
        open: 181.02,
        high: 182.41,
        low: 179.3,
        close: 182.19,
      },
      {
        time: '2018-11-06',
        open: 181.93,
        high: 182.65,
        low: 180.05,
        close: 182.01,
      },
      {
        time: '2018-11-07',
        open: 183.79,
        high: 187.68,
        low: 182.06,
        close: 187.23,
      },
      {
        time: '2018-11-08',
        open: 187.13,
        high: 188.69,
        low: 185.72,
        close: 188.0,
      },
      {
        time: '2018-11-09',
        open: 188.32,
        high: 188.48,
        low: 184.96,
        close: 185.99,
      },
      {
        time: '2018-11-12',
        open: 185.23,
        high: 186.95,
        low: 179.02,
        close: 179.43,
      },
      {
        time: '2018-11-13',
        open: 177.3,
        high: 181.62,
        low: 172.85,
        close: 179.0,
      },
      {
        time: '2018-11-14',
        open: 182.61,
        high: 182.9,
        low: 179.15,
        close: 179.9,
      },
      {
        time: '2018-11-15',
        open: 179.01,
        high: 179.67,
        low: 173.61,
        close: 177.36,
      },
    ],
  },
  {
    mainToken: 'EGLD',
    comparedToken: 'BNB',
    data: [
      {
        time: '2018-10-19',
        open: 173.99,
        high: 177.6,
        low: 173.51,
        close: 177.02,
      },
      {
        time: '2018-10-22',
        open: 176.71,
        high: 178.88,
        low: 172.3,
        close: 173.59,
      },
      {
        time: '2018-10-23',
        open: 169.25,
        high: 172.0,
        low: 167.0,
        close: 169.05,
      },
      {
        time: '2018-10-24',
        open: 170.0,
        high: 170.93,
        low: 169.15,
        close: 169.3,
      },
      {
        time: '2018-10-25',
        open: 169.39,
        high: 170.33,
        low: 168.47,
        close: 168.85,
      },
      {
        time: '2018-10-26',
        open: 170.2,
        high: 172.39,
        low: 168.87,
        close: 169.82,
      },
      {
        time: '2018-10-29',
        open: 169.11,
        high: 173.38,
        low: 168.82,
        close: 173.22,
      },
      {
        time: '2018-10-30',
        open: 172.91,
        high: 177.65,
        low: 170.62,
        close: 177.43,
      },
      {
        time: '2018-10-31',
        open: 176.8,
        high: 177.27,
        low: 174.92,
        close: 175.66,
      },
      {
        time: '2018-11-01',
        open: 175.75,
        high: 180.37,
        low: 175.11,
        close: 180.32,
      },
      {
        time: '2018-11-02',
        open: 183.29,
        high: 183.5,
        low: 179.35,
        close: 181.74,
      },
      {
        time: '2018-11-05',
        open: 181.06,
        high: 182.23,
        low: 174.55,
        close: 175.3,
      },
      {
        time: '2018-11-06',
        open: 173.5,
        high: 176.04,
        low: 170.46,
        close: 175.96,
      },
      {
        time: '2018-11-07',
        open: 175.35,
        high: 178.36,
        low: 172.24,
        close: 172.79,
      },
      {
        time: '2018-11-08',
        open: 173.39,
        high: 173.99,
        low: 167.73,
        close: 171.69,
      },
      {
        time: '2018-11-09',
        open: 174.3,
        high: 175.6,
        low: 171.24,
        close: 172.21,
      },
      {
        time: '2018-11-12',
        open: 173.75,
        high: 176.87,
        low: 172.81,
        close: 174.21,
      },
      {
        time: '2018-11-13',
        open: 174.31,
        high: 174.91,
        low: 172.07,
        close: 173.87,
      },
      {
        time: '2018-11-14',
        open: 172.98,
        high: 175.14,
        low: 171.95,
        close: 172.29,
      },
      {
        time: '2018-11-15',
        open: 171.51,
        high: 171.99,
        low: 166.93,
        close: 167.97,
      },
    ],
  },
];
