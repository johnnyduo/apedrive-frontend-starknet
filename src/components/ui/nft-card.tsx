import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';
import { useCallback, useContext, useMemo, useState } from 'react';
import Button from './button';
import { CarState, useCars, useRefreshCars } from '@/lib/hooks/use-car';
import { addrParse, buyCarNft, mintStampNft } from '@/lib/contract';
import { useAccount, useConnect, useContract, useContractWrite } from '@starknet-react/core';
import ApedriveCarABI from '../../lib/abis/ApedriveCarToken.json'

type NFTGridProps = {
  index: number;
  id: number;
  author: string;
  authorImage: StaticImageData;
  image: StaticImageData;
  name: string;
  collection: string;
  price: number;
  maxSpeed: number;
  mul: number;
  checkin?: boolean;
};

export default function NFTGrid({
  index,
  id,
  author,
  authorImage,
  image,
  name,
  collection,
  price,
  maxSpeed,
  mul,
  checkin = false,
}: NFTGridProps) {
  const [executing, setExecuting] = useState(false);
  const [txHash, setTxHash] = useState('');
  const cars = useCars();
  const refreshCars = useRefreshCars();
  const ownedCar = cars.find((car) => car.id == index);

  const { account, address, status } = useAccount()
  const { connect, connectors } = useConnect()

	const { contract } = useContract({
		abi: ApedriveCarABI,
		address: '0x02ad853bda1a0826b36d7b27e2f323243deecfcb7bd8c6f4743f1de5fa015e9c',
	});

  const calls = useMemo(() => {
    if (!address || !contract) return [];

    return contract.populateTransaction["mint"](address, { low: 1, high: 0 });
  }, [contract, address])

  const { writeAsync } = useContractWrite({ calls })

  const buyCar = useCallback(
    async (index: number) => {
      try {
        setExecuting(true);

        console.log(index, price);

        if (checkin) {
          if (window.prompt('Please enter store check-in code')) {
            const tx = await mintStampNft(index);
            setTxHash(tx.transactionHash);

            window.alert('Check in success (Tx: ' + tx.transactionHash + ')');
          }
        } else {
          // const tx = await buyCarNft(index, price);
          const tx = await writeAsync()

          const cars: CarState[] = JSON.parse(
            window.localStorage.getItem('APEDRIVE_CARS') || '[]'
          );
          cars.push({
            id: index,
            price,
            maxSpeed,
            mul,
          });
          window.localStorage.setItem('APEDRIVE_CARS', JSON.stringify(cars));

          refreshCars();
          setTxHash(tx.transaction_hash);

          window.alert('Buy car success (Tx: ' + tx.transaction_hash + ')');
        }
      } catch (err) {
        console.error(err);
        window.alert(
          'Buy failed! Please check if your wallet has enough ETH fund and try again.'
        );
      } finally {
        setExecuting(false);
      }
    },
    [setExecuting, setTxHash, writeAsync]
  );

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <AnchorLink
          href="/swap"
          className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <Avatar
            image={authorImage}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />
          <span className="overflow-hidden text-ellipsis">@{author}</span>
        </AnchorLink>
      </div>
      <AnchorLink href="#" className="relative block w-full">
        <Image
          className="h-48"
          src={image}
          placeholder="blur"
          width={450}
          height={450}
          alt=""
        />
      </AnchorLink>

      <div className="p-5">
        <AnchorLink
          href="#"
          className="text-sm font-medium text-black dark:text-white"
        >
          {name}
        </AnchorLink>
        <div className="mt-1.5 flex">
          <AnchorLink
            href="/swap"
            className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
          >
            {collection}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </AnchorLink>
        </div>

        {!checkin && (
          <>
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
                <div>+{mul}x</div>
              </div>
            </div>

            <div className="mt-4 text-center text-lg font-medium text-gray-900 dark:text-white">
              {price} ETH
            </div>
          </>
        )}

        <div>
          {status !== 'connected' ? (
            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              disabled={(!checkin && Boolean(ownedCar)) || executing}
              className="mt-4 uppercase xs:tracking-widest"
              onClick={() => connect({ connector: connectors[0] })}
            >
              CONNECT
            </Button>
          ): (
            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              disabled={(!checkin && Boolean(ownedCar)) || executing}
              className="mt-4 uppercase xs:tracking-widest"
              onClick={() => buyCar(index)}
            >
              {checkin ? 'Check In' : Boolean(ownedCar) ? 'Owned' : 'Buy'}
            </Button>
          )}
        </div>

        {txHash && (
          <div className="mt-2 text-center text-xs">
            Tx:{' '}
            <a
              href={`${process.env.NEXT_PUBLIC_EXPLORER_ENDPOINT}/tx/${txHash}`}
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              {addrParse(txHash)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
