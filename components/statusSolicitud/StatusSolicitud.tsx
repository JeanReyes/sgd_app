import React from 'react'
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';

interface Props {
    unidad: string;
    fecha: string;
    firma: string;
    observacion: string;
    status: string
}

export const StatusSolicitud = ({unidad, fecha, firma, observacion, status}: Props) => {
  return (
    <Grid item md={3}>
        <Card sx={{ minWidth: 300, minHeight: 320 }}>
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
                    <Box sx={{ display: 'flex', justifyContent:'space-between', minHeight: 50}}>
                        <div>
                            firma: { firma }
                        </div>
                        <div>
                            {
                                status === 'aprovado'
                                ? <DoneAllIcon color={'success'}/>
                                : status === 'revision' 
                                ? <RemoveRedEyeIcon /> 
                                : <MoreHorizSharpIcon/>
                            } 
                        </div>
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
