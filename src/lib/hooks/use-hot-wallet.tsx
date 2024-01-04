import { ethers } from 'ethers';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { randomPk } from '../random';

export const HotWalletContext = React.createContext<ethers.Wallet | null>(null);

export function HotWalletProvider({ children }: { children: ReactNode }) {
  const [hotWallet, setHotWallet] = useState<ethers.Wallet | null>(null);

  useEffect(() => {
    let hotPk: `0x${string}` = window.localStorage.getItem(
      `APEDRIVE_HOT_PK`
    ) as `0x${string}`;

    if (!hotPk) {
      hotPk = randomPk();
      window.localStorage.setItem(`APEDRIVE_HOT_PK`, hotPk);
    }

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_ENDPOINT
    );
    const wallet = new ethers.Wallet(hotPk, provider);
    setHotWallet(wallet);
  }, []);

  return (
    <HotWalletContext.Provider value={hotWallet}>
      {children}
    </HotWalletContext.Provider>
  );
}

export function useHotWallet() {
  return useContext(HotWalletContext);
}
