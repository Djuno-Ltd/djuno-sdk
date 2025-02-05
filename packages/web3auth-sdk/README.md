# Djuno Web3auth SDK

A SDK from [Djuno](https://www.djuno.io/) making it easy for developers to interact with Djuno's web3auth service.

Djuno web3auth's SDK is a JavaScript and TypeScript framework-agnostic library that supports both CommonJS and ES module systems.

<br>

## Getting Started

### Installation

- Requires Node.js v16 or higher
- `npm install @djuno/web3auth-sdk` or `yarn add @djuno/web3auth-sdk`

<br>

### Quickstart

```ts
import { Client } from '@djuno/web3auth-sdk';

const client = new Client({
  endpointUrl: 'replaceme',
  accessKey: 'your-access-key',
});

client.networks().then((response) => console.log(response));
```

<br>
