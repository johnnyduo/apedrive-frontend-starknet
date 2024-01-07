import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import RootLayout from '@/layouts/_root-layout';
import useContractData from '@/lib/hooks/use-contract-data';
import { ethers } from 'ethers';
import {
  THBUSD,
  addrParse,
  claimPoint,
  executeBuy,
  executeSell,
  fetchUsdcBalance,
  refreshOraclePrice,
  usdcApprove,
} from '@/lib/contract';
import { WalletContext } from '@/lib/hooks/use-connect';
import LeverageBox from '@/components/ui/leverage-box';
import { useSensor } from '@/lib/hooks/use-sensor';
import { useMaxSpeed, useMul } from '@/lib/hooks/use-car';
// @ts-ignore
import SemiCircleProgressBar from 'react-progressbar-semicircle';
import { useAccount, useConnect, useContract, useContractWrite } from '@starknet-react/core';
import { parseEther } from 'ethers/lib/utils';
import ApedriveABI from '../lib/abis/ApedriveToken.json'
import ConnectModal from '@/components/wallet/connect-modal';
import { useQuery } from 'react-query';

const SensorPage: NextPageWithLayout = () => {
  const { account, address, status } = useAccount()
  const { connect, connectors } = useConnect()
  const availableConnector = connectors.find(x => x.available())

  const [ showConnectModal, setShowConnectModal ] = useState(false)

  console.log(connectors)

  const sensorData = useSensor();

  const maxSpeed = useMaxSpeed();
  const mul = useMul();
  const speed = sensorData.v * 3.6;

  const [claimingPoint, setClaimingPoint] = useState(false);
  const [claimedPoint, setClaimedPoint] = useState(
    parseInt(window.localStorage.getItem('APEDRIVE_POINT_CLAIMED') || '0')
  );
  const [claimTxHash, setClaimTxHash] = useState('');
  const [claimLink, setClaimLink] = useState('');

	const { contract } = useContract({
		abi: ApedriveABI,
		address: '0x076f8464920867e9c113a57a4574fb432516afd269e993a4dbd199b24b08beed',
	});

  const calls = useMemo(() => {
    if (!address || !contract) return [];

    const pointToClaim = Math.floor(sensorData.point) - claimedPoint + 1
    return contract.populateTransaction["mint"](address, parseEther(pointToClaim.toString()).toString(), { low: 1, high: 0 });
  }, [contract, address, sensorData.point, claimedPoint])

  const { writeAsync } = useContractWrite({ calls })

  const claim = useCallback(async () => {
    try {
      setClaimingPoint(true);

      const tx = await writeAsync()

      // const tx = await claimPoint(
      //   Math.floor(sensorData.point) - claimedPoint + 1
      // );

      setClaimTxHash(tx.transaction_hash);
      setClaimedPoint(Math.floor(sensorData.point));
      window.localStorage.setItem(
        'APEDRIVE_POINT_CLAIMED',
        Math.floor(sensorData.point).toString()
      );

      window.alert('Claim success. (Tx: ' + tx.transaction_hash + ')');
      // window.alert('Claim success')
    } catch (err) {
      console.error(err);
      window.alert(
        'Claim Failed. Please check if your wallet has enough ETH fund and try again.'
      );
    } finally {
      setClaimingPoint(false);
    }
  }, [sensorData, claimedPoint, setClaimedPoint, setClaimingPoint, writeAsync]);

  const claimWithLink = useCallback(async () => {
    const linkData = `${Math.floor(sensorData.point)},${sensorData.s.toFixed(2)}`
    setClaimLink(`https://apedrive-starknet.vercel.app/sensor?t=${btoa(linkData)}`)
  }, [sensorData])

  return (
    <>
      <NextSeo title="Swap" description="ApeDrive" />
      <ConnectModal open={showConnectModal} onClose={() => setShowConnectModal(false)}></ConnectModal>
      <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5">
        <div className="text-right">
          <span className="rounded border-2">
            Race Mode:
            <span className="blink_me"></span>
          </span>
        </div>
        <div className="mt-4 text-center">
          Distance:{' '}
          {parseFloat((sensorData.s / 1000).toFixed(4)).toLocaleString('en-US')}{' '}
          km
        </div>

        <div className="text-center">
          <div>
            Point: {Math.floor(sensorData.point).toLocaleString('en-US')}
          </div>
          <div className="text-xs">
            Unclaimed Point:{' '}
            {Math.floor(sensorData.point - claimedPoint).toLocaleString(
              'en-US'
            )}
          </div>
          <div>
            {availableConnector ? (
              status !== 'connected' ? (
                <Button
                  shape="rounded"
                  size="small"
                  className="mt-3"
                  onClick={() => setShowConnectModal(true)}
                >
                  CONNECT
                </Button>
              ) : (
                <Button
                  shape="rounded"
                  size="small"
                  className="mt-3"
                  disabled={claimingPoint}
                  onClick={() => claim()}
                >
                  CLAIM
                </Button>
              )
            ) : (
              <Button
                shape="rounded"
                size="small"
                className="mt-3"
                disabled={claimingPoint}
                onClick={() => claimWithLink()}
              >
                CLAIM
              </Button>
            )}

          </div>
          {claimTxHash && (
            <div className="mt-2 text-xs">
              Tx:{' '}
              <a
                href={`${process.env.NEXT_PUBLIC_EXPLORER_ENDPOINT}/tx/${claimTxHash}`}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                {addrParse(claimTxHash)}
              </a>
            </div>
          )}
          {claimLink && (
            <div className="mt-2 text-xs">
              <div>Open this link in your wallet to claim</div>
              <div>{claimLink}</div>
            </div>
          )}
        </div>

        <div className="relative mt-5">
          <div className="flex justify-center">
            <SemiCircleProgressBar
              percentage={Math.min(100, (speed / maxSpeed) * 100)}
              strokeWidth={20}
              diameter={240}
            />
          </div>

          <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
            <div
              className={
                'mt-12 text-2xl ' + (speed > maxSpeed ? 'text-red-600' : '')
              }
            >
              {speed.toFixed(2)}
            </div>
            <div>km/h</div>
          </div>
        </div>

        <div className="mt-8 mb-4 flex gap-4">
          <div className="flex w-1/2 flex-col items-center">
            <div>
              <b>Max Speed</b>
            </div>
            <div>{maxSpeed.toFixed(2)} km/h</div>
          </div>

          <div className="flex w-1/2 flex-col items-center">
            <div>
              <b>Multiplier</b>
            </div>
            <div>{mul}x</div>
          </div>
        </div>

        <div
          onClick={() => {
            window.localStorage.removeItem('APEDRIVE_POINT');
            window.localStorage.removeItem('APEDRIVE_POINT_PENDING');
            window.localStorage.removeItem('APEDRIVE_DISTANCE');
          }}
        ></div>
      </div>
    </>
  );
};

SensorPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default SensorPage;
