# Djuno Web3Auth SDK

A simple and flexible SDK from [Djuno](https://www.djuno.io/) that makes it easy for developers to integrate with Djuno's Web3 authentication service.

The SDK is framework-agnostic, works with both **JavaScript** and **TypeScript**, and supports both **CommonJS** and **ES module systems**.

---

## 🚀 Features

- 🔐 Web3 Authentication (sign-in with wallet)
- 🌐 Fetch supported blockchain networks
- 👤 Manage user profiles and avatars
- 🔧 Easy setup and access control

---

## 🛠️ Installation

> Requires **Node.js v16** or higher

Install with npm:

```bash
npm install @djuno/web3auth-sdk
```

Install with yarn:

```bash
yarn add @djuno/web3auth-sdk
```

## ⚙️ SDK Overview

The main class exported by the SDK is `Client`. It handles all communication with Djuno's Web3Auth service.

### Initialization

To initialize the `Client`, you must provide an `accessKey`. Optionally, you can also provide a custom `endpointUrl`, API version, or custom headers.

---

## 📘 Function Descriptions

### `networks()`

Fetches a list of supported blockchain networks and associated wallet providers that Djuno Web3Auth supports.  
Useful for populating wallet connection options in your app.

### `handshake(networkId, public_key)`

Initiates a login handshake. You provide the selected network and the user's wallet address (public key).  
Djuno returns a message that should be signed by the wallet to continue authentication.

### `verify(networkId, public_key, signature)`

Completes the login process. After signing the message returned by `handshake`, this function verifies the signature and issues an authentication token if valid.

### `getProfile(token)`

Retrieves the authenticated user's profile details using a valid token.  
Typically called after successful login via `verify`.

### `updateProfile(token, data)`

Allows updating the user's profile information (e.g., username, bio, etc.).  
Requires an authentication token and a valid profile object.

### `getProfileAvatar(token)`

Fetches the user's profile avatar image as a blob URL.  
Can be used to display the avatar in frontend applications.

### `saveProfileAvatar(token, formData)`

Uploads a new avatar image for the user's profile.  
Expects a valid `FormData` object containing the image file and an authentication token.

### `setAccessKey(newAccessKey)`

Allows changing the API access key dynamically after the client is initialized.  
Useful if your app supports multiple environments or rotating keys.

---

## 📦 Types

```ts
type ClientConfigs = {
  endpointUrl?: string;
  accessKey?: string;
  version?: string;
  headers?: Record<string, string>;
};

type Network = {
  Id: number;
  NetworkName: string;
  ChainId: string;
  WalletResponses: {
    Id: number;
    WalletName: string;
    NetworkId: number;
  }[];
};
```

---

## 🧪 Response Format

All methods return a Promise that resolves to a consistent response object:

```ts
{
  data: any;
  status: boolean;
  message: string;
}
```

---

## 🤝 Support

Need help or want to get involved?  
Join the community or reach out through [djuno.io](https://www.djuno.io).
