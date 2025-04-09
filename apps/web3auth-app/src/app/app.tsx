import 'djuno-design/dist/index.css';
import { Web3authProvider } from '@djuno/web3auth-hook';
import {
  Flex,
  PanelHeader,
  PanelLayout,
  PanelSidebar,
  Sidebar,
  SidebarItem,
} from 'djuno-design';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import Logo from '../assets/icons/logo-text.svg?react';
import HomeIcon from '../assets/icons/home.svg?react';
import FilesIcon from '../assets/icons/files.svg?react';
import SettingIcon from '../assets/icons/setting.svg?react';

export function App() {
  const accessKey = import.meta.env.VITE_WEB3AUTH_KEY;

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
          renderSidebar={({ segments, ...sidebarProps }) => {
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
              ></Flex>
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
