import { useWeb3Auth } from '@djuno/web3auth-hook';
import { useEffect } from 'react';

const Networks = () => {
  const { getNetworks } = useWeb3Auth();

  useEffect(() => {
    getNetworks();
  }, []);

  return <div>Welcome to Web3authHook!</div>;
};
export default Networks;
