/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';

// TODO: Change subtitle text
interface Props {
    children: JSX.Element
}

export const LoginLayout = ({children}: Props) => {

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto'
            }}
        >
            <Grid
                container
                sx={{ flex: '1 1 auto' }}
            >
                <Grid
                    xs={12}
                    lg={6}
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}
                >
                    {children}
                </Grid>
                <Grid
                    xs={12}
                    lg={6}
                    sx={{
                        alignItems: 'center',
                        background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        '& img': {
                        maxWidth: '100%'
                    }
                }}
                >
                    <Box sx={{ p: 3 }}>
                        <Typography
                            align="center"
                            color="inherit"
                            sx={{
                                fontSize: '24px',
                                lineHeight: '32px',
                                mb: 1
                            }}
                            variant="h1"
                        >
                            Sistema de Gestión Documental para Municipalidades
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
