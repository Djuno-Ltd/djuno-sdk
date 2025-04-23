import React, { FC, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const SolanaProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = 'https://rpc.djuno.io';

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <>{children}</>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
