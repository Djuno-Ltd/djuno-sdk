// import { WalletName } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletIcon } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';
// import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { MetamaskIcon } from '../providers/MetamaskProvider';
import { NetworkWallet, useWeb3Auth } from '@djuno/web3auth-hook';
import { useWeb3authUi } from '../providers/IndexProvider';
import { Card, cn, Flex, Typography, useDjunoDesign } from 'djuno-design';
import NetworksDropdown from './NetworksDropdown';
import DjunoLogo from './../../assets/logo.svg?react';

function WalletsConnectionCard({ absolute }: { absolute?: boolean }) {
  const { wallets } = useWallet();

  const { selectedNetwork, connect } = useWeb3authUi();
  const { getNetworks } = useWeb3Auth();
  const { theme } = useDjunoDesign();

  useEffect(() => {
    getNetworks();
  }, []);

  const handleConnect = (chainId: string) => {
    connect(chainId);
  };

  const WalletConnectionContent = () => {
    return (
      <Flex direction="col" className="gap-4">
        <Flex direction="col" className="gap-1">
          <Typography.Text className={cn('!text-sm', { '': absolute })}>
            Select network
          </Typography.Text>
          <NetworksDropdown />
        </Flex>

        <Flex direction="col" className="gap-1">
          <Typography.Text className={cn('!text-sm', { '': absolute })}>
            Select your wallet
          </Typography.Text>
          <ul className="flex flex-col gap-2">
            {selectedNetwork?.NetworkName === 'solana' &&
              wallets.map((wallet) => (
                <li
                  key={`wallet-${wallet.adapter.name}`}
                  onClick={() => handleConnect(wallet.adapter.name)}
                  className={cn(
                    'flex gap-2 items-center cursor-pointer border px-2 py-2 rounded-lg hover:bg-slate-100 h-11',
                    {
                      '!border-zinc-700 !bg-zinc-900 hover:!bg-zinc-800':
                        theme.mode === 'dark',
                    }
                  )}
                >
                  <WalletIcon
                    wallet={wallet}
                    className="w-5 flex-shrink-0 aspect-square"
                  />
                  <Typography.Text className="!text-sm">
                    {wallet.adapter.name}
                  </Typography.Text>
                </li>
              ))}
            {selectedNetwork &&
              ['eth', 'bsc'].includes(selectedNetwork.NetworkName) &&
              selectedNetwork.WalletResponses.map((wallet: NetworkWallet) => (
                <li
                  key={`wallet-${wallet.WalletName}`}
                  onClick={() => handleConnect(selectedNetwork.ChainId)}
                  className={cn(
                    'flex gap-2 items-center cursor-pointer border px-2 py-2 rounded-lg hover:bg-slate-100 h-11',
                    {
                      '!border-zinc-700 !bg-zinc-900 hover:!bg-zinc-800':
                        theme.mode === 'dark',
                    }
                  )}
                >
                  <MetamaskIcon className="w-5 flex-shrink-0 aspect-square" />
                  <Typography.Text className="!text-sm">
                    {wallet.WalletName}
                  </Typography.Text>
                </li>
              ))}
          </ul>
        </Flex>
        <Flex className="w-full gap-1" justify="end">
          <a
            href="https://djuno.io"
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <Flex items="center" className="gap-1">
              <Typography.Text
                uiType="secondary"
                size="xs"
                className="opacity-60 group-hover:opacity-100"
              >
                Powered by{' '}
              </Typography.Text>
              <Flex items="center" className="gap-0.5">
                <DjunoLogo className="w-4 h-4 aspect-auto opacity-60 group-hover:opacity-100" />
                <Typography.Text
                  uiType="secondary"
                  size="xs"
                  className="opacity-60 group-hover:opacity-100"
                >
                  Djuno
                </Typography.Text>
              </Flex>
            </Flex>
          </a>
        </Flex>
      </Flex>
    );
  };
  if (absolute) return <WalletConnectionContent />;
  return (
    <div
      className={'w-screen h-screen flex flex-col justify-center items-center'}
    >
      <Card className={'!min-w-[300px] !max-w-md'}>
        {/* <Logo width={70} /> */}
        <Typography.Title level={4} className="!w-full text-center mb-2">
          Connect wallet
        </Typography.Title>
        <WalletConnectionContent />
      </Card>
    </div>
  );
}

export default WalletsConnectionCard;
