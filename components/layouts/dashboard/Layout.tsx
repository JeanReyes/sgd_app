/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { Navbar } from '../../ui';
import { SideNav } from '../../ui/SideNav/SideNav';
import { Box, Container, Grid, Slide, styled, useTheme } from '@mui/material';
import { withAuthGuard } from '../../ui/AuthGuard/WhitAuthGuard';
import { usePathname } from 'next/navigation';
import { SideContent } from '../../ui/SideNav/SideContent';

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
        transition: theme.transitions.create('margin', {
            // easing: theme.transitions.easing.sharp,
            // duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(SIDE_NAV_WIDTH),
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`
            width: '100%'
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            // width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
            width: '100%',
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
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

    const handlePathnameChange = useCallback(() => {
        if (openNav) {
          setOpenNav(false);
        }
    },[openNav]);
  
    useEffect(() => {
        handlePathnameChange();
    },[pathname]);

    return (
        <>
            <Navbar onNavOpen={() => setOpenNav(!openNav)} sideWidth={SIDE_NAV_WIDTH} navHeight={TOP_NAV_HEIGHT}/>
            {/* <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            /> */}
            <Box
                sx={{
                    display: 'flex',
                    position: 'fixed',
                    top: TOP_NAV_HEIGHT,
                    width: '100%',
                    height: '100%'
                }}
            >
                <SideContent direction={openNav} sideWidth={SIDE_NAV_WIDTH} navHeight={TOP_NAV_HEIGHT}/>
                <Main open={openNav} theme={theme}>

                    <Box
                        // sx={{
                        //     width:'100%'
                        // }}
                    >
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
                </Box>
                </Main>
            </Box>
        </>
    )
})
