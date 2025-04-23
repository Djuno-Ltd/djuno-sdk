import {
  Button,
  cn,
  Dropdown,
  DropdownElement,
  copyToClipboard,
  Loading,
  AnchorProps,
  useDjunoDesign,
} from 'djuno-design';
import { useWeb3authUi } from '../providers/IndexProvider';
import { useMemo, useState } from 'react';
import CheckIcon from './../../assets/check.svg?react';
import UserIcon from './../../assets/user.svg?react';
import { MetamaskIcon } from '../providers/MetamaskProvider';
import { WalletIcon } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletInfoButton: React.FC<{
  handleGoProfile?: () => void;
  anchor?: AnchorProps;
}> = ({ handleGoProfile, anchor }) => {
  const { wallet } = useWallet();
  const { logout, transformed_publicKey, connected, selectedNetwork } =
    useWeb3authUi();
  const { theme } = useDjunoDesign();
  const [copyStatus, setCopyStatus] = useState<'loading' | 'copied'>();

  const walletMenu: Array<DropdownElement> = useMemo(
    () => [
      {
        key: 'copy',
        label: (
          <div className="flex w-full justify-between items-center">
            <span>Copy address</span>
            {copyStatus === 'loading' && (
              <Loading uiSize={12} borderSize={0.88} />
            )}
            {copyStatus === 'copied' && (
              <CheckIcon className="w-4 flex-shrink-0 aspect-auto text-blue-500" />
            )}
          </div>
        ),
        async onClick(_, close) {
          if (transformed_publicKey) {
            setCopyStatus('loading');
            await copyToClipboard(transformed_publicKey);
            setTimeout(() => {
              setCopyStatus('copied');
            }, 500);
            setTimeout(() => {
              setCopyStatus(undefined);
              close();
            }, 1000);
          }
        },
      },
      {
        key: 'change',
        label: 'Change wallet',
        onClick(item, close) {
          console.log('Change wallet');
          logout();
          close();
        },
      },
      { type: 'divider' },
      {
        key: 'disconnect',
        label: 'Disconnect',
        danger: true,
        onClick(item, close) {
          console.log('Disconnect');
          if (connected) logout();
          close();
        },
      },
    ],
    [copyStatus, transformed_publicKey, connected, logout]
  );

  const shortenAddress = (address: string) => {
    return address.slice(0, 7) + '...' + address.slice(-5);
  };

  if (!connected) return <></>;
  return (
    <div className={cn('flex items-center')}>
      {handleGoProfile && (
        <div
          className={cn(
            'border-2 border-r-1 h-full px-2 rounded-l-lg flex justify-center items-center cursor-pointer group hover:border-blue-300 hover:bg-blue-50',
            {
              '!bg-zinc-900 hover:!bg-zinc-800 !border-zinc-800':
                theme.mode === 'dark',
            }
          )}
          onClick={handleGoProfile}
        >
          <UserIcon
            className={cn(
              'w-5 flex-shrink-0 aspect-square text-slate-400 group-hover:text-blue-500',
              {
                '!text-slate-300 group-hover:!text-blue-400':
                  theme.mode === 'dark',
              }
            )}
          />
        </div>
      )}

      {connected && (
        <Dropdown menu={walletMenu} anchor={anchor}>
          <Button
            className={cn('!px-2', {
              '!rounded-l-none !border-l-1': handleGoProfile,
            })}
          >
            {transformed_publicKey ? (
              <>
                {selectedNetwork?.NetworkName !== 'solana' && (
                  <MetamaskIcon className="w-5 flex-shrink-0 aspect-square" />
                )}
                {selectedNetwork?.NetworkName === 'solana' && wallet && (
                  <WalletIcon
                    wallet={wallet}
                    className="w-5 flex-shrink-0 aspect-square"
                  />
                )}
                <p>{shortenAddress(transformed_publicKey)}</p>
              </>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export default WalletInfoButton;
