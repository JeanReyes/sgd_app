import React from 'react'
import { Box, Typography } from '@mui/material';

interface Props {
    children: JSX.Element;
}

export const ChangePassword = ({children}: Props) => {
  return (
    <Box>
        <Typography sx={{textAlign: 'center', marginTop: 2}}>
            La contraseña se ha cambiado 
            de manera exitosa
        </Typography>
        <Box sx={{width: '100%', textAlign: 'center', marginTop: 2}}>
            {children}
        </Box>
    </Box>
  )
}
