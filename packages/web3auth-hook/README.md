# @djuno/web3auth-hook

A React package from [Djuno](https://www.djuno.io/) that provides an easy way to integrate Djuno's Web3Auth service into React applications.
This package serves as a wrapper around Djuno's Web3Auth SDK, offering hooks for authentication and profile management.

This package supports both JavaScript and TypeScript and is designed to work seamlessly in React projects.

## Getting Started

### Installation

- Requires Node.js v16 or higher
- Run `npm install @djuno/web3auth-hook` or `yarn add @djuno/web3auth-hook` to install.

### Quickstart

1. **Setting up the Web3authProvider**

You need to wrap your app in a `Web3authProvider` to provide access to the Web3Auth context. This provider makes the authentication functions available throughout your app:

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

2. **Using the Hook**

After setting up the `Web3authProvider`, you can use the `useWeb3Auth` hook in your components to access Web3Auth functionalities, such as retrieving networks, user profiles, and more:

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

## Available Functions and Their Abilities

### 1. `getNetworks()`

This function fetches the list of supported blockchain networks that Djuno Web3Auth can connect with. It helps you display available networks in your app, enabling users to choose a blockchain network for authentication.

- **Returns**: A list of networks (e.g., Ethereum, Solana) that are supported by Web3Auth.

### 2. `handshake(networkId, publicKey)`

The `handshake` function initiates the login process by sending a request to the Web3Auth service. It requires the user’s blockchain network ID and their wallet's public key to create a challenge that the user will need to sign with their wallet.

- **Parameters**:
  - `networkId`: The ID of the blockchain network selected by the user.
  - `publicKey`: The user's public wallet address.
- **Returns**: A signed message from Web3Auth that the user must sign with their wallet.

### 3. `verify(networkId, publicKey, signature)`

Once the user signs the handshake message, this function is used to complete the authentication process. It verifies the signature and returns an authentication token if the signature is valid.

- **Parameters**:
  - `networkId`: The ID of the blockchain network.
  - `publicKey`: The user's public wallet address.
  - `signature`: The signature from the user’s wallet.
- **Returns**: An authentication token if the signature is valid.

### 4. `getProfile(token)`

Once the user is authenticated, this function retrieves the user's profile using the authentication token. The profile may include the user’s name, email, and other personal data.

- **Parameters**:
  - `token`: The authentication token returned by the `verify` function.
- **Returns**: The authenticated user's profile data.

### 5. `updateProfile(token, data)`

This function allows you to update the authenticated user's profile information, such as their username, bio, etc.

- **Parameters**:
  - `token`: The authentication token.
  - `data`: An object containing the updated profile information.
- **Returns**: The updated profile information.

### 6. `getProfileAvatar(token)`

This function retrieves the user's profile avatar, typically an image, based on the authentication token. The avatar is returned as a URL (Blob URL) that can be used to display the image.

- **Parameters**:
  - `token`: The authentication token.
- **Returns**: The avatar image URL (Blob URL).

### 7. `saveProfileAvatar(token, formData)`

If the user wishes to update their profile avatar, this function uploads a new image to the server. You need to pass the avatar image in the form of a `FormData` object, along with the authentication token.

- **Parameters**:
  - `token`: The authentication token.
  - `formData`: A `FormData` object containing the image file.
- **Returns**: Confirmation of the avatar update.

### 8. `setAccessKey(newAccessKey)`

This function allows you to dynamically change the API access key after the client is initialized. This is useful if you want to switch between different environments or rotate keys.

- **Parameters**:
  - `newAccessKey`: The new access key for the Web3Auth service.
- **Returns**: A promise confirming the change of access key.

## Support

Need help or want to get involved?  
Join the community or reach out through [djuno.io](https://www.djuno.io).
