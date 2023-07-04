import { Card, Grid } from '@mui/material';
import React from 'react'

interface Props {
  fecha:string;
  type_solicitud: string;
  unidad: string
}

export const HeaderSolicitud = ({fecha, type_solicitud, unidad}: Props) => {
  return (
    <Card sx={{marginBottom: 4}}>
      <Grid sx={{display:'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', padding: 2}} container spacing={2}>
        <Grid item sx={{textAlign: 'center'}}> Fecha: { fecha }</Grid>
        <Grid item sx={{textAlign: 'center'}}> Tipo de compra: { type_solicitud }</Grid>
        <Grid item sx={{textAlign: 'center'}}> Unidad: { unidad }</Grid>
      </Grid>
    </Card>
  )
}
