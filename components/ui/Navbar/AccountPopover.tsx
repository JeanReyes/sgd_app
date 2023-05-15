/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import { AuthContext } from '../../../context/Auth/AuthContext';

interface Props {
    anchorEl: any;
    onClose: () => void
    open: boolean
}

export const AccountPopover = ({anchorEl, onClose, open }: Props) => {
  const router = useRouter();
  const { signOut } = useAuth()
  const { user } = useContext(AuthContext);

  const handleSignOut = useCallback(() => {
      onClose?.();
      signOut();
      router.push('/auth/login');
    },[onClose, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
            {user.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
