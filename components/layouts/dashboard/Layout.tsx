/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { Navbar } from '../../ui';
import { SideNav } from '../../ui/SideNav/SideNav';
import { Box, styled, useTheme } from '@mui/material';
import { withAuthGuard } from '../../ui/AuthGuard/WhitAuthGuard';
import { usePathname } from 'next/navigation';
import { sideDark, sideLight } from '../../../themes/config/utils';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    // paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: {theme: any, open: boolean}) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {}),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(SIDE_NAV_WIDTH),
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`
            width: '100%'
        },
        [theme.breakpoints.down('md')]: {
            // marginLeft: '20px',
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
            width: '100%',
            // padding: '16px'
        },
        [theme.breakpoints.up('sm')]: {
            // marginLeft: -(SIDE_NAV_WIDTH),
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`
            width: '100%'
        },
        [theme.breakpoints.down('sm')]: {
            // marginLeft: '10px',
            width: '100%',
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
            // padding: '16px',
            // marginRight: '10px'
        },
        [theme.breakpoints.up('xs')]: {
            // marginLeft: -(SIDE_NAV_WIDTH),
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`
            width: '100%'
        },
        [theme.breakpoints.down('xs')]: {
            // marginLeft: '10px',
            width: '100%',
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
            // padding: '16px',
            // marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {}),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: '100%',
        // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        [theme.breakpoints.down('md')]: {
            // marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            
            // marginLeft: '10px'
        }
    })
}));


interface Props {
    children: JSX.Element 
}

export const Layout = withAuthGuard(({children}: Props) => {
    const [openNav, setOpenNav] = useState(false);
    const pathname = usePathname();
    const theme = useTheme();
    const classes = () => {
        if(theme.palette.mode === 'light') {
            return sideLight()
        }
        if(theme.palette.mode === 'dark') {
            return sideDark()
        }
    }
    // cada vez que cambio de ruta cierro el nav
    const handlePathnameChange = useCallback(() => {
        if (openNav) {
          setOpenNav(true);
        }
     
    },[openNav]);
  
    useEffect(() => {  
        handlePathnameChange();
    },[pathname]);

    return (
        <>
            <Navbar onNavOpen={() => setOpenNav(!openNav)} sideWidth={SIDE_NAV_WIDTH} navHeight={TOP_NAV_HEIGHT}/>
            <Box
                sx={{
                    display: 'flex',
                    position: 'fixed',
                    top: TOP_NAV_HEIGHT,
                    width: '100%',
                    height: '100%'
                }}
            >
                <SideNav 
                    direction={openNav}
                    sideWidth={SIDE_NAV_WIDTH}
                    navHeight={TOP_NAV_HEIGHT}
                    className={(classes() as any).root}
                    onClose={() => setOpenNav(false)} 
                    open={openNav} 
                /> 
                <Main open={openNav} theme={theme}>
                    <LayoutRoot>
                        <LayoutContainer>
                            <Box
                                component="main"
                                sx={{
                                    flexGrow: 1,
                                    py: 8,
                                    p:2
                                }}
                            >
                                {children}
                            </Box>
                        </LayoutContainer>
                    </LayoutRoot>
                </Main>
            </Box>
        </>
    )
})
