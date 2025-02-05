import { useWeb3Auth } from '@djuno/web3auth-hook';
import { useEffect } from 'react';

const Networks = () => {
  const {
    networks,
    getNetworks,
    getProfile,
    // getProfileAvatar,
    // profile,
    // profileAvatar,
  } = useWeb3Auth();

  const token = '';

  useEffect(() => {
    getNetworks();

    // getProfile(token);
    // getProfileAvatar(token);
  }, [token]);

  return <div>Welcome to Web3authHook!</div>;
};
export default Networks;
