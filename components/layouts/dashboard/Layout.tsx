/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { Navbar } from '../../ui';
import { SideNav } from '../../ui/SideNav/SideNav';
import { Box, Container, Grid, Stack, styled } from '@mui/material';
import { withAuthGuard } from '../../ui/AuthGuard/WhitAuthGuard';
import { usePathname } from 'next/navigation';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});


interface Props {
    children: JSX.Element 
}

export const Layout = withAuthGuard(({children}: Props) => {
    const [openNav, setOpenNav] = useState(false);
    const pathname = usePathname();

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
            <Navbar onNavOpen={() => setOpenNav(true)} />
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
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
                            {/* <Grid container> */}
                                {/* <Grid item> */}
                                    {children}
                                {/* </Grid> */}
                            {/* </Grid> */}
                        </Box>
                    </LayoutContainer>
               </LayoutRoot>
        </>
    )
})
