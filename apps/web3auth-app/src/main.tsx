import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import HomePage from './app/pages/HomePage';
import FilesPage from './app/pages/FilesPage';
import SettingsPage from './app/pages/SettingsPage';
import NotFindPage from './app/pages/NotFindPage';
import { WalletProvider } from '@djuno/wallet-hook';
import { Client as Web3AuthClient } from '@djuno/web3auth-sdk';

const clientConfigs = {
  accessKey: import.meta.env.VITE_WEB3AUTH_KEY,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const endpointUrl = import.meta.env.VITE_WEB3AUTH_URL;
const accessKey = import.meta.env.VITE_WEB3AUTH_KEY;

console.log('VITE_WEB3AUTH_URL:', endpointUrl);
console.log('VITE_WEB3AUTH_KEY:', accessKey);

const web3AuthClient = new Web3AuthClient({ endpointUrl, accessKey });

console.log('Web3Auth Client:', web3AuthClient);

web3AuthClient
  .networks()
  .then((response) => {
    console.log('Web3Auth Networks Response:', response);
  })
  .catch((error) => {
    console.error('Web3Auth Error:', error);
  });
root.render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider clientConfigs={clientConfigs}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFindPage />} />
        </Routes>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>
);
