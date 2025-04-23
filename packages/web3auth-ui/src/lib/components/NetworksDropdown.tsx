import { useWeb3Auth } from '@djuno/web3auth-hook';
import { useWeb3authUi } from '../providers/IndexProvider';
import { Select } from 'djuno-design';

function NetworksDropdown() {
  const { networks, loading } = useWeb3Auth();
  const { selectedNetwork, handleChangeSelectedNetwork } = useWeb3authUi();

  return (
    <Select
      value={selectedNetwork?.Id.toString()}
      onChange={(value) => {
        const _selectedNetwork = networks.find(
          (network) => network.Id.toString() === value
        );
        if (_selectedNetwork) handleChangeSelectedNetwork(_selectedNetwork);
      }}
      options={networks.map((network) => ({
        label: network.NetworkName,
        value: network.Id.toString(),
      }))}
      loading={loading.networks}
      emptyString="Select network"
    />
  );
}

export default NetworksDropdown;
