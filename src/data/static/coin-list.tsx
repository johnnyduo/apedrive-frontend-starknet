import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';

export const usdCoinList = [
  {
    icon: <Usdc />,
    code: 'USDC',
    name: 'USD Coin',
    price: 1.001,
  },
];

export const coinList = [
  {
    icon: <Bitcoin />,
    code: 'SPX',
    name: 'SpoilerX',
    price: 19076.29,
  },
  // {
  //   icon: <Ethereum />,
  //   code: 'ETH',
  //   name: 'Ethereum',
  //   price: 1053.28,
  // },
  {
    icon: <Tether />,
    code: 'GRS',
    name: 'GearSpeed',
    price: 0.999,
  },
  {
    icon: <Cardano />,
    code: 'TUX',
    name: 'TurboX',
    price: 0.448,
  },
  {
    icon: <Bnb />,
    code: 'STN',
    name: 'UpTired',
    price: 214.96,
  },
  // {
  //   icon: <Usdc />,
  //   code: 'USDC',
  //   name: 'USD Coin',
  //   price: 1.001,
  // },

  // {
  //   icon: <Doge />,
  //   code: 'DOGE',
  //   name: 'Doge Coin',
  //   price: 0.065,
  // },
];
