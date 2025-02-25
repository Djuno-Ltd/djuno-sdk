import React, { createContext, useContext, useState, useEffect } from "react";
import createKeccakHash from "keccak";
import { getDefaultProvider, getAddress } from "ethers";
import { getStorage, removeStorage, setStorage } from "../utils/helper";
interface EthereumWindow extends Window {
  ethereum?: any;
}
declare const window: EthereumWindow;
export const MetamaskIconFile =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAJNElEQVRogd2ZXWxcRxXHfzP37r3rXX+snZo6jluvaS3cSDRBoklRm9bmgUhICPuhCB6QkwdA9KWRaKM8tGpQqVRCEekTEhXUfapKkeKA1D4gsNMWKhKkOkFJA03ijeM0aePaG+96P+7HDA/rXe9m7921k6gV/CVL67lzzpwz859zzszA/wv2DScSn7cNNwOz/KPbir//h+91pB68y57oO/SfVz9Po4Iwuy+ZIBoZPX3FHf/HJXf7c3+93AkgAA4M9wwrJacAtm2OsKvfSqOZ9A396sAL56Y/V8MPDA1L7Y8WPcZPzDuJk1dcAJRSIy++e3XaBPCU3CNXBU5ecbmw6CXGtkb3tNtyz9z+wZRATHjSeXXghVTqMzF6XzJhWtYTSrAPrRKZombydJ7loq70MaQYBaYFwP5HemeBZLUS2xDs6LPYttlca9RMSyEmXMc5OnA4lb7tRtv2uEaNasRwuf3UFZfj8w5FT98okj709kedopo+Qbiv2+ThfgvbFLUfNBO3g2KzB4aGDe2Pa8QoUAkkRU/zbsrh7DU3VFYpNSKefKR3QsJ4o0HabMHY1ijttgz6nLJNNR1rcS9uxPBMPpJwfWO82ugyFnKKt87WUiYIAv2SCKJPGHb0Wezoi9QrEtDV5qzP8lUsZi2UFnXtp664vJMqrldN2iRgBsJwfN5hIad4uD9Ssxpag+sJImbjGSvD9WSd8UVP89a/C1xe9tdrDkBCathQZLmw6HHkTP1AjmesW0fBq6Xi5es+vz+V26jxaK2nJYhjG5ICMkXNkTMFjs+vbbCiWz+rwYOCU+XAiUsOk2ea8z0IUnDSRDND83EDcXze4cKixze/ZNNuSxxPEI00NqToSbQWZIqKv5wrbnjWa6DVlDQM/5bC4EJOceRMgQ+ueThOYJSqQdE1uLDo8fqp/K0ZDyhDXSwnsiU2sJnDsKPPYvd9IEXwKvhK8KfTmnI5cItIH3r7o04JoLWeuR0aj887zH6qQr+nltTtMr5iswQQiFsuC2yzlOw2t5mhfTa3mnz3/hba7ZvcdFUo2yx+sqt31BAcuRVl1Zm6xfaJ2cHczhUN8kVjNYrdXOSphvbcrxjvzWXOfu2u+DEhxJ6bUbKlXTK2tYW4VdrAhgQrEkyjomvgK4FtCoa6TdIFzVI+nHKNrWfsF3/7eNoAeCjZfkRAz0Z1bOsx2T0YxZRrlDANHeqA40l8VeprSsHgphLdLi/fhBOCoQcGjNclgCHVGLChfbCr32JX0q5r1w1YoQLsDKuvmiAtHTV2eDqdNgF83xgWQjcMo1ETtvVKkl2StohJ1AguHRo5EIYdfRY77zL4JO9x9hPFxUVFutBQJOGZJIFUZe337+o9gmC0uld/pyDZJUl2CpJdpa5FR5IthEcaKTWdrcGhMr1i4vvhya495lYKwqsZTWpRlxxaumFWNJOH3vloDKoO9Y5h7U0YTnKwW25PdgqG7hREbzjE+KoUSW4WWjUOn9mCSUfcQwpNT5ugp03wYL+k4GlSi3D2E8WltEpdLeT2lmVqNGZ/dveEQIQebrJ5g6Lb2IFGZ4PFTATdpOCLWj7xaHiJobV+qfWZuX3l/2u4IIR4lBAOFxzJ4nUTIUCslgrV26D8WzSwz/PXPvp+2aC1za21YCVnEtmksEKKQiHEOFDvQOa55DBah57MopZCCsisNC7YhIBN7aKuHtIaFtMGuknEbIuHG7+KROa5vuG2Z+anYbWUKA2smiay7k6XeEvjMGOamqBV1FpghBR5ZcRjmu7O5rWSQFaCTZUD4tFmgralSLR7dU6czkZ5c6ENKCUyFWCnr6jM7PRSnNPZaJ3xbXEf22qe1FZpVBoPmtOnGi22jxuTCCH4YMnmd/NdnFkpGfNAe56BmBOaC6QB1xyTX1+6A4Ct8QLfunOZXV/IEW9RoTVUACo0Wt0DapR1HssipiZiKjpa4Rs9y3R2e/xxroMTCzHeXGjjiTs+DZW1TM0bH3fQG3P5+uYMI5uzDHUU0E6pxFjP7JexSqPSzdzK8/2z6PVdrUDpBmKlYJBo9WrarxcNhCdosf26GwrXE2RzJnkTemO1PF9eMYlaKrSGCkE6/vTFTpF9PrldaP3+RiQBsnmT1havrn0lb2BFVKADjmsQD5DJ5kxaY/XtzaC0PyK1ah59ghDGV8MIjzQRM1gm1iBxNYJEDpvpbATRhP+ZrMRx6y+uerpd7BuW3TI1fggTZEAKKboGV6+t5VOlBL6CqK2IxxqHXUPoftPzxaQhxRONOkZbNLmixC2sOSpEiUZK+bRUrYaUOvB+SIr61ckVDPKOQd6RNQlOSrBsmt4zCZiUeN4MTc4ChoT21tppNVdXI1c0SGcjlYNKuX+djirjfQXpbIS8Y6z2r3UsHlOBOm7Elp+fOyoHDqfSaJreStiWxrbWBqqueXwlWM6ZuF6p8XLGZ35Z1f1BaTMvr4Q7HLU1LdHmhwqtxVFYTWRa66NCrD0qhKG9TbGwVKpnbpw1pQRL0SF++68Cv/nzmUD5p3YP8NgXNVIv1bSXVkcgJcTj6wul5YsICaA8b2I9QkKsUam6EvW77iG383FyOx/n+OXwiPL3xQQrw0+T2/k4ftc9lfby5l4vdQBc6RyD1RUYOJxKzz01OI2g6SqUqWSaJcOLg7trjMmu5EJlz6fmgDWHjcXzROZPIM//c93UAdAwU36vq8QvLfQxQXMaAem2Vn9m6ct7ktbd99dl73MXL4UKXr1WW2b4XffgJgYobnkotem9wyloPoEACFW5Ua84oBTThuTZoP5a6xmkPqZ8MYnnzQwcTqWnXtuStNKLv4rY9mjUimIYBlprnvzR94m3RIPUsJIvsJxdob01jlKKfDFPoVCY9jOxsa/+8sM0wOyT9w5LQ4+ixKNCiO1BepQvJiu+VH+Y2z9YvuQtvRPDMVx3stGL5NQbLx+U0njWtmxs2+b68vWwrgAkOhI4rkM+n0cp/6cjj/3gYFjf2QNDSXx/2BD62yC2U3oKS9196MOBQAdmD9w7jAcDL27s5XHqtVeSIqKmWMdbmxACrXVKK39s5Ds/3NCl8uxTg9sRKjlw6HzwCtwqpt54+aAQMpCGZWj0S2SMgyN7996Wd+bb6gDA1CuvJEgUQi/JRsZ+/Jm89v/P4L+xWv0RTE0K4AAAAABJRU5ErkJggg==";

