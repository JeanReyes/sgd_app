import React from 'react'
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

interface Props {
    unidad: string;
    fecha: string;
    firma: string;
    observacion: string
}

export const StatusSolicitud = ({unidad, fecha, firma, observacion}: Props) => {
  return (
    <Grid item md={3}>
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Box>
                    <Box>
                        <Typography sx={{textAlign: 'center'}}> 
                            { unidad }
                        </Typography>
                    </Box>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <Box>
                        Fecha: { fecha }
                    </Box>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <Box sx={{minHeight: 50}}>
                        firma: { firma }
                    </Box>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <Box sx={{minHeight: 50}}>
                        Observacion: { observacion }
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Grid>
  )
}
