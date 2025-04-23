import React from 'react';
import { Web3authProvider, ClientConfigs } from '@djuno/web3auth-hook';
import './styles.css';
import { MetaMaskProvider } from './providers/MetamaskProvider';
import IndexProvider from './providers/IndexProvider';
import { DDProvider } from 'djuno-design';
import { SolanaProvider } from './providers/SolanaProvider';

const Web3authUiProvider: React.FC<
  React.PropsWithChildren<{ clientConfigs: ClientConfigs }>
> = ({ children, clientConfigs }) => {
  return (
    <DDProvider>
      <Web3authProvider clientConfigs={clientConfigs}>
        <MetaMaskProvider>
          <SolanaProvider>
            <IndexProvider>{children}</IndexProvider>
          </SolanaProvider>
        </MetaMaskProvider>
      </Web3authProvider>
    </DDProvider>
  );
};
export default Web3authUiProvider;
