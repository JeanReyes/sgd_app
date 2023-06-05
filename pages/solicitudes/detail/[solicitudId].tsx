import React from 'react'
import { Layout } from '../../../components/layouts'
import { StatusSolicitud } from '../../../components/statusSolicitud/StatusSolicitud'
import { Box, Grid, Typography } from '@mui/material'

const DataFake =  [
    {
      unidad: '(1) VºBº Unidad Requirientes',
      fecha: '12/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(2) VºBº Dirección U.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(3) VºBº Administrador Municipal.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(4) VºBº Dirección de control.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(5) VºBº Departamento de Contabilidad, Finanzas y Presupuesto',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(6) VºBº Dirección de Administración y Finanzas.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(7) VºBº Dirección de Asesoria Jurídica.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  },
  {
      unidad: '(8) VºBº Unidad de Compras.',
      fecha: '13/12/2023',
      firma: 'definir firma',
      observacion: 'Esta es una observación'
  }
]

const Estado = () => {
    // llamat api con la solicitud para ir a buscar estado
    return (
        <Layout>
            <Box>
                <Box  sx={{marginBottom: 3}}>
                    <Typography variant='h2'>
                        Detalle solicitud
                    </Typography> 
                </Box>
                <Grid container spacing={2}>
                    {
                        DataFake.map(({unidad, fecha, firma, observacion}) => (<StatusSolicitud key={unidad} unidad={unidad} fecha={fecha} firma={firma} observacion={observacion}/>))
                    }
                </Grid>
            </Box>
        </Layout>
    )
}

export default Estado
