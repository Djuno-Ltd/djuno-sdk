import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMetamask } from './MetamaskProvider';
import {
  Flex,
  getLocalStorage,
  Loading,
  removeLocalStorage,
  setLocalStorage,
} from 'djuno-design';
// import { animated, useTransition } from '@react-spring/web';
import { useWeb3Auth, Network } from '@djuno/web3auth-hook';
import WalletsConnectionCard from '../components/WalletsConnectionCard';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName as SolanaWalletName } from '@solana/wallet-adapter-base';
import bs58 from 'bs58';

export type IndexContextType = {
  selectedNetwork: Network | null;
  handleChangeSelectedNetwork: (network: Network) => void;
  logout: () => void;
  connect: (chainId: string) => void;
  // walletName: WalletName | null;
  publicKey: string | null;
  transformed_publicKey: string | null;
  connecting: boolean;
  connected: boolean;
};

type AuthStatus = 'connect_wallet' | 'loading' | 'ok';
type WalletName = 'Metamask' | 'Phantom';

export const IndexContext = createContext<IndexContextType | undefined>(
  undefined
);

const IndexProvider = ({ children }: PropsWithChildren) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  // const [walletName, setWalletName] = useState<WalletName | null>(null);

  const { handshake, verify, getProfile, networks } = useWeb3Auth();

  // find and set selected network data from localStorage
  useEffect(() => {
    if (networks.length > 0) {
      let _network = getLocalStorage<Network | null>('network', null);
      if (!_network) {
        _network = networks[0];
        setLocalStorage('network', _network);
      }
      setSelectedNetwork(_network);
    }
  }, [networks]);

  // find and set selected wallet name from localStorage
  // useEffect(() => {
  //   const _walletName = getLocalStorage<WalletName | null>('walletName', null);
  //   setWalletName(_walletName);
  // }, []);

  const {
    publicKey: solanaPublicKey,
    signMessage: solanaSignMessage,
    connecting: solanaConnecting,
    connected: solanaConnected,
    disconnect: solanaDisconnect,
    select: solanaConnect,
  } = useWallet();

  const {
    publicKey: metamaskPublicKey,
    signMessage: metamaskSignMessage,
    isConnecting: metamaskIsConnecting,
    isConnected: metamaskIsConnected,
    connect: metamaskConnect,
    disconnect: metamaskDisconnect,
    getRealAddress: metamaskGetRealAddress,
  } = useMetamask();

  // publicKey combiner
  const publicKey = useMemo(() => {
    if (!selectedNetwork) return null;

    if (selectedNetwork.NetworkName === 'solana' && solanaPublicKey) {
      return solanaPublicKey.toString();
    }

    if (
      ['eth', 'bsc'].includes(selectedNetwork.NetworkName) &&
      metamaskPublicKey
    ) {
      return metamaskPublicKey;
    }
    return null;
  }, [selectedNetwork, metamaskPublicKey, solanaPublicKey]);

  // transformed publicKey combiner
  const transformed_publicKey = useMemo(() => {
    if (!selectedNetwork) return null;

    if (selectedNetwork.NetworkName === 'solana' && solanaPublicKey) {
      return solanaPublicKey.toBase58();
    }

    if (
      ['eth', 'bsc'].includes(selectedNetwork.NetworkName) &&
      metamaskPublicKey
    ) {
      return metamaskGetRealAddress(metamaskPublicKey);
    }
    return null;
  }, [
    selectedNetwork,
    metamaskPublicKey,
    metamaskGetRealAddress,
    solanaPublicKey,
  ]);

  const connecting = useMemo(() => {
    if (!selectedNetwork) return false;
    if (selectedNetwork.NetworkName === 'solana') {
      return solanaConnecting;
    }

    if (['eth', 'bsc'].includes(selectedNetwork.NetworkName)) {
      return metamaskIsConnecting;
    }
    return false;
  }, [selectedNetwork, metamaskIsConnecting, solanaConnecting]);

  const connected = useMemo(() => {
    if (!selectedNetwork) return false;
    if (selectedNetwork.NetworkName === 'solana') {
      return solanaConnected;
    }

    if (['eth', 'bsc'].includes(selectedNetwork.NetworkName)) {
      return metamaskIsConnected;
    }
    return false;
  }, [selectedNetwork, metamaskIsConnected, solanaConnected]);

  // sign message funcrion by connected wallet
  const signMessage = useCallback(
    (message: string): Promise<string | Uint8Array> | undefined => {
      if (!selectedNetwork)
        throw new Error('No network selected for signing message.');

      if (selectedNetwork?.NetworkName === 'solana' && solanaSignMessage) {
        const _message = new TextEncoder().encode(message);
        return solanaSignMessage(_message);
      }

      if (['eth', 'bsc'].includes(selectedNetwork.NetworkName)) {
        return metamaskSignMessage(message);
      }

      throw new Error('Unsupported network or missing network configuration.');
    },
    [selectedNetwork, metamaskSignMessage, solanaSignMessage]
  );

  // logout function
  const logout = useCallback(
    (message = '') => {
      if (selectedNetwork && selectedNetwork.NetworkName === 'solana') {
        //TODO
        removeLocalStorage('token');
        removeLocalStorage('publicKey');
        solanaDisconnect().then().catch();
      }

      if (
        selectedNetwork &&
        ['eth', 'bsc'].includes(selectedNetwork.NetworkName)
      ) {
        metamaskDisconnect().then().catch();
      }

      //
      // setLocalStorage('walletName', null);
      // setWalletName(null);
      setStatus('connect_wallet');

      //TODO:
      //show message if it exist
      //   console.error(message);
    },
    [selectedNetwork, metamaskDisconnect]
  );

  useEffect(() => {
    if (connecting) setStatus('loading');
    else if (!connecting && !connected) setStatus('connect_wallet');
  }, [connecting, connected]);

  useEffect(() => {
    if (publicKey) {
      const _network = getLocalStorage<Network | null>('network', null);
      const _token = getLocalStorage('token', null);
      if (_network) getToken(_network.Id, _token);
    } else {
      logout();
    }
  }, [publicKey]);

  const getToken = useCallback(
    async (networkId: number, token?: string | null) => {
      if (!publicKey || !transformed_publicKey || !networkId || !signMessage) {
        logout();
        return;
      }

      setStatus('loading');

      const login = async (token: string) => {
        try {
          if (publicKey) {
            setLocalStorage('token', token);
            setLocalStorage('publicKey', publicKey);
            getProfile(token);
            setStatus('ok');
          } else {
            logout();
          }
        } catch (e: any) {
          logout();
        }
      };

      try {
        if (token) {
          await login(token);
        } else {
          const response = await handshake(
            networkId.toString(),
            transformed_publicKey
          );
          if (!response) return;

          const signature = await signMessage(response);
          if (!signature) return;

          let trasformed_signature = signature;
          if (selectedNetwork?.NetworkName === 'solana') {
            trasformed_signature = bs58.encode(
              signature as Uint8Array<ArrayBufferLike>
            );
          }

          const authResponse = await verify(
            networkId.toString(),
            transformed_publicKey,
            trasformed_signature as string
          );

          if (authResponse === null) logout('authenticated error!');
          else login(authResponse);
        }
      } catch (e: any) {
        console.log('getToken called catch!', e);
        if (
          e?.error?.message &&
          e?.error?.code !== -32603 &&
          e?.error?.code !== 4001
        ) {
          //   toast.error(e?.error?.message || 'Something went wrong!');
        }
        logout();
      }
    },
    [
      publicKey,
      transformed_publicKey,
      signMessage,
      logout,
      getProfile,
      handshake,
      verify,
    ]
  );

  const handleChangeSelectedNetwork = useCallback((network: Network) => {
    setSelectedNetwork(network);
    setLocalStorage('network', network);
  }, []);

  const connect = useCallback(
    async (chainIdOrWalletName: string) => {
      try {
        if (!selectedNetwork) return;
        if (selectedNetwork?.NetworkName === 'solana') {
          solanaConnect(chainIdOrWalletName as SolanaWalletName);
        }

        if (['eth', 'bsc'].includes(selectedNetwork.NetworkName)) {
          await metamaskConnect(chainIdOrWalletName);
          // setWalletName('Metamask');
        }
      } catch (e: any) {
        const errorCode = e?.code;
        if (errorCode === -32603) {
          // try to connect again if we have new chain to connect
          connect(chainIdOrWalletName);
        } else {
          console.log('connect called catch!', e);
        }
      }
    },
    [selectedNetwork, metamaskConnect, solanaConnect]
  );

  //   const transition = useTransition(status==='connect_wallet', {
  //     from: { opacity: 0 },
  //     leave: { opacity: 0 },
  //     enter: {
  //       opacity: 1,
  //     },
  //   });

  return (
    <IndexContext.Provider
      value={{
        selectedNetwork,
        handleChangeSelectedNetwork,
        logout,
        connect,
        publicKey,
        transformed_publicKey,
        connecting,
        connected,
      }}
    >
      {/* {transition(
        (animationStyle, show) =>
          show && (
            <animated.div style={animationStyle}>
              <WalletModal />
            </animated.div>
          )
      )} */}
      {status === 'connect_wallet' && <WalletsConnectionCard />}
      {status === 'ok' && <>{children}</>}
      {status === 'loading' && (
        <Flex items="center" justify="center" className="w-screen h-screen">
          <Loading />
        </Flex>
      )}
    </IndexContext.Provider>
  );
};

export const useWeb3authUi = () => {
  const context = useContext(IndexContext);
  if (!context) {
    throw new Error('useWeb3authUi must be used within a IndexProvider');
  }
  return context;
};

export default IndexProvider;
