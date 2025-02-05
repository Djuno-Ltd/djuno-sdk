// import { Client as Web3AuthClient } from '@djuno/web3auth-sdk';
// import { useEffect } from 'react';
import { Web3authProvider } from '@djuno/web3auth-hook';
import Networks from './components/Networks';

export function App() {
  // const endpointUrl = import.meta.env.VITE_WEB3AUTH_URL;
  const accessKey = import.meta.env.VITE_WEB3AUTH_KEY;

  // const client = new Web3AuthClient({ endpointUrl, accessKey });

  // useEffect(() => {
  //   client.networks().then((response) => {
  //     console.log(response);
  //   });
  // }, []);

  return (
    <div>
      <Web3authProvider clientConfigs={{ accessKey }}>
        <Networks />
      </Web3authProvider>
    </div>
  );
}

export default App;
