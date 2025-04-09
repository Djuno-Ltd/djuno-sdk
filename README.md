# Djuno Web3Auth SDK

This project enables secure Web3 authentication in your React application using [Djuno](https://djuno.io)’s Web3Auth APIs. It uses two main packages:

- [`@djuno/web3auth-sdk`](https://www.npmjs.com/package/@djuno/web3auth-sdk) – A JavaScript SDK to interact with Djuno’s backend APIs.
- [`@djuno/web3auth-hook`](https://www.npmjs.com/package/@djuno/web3auth-hook) – React hooks that make it easy to use the SDK in frontend apps.

---

## ✨ Features

- Web3 user authentication via secure APIs
- Fetching blockchain network information
- Simple integration with React using hooks
- No wallet management required

---

## Prerequisites

- Node.js `v16+`
- A Djuno Access Key from [djuno.io](https://djuno.io)

Create a `.env` file in your project root:

```env
VITE_WEB3AUTH_KEY=your-djuno-access-key
VITE_WEB3AUTH_URL=https://api.djuno.io
```

---

## 📦 Installation

Install the packages:

```bash
npm install @djuno/web3auth-sdk @djuno/web3auth-hook
```

---

## ⚙️ Basic Setup

Wrap your app with the `Web3authProvider`:

```tsx
import { Web3authProvider } from '@djuno/web3auth-hook';
import App from './App';

const Root = () => (
  <Web3authProvider
    clientConfigs={{ accessKey: import.meta.env.VITE_WEB3AUTH_KEY }}
  >
    <App />
  </Web3authProvider>
);

export default Root;
```

---

## 📄 Usage Example

Use the hook to fetch available networks:

```tsx
import { useEffect } from 'react';
import { useWeb3Auth } from '@djuno/web3auth-hook';

const Networks = () => {
  const { getNetworks } = useWeb3Auth();

  useEffect(() => {
    getNetworks().then(console.log);
  }, []);

  return <div>Connected to Djuno Web3Auth</div>;
};
```

Or use the SDK directly:

```ts
import { Client as Web3AuthClient } from '@djuno/web3auth-sdk';

const client = new Web3AuthClient({
  endpointUrl: import.meta.env.VITE_WEB3AUTH_URL,
  accessKey: import.meta.env.VITE_WEB3AUTH_KEY,
});

client.networks().then(console.log).catch(console.error);
```

---

## 🛠️ Scripts

Available commands:

```bash
# Start dev server
npm start

# Production build
npm run build

# Format code
npm run prettier
```

---

## 🚀 Local Development

To build both SDK packages locally:

```bash
# At repo root
npm install
npm run build
```

You can also go into each `packages/` folder and build/test them individually.

---

## 📄 Core Concepts

- **Web3authProvider**: Context provider to make auth accessible in your React tree.
- **useWeb3Auth Hook**: Gives access to authentication and network methods:
  - `getUser()`
  - `getNetworks()`

---

## 🔗 Useful Links

- [Djuno SDK GitHub](https://github.com/Djuno-Ltd/djuno-sdk/tree/new-sdk)
- [Djuno API Documentation](https://docs.djuno.io/en/articles/10108332-web3-0-auth-service)
- [@djuno/web3auth-sdk on npm](https://www.npmjs.com/package/@djuno/web3auth-sdk)
- [@djuno/web3auth-hook on npm](https://www.npmjs.com/package/@djuno/web3auth-hook)

---

## 🛡 License

This project is licensed under the MIT License.
