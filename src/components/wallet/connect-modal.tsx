'use client';
import React, { useEffect } from 'react';

import { useConnect, Connector, useAccount } from '@starknet-react/core';
import { Dialog } from '@/components/ui/dialog';
import Button from '@/components/ui/button';

export default function ConnectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (address && status == 'connected') {
      onClose();
    }
  }, [status, address]);

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 pt-32 text-center"
      onClose={onClose}
      open={open}
    >
      <Dialog.Panel className={"max-w-md mx-auto p-5 bg-gray-100 rounded-xl shadow"}>
        <Dialog.Title className={"text-xl mb-5"}>Connect Wallet</Dialog.Title>

        <div className="flex flex-col gap-4">
          {connectors.filter(connector => connector.available()).map((connector: Connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={!connector.available()}
            >
              Connect {connector.name}
            </Button>
          ))}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
