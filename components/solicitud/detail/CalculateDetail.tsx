import { Button, Card, Grid } from '@mui/material'
import React from 'react'
import { CalculateSolicitud } from '../../../interface/Sgd'

interface Props {
    calculate: CalculateSolicitud
}

export const CalculateDetail = ({calculate}: Props) => {
  return (
    <Card sx={{marginBottom: 2}}>
        <Grid sx={{display:'flex', justifyContent: 'center', width: '100%', padding: 2}} container spacing={2}>
            <Grid lg={6} md={6} sm={6} xs={12} item > 
                <Grid container sx={{display:'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', padding: 2}}>
                    <Grid item>
                        Total neto: {calculate.total_neto}
                    </Grid>
                    <Grid item>
                        Iva: { calculate.iva }
                    </Grid>
                    <Grid item>
                        Total Bruto: { calculate.total_bruto }
                    </Grid>
                </Grid>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={12} item> 
                <Grid container sx={{display:'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', padding: 2}}>
                    <Grid item>
                        Destino: {calculate.destino}
                    </Grid>
                    <Grid item>
                        Programa: { calculate.programa }
                    </Grid>
                    <Grid item>
                        Observación: { calculate.observacion }
                    </Grid>
                </Grid>
            </Grid>
            <Button>Revisar adjuntos</Button>
        </Grid>
    </Card>
  )
}
