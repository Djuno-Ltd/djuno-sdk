import { Client } from '@djuno/web3auth-sdk';
export function Web3authHook() {
  new Client({ accessKey: '66b9249c2f174d53a083b55f45a015b9' });
  return (
    <div>
      <h1>Welcome to Web3authHook!</h1>
    </div>
  );
}

export default Web3authHook;
