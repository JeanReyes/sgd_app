import { useState, useLayoutEffect, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';

import {
    Box,
    Button,
    Divider,
    Stack,
    SvgIcon,
    Typography,
  } from '@mui/material';

import { items } from './Items';
import { SideNavItem } from './SideNavItem';
import { useSgd } from '../../../hooks';

interface Props {
    className: any;
    classes?: any;
}

export const SideContent = ({ className, classes } : Props) => {
    const pathname = usePathname();
    const { company } = useSgd();
    const [activeMenus, setActiveMenus] = useState<string[]>([]);

    const handletoggleSubMenu = (menuName: string) => {
        if (activeMenus.includes(menuName)) {
          setActiveMenus(activeMenus.filter((item) => item !== menuName));
        } else {
          setActiveMenus([...activeMenus, menuName]);
        }
    }

    const setMenu = useCallback(() => {
        const array = items.map(item => {
            if(item.subMenu) {
                return item.subMenu.map((sub) => {
                    if (sub.path === pathname) {
                        return item.title
                    }
                })
            }
        })
       setActiveMenus(array.flat().filter((menu) => menu) as string []);
    }, [])
    
    useLayoutEffect(() => {
        setMenu()
    }, [])
    
    
    return (
        <Box
            sx={classes}
        >
            <div className={className}>
                <Box sx={{ p: 3 }}>   
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
                        Municipalidad
                    </Typography>
                    <Typography
                        color="neutral.400"
                        variant="body2"
                    >
                        {company}
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

                            if(item.subMenu) {
                                return (
                                    <div key={item.title}>
                                        <SideNavItem
                                            isList={false}
                                            key={item.title}
                                            disabled={item.disabled}
                                            external={item.external}
                                            icon={item.icon}
                                            path={item.path}
                                            title={item.title}
                                            click={() => handletoggleSubMenu(item.title)}
                                            activeMenus={activeMenus}
                                        />
                                        
                                        {
                                            // solo se abre el menu qu esta en el array
                                            activeMenus.includes(item.title) && item.subMenu.map((sub: any, index: number) => {
                                                const active = sub.path ? (pathname === sub.path) : false;
                                                return (
                                                    <div key={sub.title} style={{marginLeft:20}}>
                                                        <SideNavItem
                                                            key={sub.title}
                                                            isList={true}
                                                            active={active}
                                                            // icon={sub.icon}
                                                            disabled={sub.disabled}
                                                            external={sub.external}
                                                            path={sub.path}
                                                            title={sub.title}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            } 

                            return (
                                <div key={item.title}>
                                    <SideNavItem
                                        isList={true}
                                        active={active}
                                        disabled={item.disabled}
                                        external={item.external}
                                        icon={item.icon}
                                        // key={index}
                                        path={item.path}
                                        title={item.title}
                                        subMenu={item.subMenu}
                                    />
                                </div>
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
            </div>
        </Box>
    );
}