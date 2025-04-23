import { Web3authUiProvider, WalletInfoButton } from '@djuno/web3auth-ui';
export function App() {
  return (
    <Web3authUiProvider
      clientConfigs={{ accessKey: import.meta.env.VITE_WEB3AUTH_ACCESS_KEY }}
    >
      <div className="w-[100dvw] h-[100dvh] flex justify-center items-center flex-col gap-4">
        <WalletInfoButton
          handleGoProfile={() => (window.location.href = '/setting')}
        />

        <span className="text-2xl">
          Welcome to{' '}
          <h1 className="text-2xl font-bold inline-block">Djuno Web3Auth</h1> UI
          👋
        </span>
      </div>
    </Web3authUiProvider>
  );
}

export default App;
