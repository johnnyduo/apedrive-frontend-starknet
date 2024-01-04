import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';

import { Bitcoin } from '@/components/icons/bitcoin';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Cardano } from '@/components/icons/cardano';
import { Border } from '@/components/icons/border';

///minimal
export const priceFeedData = [
  {
    id: '0',
    name: 'SpoilerX',
    symbol: 'Zedan',
    balance: 'Type',
    usdBalance: '+5', //+extra stat for speed limit
    logo: BitcoinImage,
    change: '+5%',
    isChangePositive: true,
    color: '#FDEDD4',
    icon: <Border />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
    lastUpdatedAt: 0,
  },
  {
    id: '1',
    name: 'GearSpeed',
    symbol: 'Zedan',
    balance: 'Type',
    usdBalance: '+10',
    logo: TetherImage,
    change: '+10%',
    isChangePositive: true,
    color: '#FDEDD4', //E1F9F1
    icon: <Tether />,
    prices: [
      { name: 1, value: 12187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 37698.98 },
      { name: 4, value: 39587.55 },
      { name: 5, value: 29577.4 },
      { name: 6, value: 31577.4 },
      { name: 7, value: 47577.4 },
      { name: 8, value: 36577.4 },
      { name: 9, value: 28577.4 },
    ],
    lastUpdatedAt: 0,
  },
  {
    id: '2',
    name: 'TurboX',
    symbol: 'Multi',
    balance: 'Type',
    usdBalance: '25',
    logo: CardanoImage,
    change: '+25%',
    isChangePositive: true,
    color: '#DBE3FF',
    icon: <Cardano />,
    prices: [
      { name: 1, value: 25187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
    lastUpdatedAt: 0,
  },
  {
    id: '3',
    name: 'FilterRage',
    symbol: 'Type',
    balance: 'Sport',
    usdBalance: '0.5',
    logo: BinanceImage,
    change: '+0.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <Bnb />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
    lastUpdatedAt: 0,
  },
];
