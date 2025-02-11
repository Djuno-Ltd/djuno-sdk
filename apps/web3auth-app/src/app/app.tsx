// import { Client as Web3AuthClient } from '@djuno/web3auth-sdk';
// import { useEffect } from 'react';
import 'djuno-design/dist/index.css';
import { Web3authProvider } from '@djuno/web3auth-hook';
// import Networks from './components/Networks';
import {
  Flex,
  PanelHeader,
  PanelLayout,
  PanelSidebar,
  Sidebar,
  SidebarItem,
  ThemeChanger,
  Typography,
} from 'djuno-design';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import Logo from '../assets/icons/logo-text.svg?react';
import HomeIcon from '../assets/icons/home.svg?react';
import FilesIcon from '../assets/icons/files.svg?react';
import SettingIcon from '../assets/icons/setting.svg?react';

export function App() {
  // const endpointUrl = import.meta.env.VITE_WEB3AUTH_URL;
  const accessKey = import.meta.env.VITE_WEB3AUTH_KEY;

  // const client = new Web3AuthClient({ endpointUrl, accessKey });

  // useEffect(() => {
  //   client.networks().then((response) => {
  //     console.log(response);
  //   });
  // }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarNavigation = useCallback(
    (item: SidebarItem | undefined) => {
      const route = `${item?.link}`;
      navigate(route);
    },
    [navigate]
  );

  const sidebarItems = useMemo(() => {
    return [
      {
        id: 'home',
        label: 'Home',
        icon: HomeIcon,
        activeConditions: [
          {
            index: 0,
            value: undefined,
          },
          // {
          //   index: 0,
          //   value: 'home',
          //   operator: 'or',
          // },
        ],
        link: '/',
        onClick: handleSidebarNavigation,
      },
      {
        id: 'files',
        label: 'Files',
        icon: FilesIcon,
        activeConditions: [
          {
            index: 0,
            value: 'files',
          },
        ],
        link: '/files',
        onClick: handleSidebarNavigation,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: SettingIcon,
        activeConditions: [
          {
            index: 0,
            value: 'settings',
          },
        ],
        link: '/settings',
        onClick: handleSidebarNavigation,
      },
    ];
  }, [handleSidebarNavigation]);

  return (
    // <div>
    //   <Web3authProvider clientConfigs={{ accessKey }}>
    //     <Networks />
    //   </Web3authProvider>
    // </div>
    <div
      className=" bg-white dark:bg-[#1D2125]"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Web3authProvider clientConfigs={{ accessKey }}>
        <PanelLayout
          type="normal"
          pathname={location.pathname}
          // className=""
          renderSidebar={({ segments, ...sidebarProps }) => {
            // console.log(segments);
            return (
              <PanelSidebar
                {...sidebarProps}
                sidebarHeader={
                  <Link to="/" className="flex items-center gap-1 px-5">
                    <Logo className="!h-9 " />
                  </Link>
                }
              >
                <Sidebar
                  type="normal"
                  items={sidebarItems}
                  segments={segments}
                  navItemHeight={38}
                >
                  <Flex justify="center"></Flex>
                </Sidebar>
              </PanelSidebar>
            );
          }}
          renderHeader={(headerProps) => (
            <PanelHeader
              {...headerProps}
              mobileIcon={<Logo className="h-[30px] text-[#0074E4]" />}
            >
              <Flex
                justify="end"
                items="center"
                className="w-full pl-3 md:pl-0"
              >
                {/* <ThemeChanger anchor="bottom end" /> */}
              </Flex>
            </PanelHeader>
          )}
          enableGoToTopAfterScroll={true}
          enableGoToTopAfterChangeRoute={true}
        >
          <div
            className="!max-w-7xl !mx-auto !p-4 md:!p-5 lg:!p-8 !bg-white dark:!bg-[#1D2125]"
            id="main-container"
            style={{ margin: '20px' }}
          >
            <Outlet />
          </div>
        </PanelLayout>
      </Web3authProvider>
    </div>
  );
}

export default App;
