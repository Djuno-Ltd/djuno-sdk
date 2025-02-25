import { Client, ClientConfigs, Network } from '@djuno/web3auth-sdk';

import React, { createContext, useContext, useState, useCallback } from 'react';
import FormData from 'form-data';

interface Web3AuthContextType {
  client: Client;
  loading: Record<string, boolean>;
  getNetworks: () => Promise<Network[]>;
  networks: Array<Network>;
  handshake: (networkId: string, publicKey: string) => Promise<string>;
  verify: (
    networkId: string,
    publicKey: string,
    signature: string
  ) => Promise<string>;
  getProfile: (token: string) => Promise<any>;
  profile: any;
  updateProfile: (token: string, data: unknown) => Promise<any>;
  getProfileAvatar: (token: string) => Promise<any>;
  profileAvatar: any;
  saveProfileAvatar: (token: string, formData: FormData) => Promise<any>;
  setAccessKey: (newAccessKey: string) => Promise<any>;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(
  undefined
);

export const Web3authProvider: React.FC<
  React.PropsWithChildren<{ clientConfigs: ClientConfigs }>
> = ({ children, clientConfigs }) => {
  const client = new Client(clientConfigs);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [networks, setNetworks] = useState([]);
  const [profile, setFrofile] = useState({});
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null);

  const withLoading = useCallback(
    async (key: string, fn: () => Promise<any>) => {
      setLoading((prev) => ({ ...prev, [key]: true }));
      try {
        return await fn();
      } finally {
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    },
    []
  );

  const getNetworks = useCallback(
    (): Promise<Network[]> =>
      withLoading('networks', async () => {
        const response = await client.networks();
        const networks = response.data || [];
        if (response.status) setNetworks(networks);
        return networks;
      }),
    [client]
  );

  const handshake = useCallback(
    (networkId: string, publicKey: string): Promise<string> =>
      withLoading('handshake', async () => {
        const response = await client.handshake(networkId, publicKey);
        const signature = response.data;
        return signature;
      }),
    [client]
  );

  const verify = useCallback(
    (
      networkId: string,
      publicKey: string,
      signature: string
    ): Promise<string> =>
      withLoading('verify', async () => {
        const response = await client.verify(networkId, publicKey, signature);
        const token = response.data;
        return token;
      }),
    [client]
  );

  const getProfile = useCallback(
    (token: string) =>
      withLoading('getProfile', async () => {
        const profileData = await client.getProfile(token);
        setFrofile(profileData.data);
      }),
    [client]
  );

  const updateProfile = useCallback(
    (token: string, data: unknown) =>
      withLoading('updateProfile', () => client.updateProfile(token, data)),
    [client]
  );

  const getProfileAvatar = useCallback(
    (token: string) =>
      withLoading('getProfileAvatar', async () => {
        const profileAvatarData = await client.getProfileAvatar(token);
        setProfileAvatar(profileAvatarData.data);
      }),
    [client]
  );

  const saveProfileAvatar = useCallback(
    (token: string, formData: FormData) =>
      withLoading('saveProfileAvatar', () =>
        client.saveProfileAvatar(token, formData)
      ),
    [client]
  );

  const setAccessKey = useCallback(
    async (newAccessKey: string) => {
      await withLoading('setAccessKey', async () => {
        client.setAccessKey(newAccessKey);
      });
    },
    [client]
  );

  return (
    <Web3AuthContext.Provider
      value={{
        client,
        loading,
        getNetworks,
        networks,
        handshake,
        verify,
        getProfile,
        profile,
        updateProfile,
        getProfileAvatar,
        profileAvatar,
        saveProfileAvatar,
        setAccessKey,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
};

export default Web3authProvider;
