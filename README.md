# Djuno Web3Auth SDK

This repository includes two core packages for integrating Djuno’s Web3 authentication into your React applications:

- [`web3auth-sdk`](./packages/web3auth-sdk) – Core SDK to interact with Djuno's Web3Auth APIs.
- [`web3auth-hook`](./packages/web3auth-hook) – React hooks for easily integrating Djuno Web3Auth into frontend apps.

## Overview

Djuno Web3Auth enables seamless Web3 login and wallet operations via secure, scalable APIs. This SDK is designed for developers building modern Web3 applications using React.

## Prerequisites

- Node.js v16 or higher
- A Djuno Access Key

Create a `.env` file at the root of your app:

````bash
REACT_APP_DJUNO_ACCESS_KEY=your-djuno-access-key
REACT_APP_DJUNO_ENDPOINT_URL=https://api.djuno.io


## Installation

To install both packages in your app:

```bash
npm install @djuno/web3auth-sdk @djuno/web3auth-hook
````

## Usage Example

Here’s how to integrate `web3auth-hook` in a React app:

```tsx
import React, { useEffect } from 'react';
import { Web3authProvider, useWeb3Auth } from '@djuno/web3auth-hook';

const Networks = () => {
  const { getNetworks } = useWeb3Auth();

  useEffect(() => {
    getNetworks().then(console.log);
  }, []);

  return <div>Connected to Djuno Web3Auth</div>;
};

const App = () => (
  <Web3authProvider
    accessKey={process.env.REACT_APP_DJUNO_ACCESS_KEY}
    endpointUrl={process.env.REACT_APP_DJUNO_ENDPOINT_URL}
  >
    <Networks />
  </Web3authProvider>
);

export default App;
```

## Scripts

To run or build locally:

```bash
# Development
npm start

# Production build
npm run build

# Lint and format
npm run prettier
```

## Development

To develop locally:

```bash
# At root
npm install
npm run build  # Builds both packages
```

You can also navigate to each package folder and run tests or local builds individually.

## Core Concepts (`web3auth-hook`)

- `Web3authProvider`: Wrap your app to provide auth context.
- `useWeb3Auth()`: Hook exposing auth methods like:
  - `getUser()`
  - `getNetworks()`
  - `connectWallet()`
  - `disconnectWallet()`

These hooks abstract complexity and simplify interacting with the Web3Auth SDK in your frontend.

## Links

- [Djuno Web3Auth SDK README](https://github.com/Djuno-Ltd/djuno-sdk/blob/main/packages/web3auth-sdk/README.md)
- [Djuno Web3Auth Hook README](https://github.com/Djuno-Ltd/djuno-sdk/blob/main/packages/web3auth-hook/README.md)
- [Djuno API Documentation](https://docs.djuno.io/en/articles/10108332-web3-0-auth-service)

## License

This project is licensed under the MIT License.

```

```
