
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';

import {
    Box,
    Button,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery,
    Slide,
    useTheme
  } from '@mui/material';

import { Logo } from '../../Logos/Logo';
import { items } from '../../layouts/dashboard/Items';
import { SideNavItem } from './SideNavItem';

interface Props {
    direction: boolean;
    navHeight: number;
    sideWidth: number;
}



export const SideContent = ({direction, navHeight, sideWidth} : Props) => {
    const pathname = usePathname();

    const openStyled = {
        transition: 'transform 290ms ease',
        transform: 'translateX(0)'
    }
    
    const closeStyled = {
        transition: 'transform 290ms ease',
        transform: `translateX(-${sideWidth}px)`,
    }
    return (
    //   <Slide direction="right" in={direction} mountOnEnter unmountOnExit>
        <Box
            sx={{
                ...(direction ? openStyled : closeStyled),
                backgroundColor: 'neutral.800',
                display: 'flex',
                flexDirection: 'column',
                height: `calc(100% - ${navHeight}px)`,
                width: `${sideWidth}px`,
                color: 'common.white',
            }}
        >
            <Box sx={{ p: 3 }}>
            <Box
                component={NextLink}
                href="/"
                sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
                }}
            >
                <Logo />
            </Box>
            <Box
                sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 1,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                p: '12px'
                }}
            >
                <div>
                <Typography
                    color="inherit"
                    variant="subtitle1"
                >
                    Devias
                </Typography>
                <Typography
                    color="neutral.400"
                    variant="body2"
                >
                    Production
                </Typography>
                </div>
                <SvgIcon
                fontSize="small"
                sx={{ color: 'neutral.500' }}
                >
                <ChevronUpDownIcon />
                </SvgIcon>
            </Box>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box
            component="nav"
            sx={{
                flexGrow: 1,
                px: 2,
                py: 3
            }}
            >
            <Stack
                component="ul"
                spacing={0.5}
                sx={{
                listStyle: 'none',
                p: 0,
                m: 0
                }}
            >
                {items.map((item: any) => {
                const active = item.path ? (pathname === item.path) : false;

                return (
                    <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                    />
                );
                })}
            </Stack>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box
            sx={{
                px: 2,
                py: 3
            }}
            >
            <Typography
                color="neutral.100"
                variant="subtitle2"
            >
                Need more features?
            </Typography>
            <Typography
                color="neutral.500"
                variant="body2"
            >
                Check out our Pro solution template.
            </Typography>
            <Box
                sx={{
                display: 'flex',
                mt: 2,
                mx: 'auto',
                width: '160px',
                '& img': {
                    width: '100%'
                }
                }}
            >
                <img
                alt="Go to pro"
                src="./devias-kit-pro.png"
                />
            </Box>
            <Button
                component="a"
                endIcon={(
                <SvgIcon fontSize="small">
                    <ArrowTopRightOnSquareIcon />
                </SvgIcon>
                )}
                fullWidth
                // href="https://material-kit-pro-react.devias.io/"
                sx={{ mt: 2 }}
                target="_blank"
                variant="contained"
            >
                Pro Live Preview
            </Button>
            </Box>
        </Box>

    //   </Slide>
   
    );
}