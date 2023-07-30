import React from 'react'
import { Layout } from '../../../components/layouts'
import { StatusSolicitud } from '../../../components/solicitud/detail/StatusSolicitud'
import { Box, Button, Grid, Typography } from '@mui/material'
import { HeaderSolicitud } from '../../../components/solicitud/detail/HeaderSolicitud'
import {useState} from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import { getOneSolicitud } from '../../../service/axios'
import { Solicitud } from '../../../interface/Sgd'
import { TableItemDetail } from '../../../components/solicitud/detail/TableItemDetail'
import { CalculateDetail } from '../../../components/solicitud/detail/CalculateDetail'

const headerSolicitud = ['N°','Cantidad', 'Unidad de Medida', 'Detalle o Descripción', 'Clasificación Presupuestaria', 'Precio Neto', '']

interface Props {
    solicitud: Solicitud
}

const Estado = ({solicitud}: Props) => {
    //TODO: validar llamada a api del item
    const [stateSolicitud, setSolicitud] = useState(solicitud)
    return (
        <Layout>
            <Box>
                <Box sx={{marginBottom: 3}}>
                    <Typography variant='h4'>
                        Detalle Solicitud de compra Nro {stateSolicitud.id}
                    </Typography> 
                </Box>
                <Grid container sx={{width: '100%'}}>
                    <Grid item sx={{width: '100%'}}>
                        <HeaderSolicitud fecha={stateSolicitud.fecha_creacion} type_solicitud={'Agil'} unidad={stateSolicitud.area}/>
                    </Grid>

                    <Grid item sx={{width: '100%'}} spacing={2}>
                        <TableItemDetail header={headerSolicitud} items={stateSolicitud.items}/>
                        <CalculateDetail calculate={stateSolicitud.calculate}/>
                    </Grid>

                    <Grid spacing={2} container item>
                        {
                            stateSolicitud?.status?.map(({unidad, fecha, firma, observacion, status}) => (<StatusSolicitud key={unidad} unidad={unidad} fecha={fecha} firma={firma} observacion={observacion} status={status}/>))
                        }
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
export const getStaticPaths: GetStaticPaths = async () => { 
    return {
        paths: [],
        fallback: 'blocking'  // 'blocking' = para que pueda aceptar mas solicituides / false se restringe solo a los paths.
    }
}

export const getStaticProps: GetStaticProps = async({params}) => {
    const { solicitudId } = params as any
  
    const solicitud =  await getOneSolicitud(`/solicitudes/${solicitudId}`)
   
    return {
      props: {
        // dataLis: list
        solicitud
      }
    }
  }

export default Estado
