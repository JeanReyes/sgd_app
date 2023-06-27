import React from 'react'
import { Layout } from '../../components/layouts'
import { TableDefault } from '../../components/ui/Tables/Table'
import { ListarSolicitud } from '../../components/solicitud/listarSolicitud/ListarSolicitud'
import { Box, Typography } from '@mui/material'

const header = ['N°','Fecha de Creación', 'Creador', 'Nº de solicitud', 'Área', 'Firma', 'Estados']

export interface Solicitud {
  id: string,
  fecha_creacion: string,
  creador: string,
  numero_solicitud: string,
  area: string,
  firma: string,
}

const ItemsFake = [
  {
    id: '1234',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
  },
  {
    id: '12',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
  },
  {
    id: '1213dqsd',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
  }
]

const soliditudes = () => {
  // llamar api para listar las solicitudes
  return (
    <Layout>
      <Box sx={{marginBottom: 3}}>
        <Typography variant='h2'>
          Solicitudes
        </Typography>
      </Box>
        <ListarSolicitud header={header} items={ItemsFake}/>
    </Layout>
  )
}

export default soliditudes
