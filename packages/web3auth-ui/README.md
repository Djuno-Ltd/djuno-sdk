# @djuno/web3auth-ui

A React package from [Djuno](https://www.djuno.io/) that provides an easy way to integrate Djuno's Web3Auth service into React applications. This package is built on top of [`@djuno/web3auth-sdk`](https://www.npmjs.com/package/@djuno/web3auth-sdk) and [`@djuno/web3auth-hook`](https://www.npmjs.com/package/@djuno/web3auth-hook), offering a ready-to-use UI for common wallet interactions like login, logout, and profile navigation.

---

## ✨ Features

- 🔐 Simplified integration with Djuno Web3Auth.
- 🧠 Built-in context provider with `Web3authUiProvider`.
- 👤 Drop-in wallet interface with `WalletInfoButton`.
- ⚙️ Designed for seamless use alongside `@djuno/web3auth-hook`.
- ⚡ Automatically manages wallet connections and supported networks.

---

## 🚀 Getting Started

### 📦 Installation

> Requires **Node.js v22** or higher.

Install via your favorite package manager:

```bash
npm install @djuno/web3auth-ui
# or
yarn add @djuno/web3auth-ui
```

## ⚡ Quickstart

Wrap your app in Web3authUiProvider:

```tsx
import { Web3authUiProvider } from '@djuno/web3auth-ui';

function App() {
  return (
    <Web3authUiProvider clientConfigs={{ accessKey: WEB3AUTH_ACCESS_KEY }}>
      <YourApp />
    </Web3authUiProvider>
  );
}
```

👉 You can find and copy your Web3Auth Access Key from the [Djuno Developer Panel](https://www.djuno.io/web3-auth/endpoints).

Use `WalletInfoButton` to display wallet info and actions:

```tsx
import { WalletInfoButton } from '@djuno/web3auth-ui';

<WalletInfoButton />;
```

This component will automatically show:

- The connected wallet address

- Login/Logout buttons

- A profile redirection option via handleGoProfile

## 🧠 How it works

- The Web3authUiProvider sets up the entire authentication context.

- It automatically connects supported wallets and networks under the hood.

- Components like WalletInfoButton consume this context and provide UI for wallet management without requiring additional logic.
