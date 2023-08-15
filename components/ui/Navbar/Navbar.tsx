
import { useContext, useState } from 'react';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  AppBar,
  useTheme
} from '@mui/material';
import { usePopover } from '../../../hooks/usePopover';
import { AccountPopover } from './AccountPopover';
import SettingsIcon from '@mui/icons-material/Settings';
import { SgdContext } from '../../../context/App/SgdContext';
import { Settings } from '../Settings/Settings';
import { grey } from '@mui/material/colors';
import { ConfigTheme } from '../../configTheme/ConfigTheme';
import Image from 'next/image';

interface Props {
  onNavOpen: () => void;
  sideWidth: number;
  navHeight: number;
}

export const Navbar = ({onNavOpen, navHeight}: Props) => {
  const { theme } = useContext(SgdContext);
  const [toggle, setToggle] = useState(false)
  const accountPopover = usePopover();
  const isLight = theme === 'light'
  
  const handleSettings = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <AppBar
        component="header"
        sx={{
          borderBottom: `0.5px solid ${!isLight && grey[200] }`
        }}
      >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              minHeight: navHeight,
              px: 2
            }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              {/* {!lgUp && ( */}
                <IconButton onClick={onNavOpen}>
                  <SvgIcon fontSize="small">
                    <Bars3Icon />
                  </SvgIcon>
                </IconButton>
              {/* )}  */}
              <Tooltip title="Search">
                <IconButton>
                  <SvgIcon fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <ConfigTheme from='navbar'/>
              <Tooltip title="Notifications">
                <IconButton>
                  <Badge
                    badgeContent={4}
                    color="success"
                    variant="dot"
                  >
                    <SvgIcon fontSize="small">
                      <BellIcon />
                    </SvgIcon>
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton onClick={handleSettings}>
                    <SvgIcon fontSize="small">
                      <SettingsIcon/>
                    </SvgIcon>
                </IconButton>
              </Tooltip>
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: 'pointer',
                  height: 40,
                  width: 40
                }}>
                  <Image src="/avatar-siegbert-gottfried.png" alt="Avatar" width={40} height={40} />
                </Avatar>
            </Stack>
          </Stack>
      </AppBar>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <Settings toggle={toggle} title='Settings' anchor='right' handleSettings={handleSettings}/>
    </>
  );
};
