import { Fragment, useEffect, useState } from 'react';
import { Listbox, ListboxButton, Transition } from '@headlessui/react';
// import { ReactComponent as ChevronUpDownIcon } from '../../assets/icons/chevron_up.svg';
// import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import CheckIcon from '../../assets/icons/check.svg?react';
import ChevronUpDownIcon from '../../assets/icons/chevron_up.svg?react';
// import {
//   selectSelectedNetwork,
//   selectNetworks,
//   selectNetworkLoading,
//   changeSelectedNetwork,
// } from './../store/networksSlice';
// import { useAppDispatch, useAppSelector } from '../hooks';
import { Loading } from 'djuno-design';
import { useWeb3Auth } from '@djuno/web3auth-hook';
// function NetworksDropdown() {
//   const dispatch = useAppDispatch();
//   const networks = useAppSelector(selectNetworks);
//   const selectedNetwork = useAppSelector(selectSelectedNetwork);
//   const loadingNetwork = useAppSelector(selectNetworkLoading);

//   return (
//     <Listbox
//       value={selectedNetwork}
//       onChange={(e) => {
//         dispatch(changeSelectedNetwork(e));
//       }}
//     >
//       <div className="relative mt-1 min-w-[300px]">
//         <ListboxButton className="relative w-full h-12 cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left drop-shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
//           <span className="block truncate">{selectedNetwork?.NetworkName}</span>
//           <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//             {loadingNetwork ? (
//               <Loading />
//             ) : (
//               <ChevronUpDownIcon
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             )}
//           </span>
//         </ListboxButton>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//             {networks.map((network, personIdx) => (
//               <Listbox.Option
//                 key={personIdx}
//                 className={({ active }) =>
//                   `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                     active ? 'bg-sky-100 text-sky-900' : 'text-gray-800'
//                   }`
//                 }
//                 value={network}
//               >
//                 {({ selected }) => (
//                   <>
//                     <span
//                       className={`block truncate ${
//                         selected ? 'font-medium' : 'font-normal'
//                       }`}
//                     >
//                       {network.NetworkName}
//                     </span>
//                     {selected ? (
//                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
//                         <CheckIcon className="h-4 w-4" aria-hidden="true" />
//                       </span>
//                     ) : null}
//                   </>
//                 )}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// }
interface Network {
  Id: number;
  NetworkName: string;
  ChainId: string;
  WalletResponses: Array<{
    Id: number;
    WalletName: string;
    NetworkId: number;
  }>;
}

function NetworksDropdown() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [loadingNetwork, setLoadingNetwork] = useState(false);

  const { getNetworks, networks } = useWeb3Auth();

  useEffect(() => {
    const fetchNetworks = async () => {
      setLoadingNetwork(true);
      await getNetworks();
      setLoadingNetwork(false);

      if (networks.length > 0) {
        setSelectedNetwork(networks[0]);
      }
    };

    fetchNetworks();
  }, [getNetworks, networks]);

  // Handle network selection
  const handleNetworkChange = (network: Network) => {
    setSelectedNetwork(network);
  };

  return (
    <Listbox value={selectedNetwork} onChange={handleNetworkChange}>
      <div className="relative mt-1 min-w-[300px]">
        <ListboxButton className="relative w-full h-12 cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left drop-shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
          <span className="block truncate">
            {selectedNetwork?.NetworkName || 'Select Network'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {loadingNetwork ? (
              <Loading />
            ) : (
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )}
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {networks.map((network, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-sky-100 text-sky-900' : 'text-gray-800'
                  }`
                }
                value={network}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {network.NetworkName}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
export default NetworksDropdown;
