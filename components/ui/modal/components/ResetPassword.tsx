import React from 'react'
import { Box, Typography } from '@mui/material';

interface Props {
    children: JSX.Element;
    email: string;
}

export const ResetPassword = ({children, email}: Props) => {
  return (
    <Box sx={{paddingTop: 2, paddingBottom: 2}}>
        <Typography sx={{textAlign: 'center'}}>
            Hemos enviado un email 
            a la dirección: {email}, 
            con un enlace para que accedas 
            y puedas recuperar tu contraseña 
        </Typography>
        <Box sx={{width: '100%', textAlign: 'center', marginTop: 1}}>
            {children}
        </Box>
    </Box>
  )
}
