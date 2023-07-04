import React, { useEffect } from 'react'
import { Layout } from '../../../components/layouts'
import { StatusSolicitud } from '../../../components/solicitud/datail/StatusSolicitud'
import { Box, Grid, Typography } from '@mui/material'
import { HeaderSolicitud } from '../../../components/solicitud/datail/HeaderSolicitud'
import {useContext} from 'react';
import { SgdContext } from '../../../context/App/SgdContext'
import {useState} from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import { getOneSolicitud } from '../../../service/axios'
import { Solicitud } from '../../../interface/Sgd'

const DataFake =  [
{
      unidad: '(1) VºBº Unidad Requirientes',
      fecha: '12/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'aprovado'
  },
  {
      unidad: '(2) VºBº Dirección U.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'aprovado'
  },
  {
      unidad: '(3) VºBº Administrador Municipal.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'aprovado'
  },
  {
      unidad: '(4) VºBº Dirección de control.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'aprovado'
  },
  {
      unidad: '(5) VºBº Departamento de Contabilidad, Finanzas y Presupuesto',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'aprovado'
  },
  {
      unidad: '(6) VºBº Dirección de Administración y Finanzas.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'revision'
  },
  {
      unidad: '(7) VºBº Dirección de Asesoria Jurídica.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'pendiente'
  },
  {
      unidad: '(8) VºBº Unidad de Compras.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación',
      status: 'pendiente'
  }
]

interface Props {
    solicitud: Solicitud
}

const Estado = ({solicitud}: Props) => {
    //TODO: validar llamada a api del item
    const [stateSolicitud, setSolicitud] = useState(solicitud)
    return (
        <Layout>
            <Box>
                <Box  sx={{marginBottom: 3}}>
                    <Typography variant='h4'>
                        Detalle Solicitud de compra Nro {stateSolicitud.id}
                    </Typography> 
                </Box>
                <Grid container sx={{width: '100%'}}>
                    <Grid item sx={{width: '100%'}}>
                        <HeaderSolicitud fecha={stateSolicitud.fecha_creacion} type_solicitud={'Agil'} unidad={stateSolicitud.area}/>
                    </Grid>
                    <Grid container spacing={2} item>
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