const getRealAddress = (account: string): string => {
  const address = account.toLowerCase().replace("0x", "");
  var hash = createKeccakHash("keccak256").update(address).digest("hex");
  var ret = "0x";
  for (var i = 0; i < address.length; i++) {
    // Normalize the address by converting to lowercase and removing "0x"
    const address = account.toLowerCase().replace("0x", "").replace(/"/g, "");
    // Generate the Keccak256 hash
    const hash = createKeccakHash("keccak256").update(address).digest("hex");
    let ret = "0x";
    for (let i = 0; i < address.length; i++) {
      // Check the hash for checksum capitalization
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase();
      } else {
        ret += address[i];
      }
    }
    return ret;
  }
  return ret;
};
export interface IMetaMask {
  connect: (chainId: number) => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  setTransaction: (transaction: any) => Promise<any>;
  getRealAddress: (account: string) => string;
  isConnecting: boolean;
  isConnected: boolean;
  accounts: string[];
  provider: any;
}

const account = getStorage("publicKey");
const MetamaskContext = createContext<IMetaMask>({
  connect: (chainId: number) => Promise.reject(),
  disconnect: () => Promise.reject(),
  signMessage: (message: string) => Promise.reject(),
  setTransaction: (transaction: any) => Promise.reject(),
  getRealAddress,
  isConnecting: false,
  isConnected: false,
  accounts: account ? [account] : [],
  provider: null,
});

const MetaMaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(
    !!getStorage("publicKey") || false
  );
  const [accounts, setAccounts] = useState<string[]>(() => {
    const account = getStorage("publicKey");
    return account === null ? [] : [account];
  });
  const [provider, setProvider] = useState<any>(null);

  const connect = async (chainId: number): Promise<void> => {
    setIsConnecting(true);
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
        setIsConnected(true);
        setProvider(ethereum);
        setIsConnecting(true);
        setStorage("walletName", "Metamask");
      }
    } catch (error) {
      // console.error("cancel connectiong", error);
      disconnect();
    }
    // setIsConnecting(false);
  };

  const disconnect = async (): Promise<void> => {
    // console.log("/ disconnect /");
    try {
      setIsConnected(false);
      setIsConnecting(false);
      setAccounts([]);
    } catch (error) {
      console.error(error);
    }
  };

  const signMessage = async (message: string): Promise<string> => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const signature = await ethereum.request({
          method: "personal_sign",
          params: [message, accounts[0]],
        });

        setIsConnecting(false);
        setIsConnected(true);
        setAccounts(accounts);
        return signature;
      }
    } catch (error) {
      // console.error("sign error:", error);
      disconnect();
    }
    return "";
  };

  const setTransaction = async (transaction: any): Promise<any> => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const response = await ethereum.request({
          method: "eth_sendTransaction",
          params: [transaction],
        });
        return response;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    const handleAccountsChanged = (acc_s: string[]) => {
      setAccounts(acc_s);
    };
    const handleChainChanged = (chainId: number) => {
      console.log("/ handleChainChanged /");
      //   setIsConnected(false);
      //   setAccounts([]);
    };
    const handleDisconnect = () => {
      //   console.log("/ handleDisconnect /");
      setIsConnected(false);
      removeStorage("publicKey");
      removeStorage("token");
      //   setAccounts([]);
    };
    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("disconnect", handleDisconnect);
      return () => {
        if (typeof ethereum.off === "function") {
          ethereum.off("accountsChanged", handleAccountsChanged);
          ethereum.off("chainChanged", handleChainChanged);
          ethereum.off("disconnect", handleDisconnect);
        }
      };
    }
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        connect,
        disconnect,
        signMessage,
        setTransaction,
        isConnecting,
        isConnected,
        accounts,
        provider,
        getRealAddress,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};
const MetamaskIcon = () => <img src={MetamaskIconFile} alt={`metamask icon`} />;
const useMetamask = (): IMetaMask => useContext(MetamaskContext);

export { MetaMaskProvider, useMetamask, MetamaskIcon };
