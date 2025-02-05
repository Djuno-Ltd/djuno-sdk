<!-- # @djuno/web3auth-hook

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test @djuno/web3auth-hook` to execute the unit tests via [Vitest](https://vitest.dev/). -->

# @djuno/web3auth-hook

A React package from [Djuno](https://www.djuno.io/) that provides an easy way to integrate Djuno's web3auth service into React applications. This package serves as a wrapper around Djuno's web3auth-sdk, offering hooks for authentication and profile management.

This package supports both JavaScript and TypeScript, and is designed to work seamlessly in React projects.

## Getting Started

### Installation

- Requires Node.js v16 or higher
- Run `npm install @djuno/web3auth-hook` or `yarn add @djuno/web3auth-hook` to install.

### Quickstart

1. **Setting up the Web3authProvider**

You need to wrap your app in a `Web3authProvider` to provide access to the Web3Auth context:

```tsx
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
```

<br>

```tsx
import { Web3authProvider } from '@djuno/web3auth-hook';
import Networks from './components/Networks';

function App() {
  const accessKey = 'your-access-key'; // Replace with your Web3Auth key

  return (
    <Web3authProvider clientConfigs={{ accessKey }}>
      <Networks />
    </Web3authProvider>
  );
}

export default App;
```

### Explanation of the Example Code:

1. **`App` Component**: Shows how to set up the `Web3authProvider` at the root of your React app, passing the `accessKey` for configuration.
2. **`Networks` Component**: Demonstrates how to use the `useWeb3Auth` hook to fetch available networks and display them in a list.
