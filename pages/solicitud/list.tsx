import React from 'react'
import { Layout } from '../../components/layouts'
import { TableDefault } from '../../components/ui/Tables/Table'
import { ListarSolicitud } from '../../components/solicitud/list/ListarSolicitud'
import { Box, Typography } from '@mui/material'
import { getAllSolicitud } from '../../service/axios';
import { GetStaticProps } from 'next';
import {Solicitud} from '../../interface/Sgd';

const header = ['N°','Fecha de Creación', 'Creador', 'Nº de solicitud', 'Área', 'Firma', 'Estados']

//TODO: aqui llamar a servidor, local

interface Props{
  dataLis: Solicitud []
}

const Soliditudes = ({dataLis}: Props) => {
  // llamar api para listar las solicitudes

  return (
    <Layout>
      <Box sx={{marginBottom: 3}}>
        <Typography variant='h2'>
          Solicitudes
        </Typography>
      </Box>
        <ListarSolicitud header={header} items={dataLis}/>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async({params}) => {
  const list =  await getAllSolicitud('/solicitudes')

  return {
    props: {
      dataLis: list
    }
  }
}

export default Soliditudes
