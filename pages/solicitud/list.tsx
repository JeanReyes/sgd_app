import React, {useEffect, useState} from 'react'
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

// const Soliditudes = ({dataLis}: Props) => {
  const Soliditudes = () => {
  // llamar api para listar las solicitudes
  const [dataList, setDataList] = useState([] as Solicitud []);

  const load = async() => {
    const list =  await getAllSolicitud('/solicitudes')
    setDataList(list)
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <Layout>
      <Box sx={{marginBottom: 3}}>
        <Typography variant='h2'>
          Solicitudes
        </Typography>
      </Box>
        <ListarSolicitud header={header} items={dataList}/>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async({params}) => {
  // const list =  await getAllSolicitud('/solicitudes')

  return {
    props: {
      dataLis: []
    }
  }
}

export default Soliditudes
