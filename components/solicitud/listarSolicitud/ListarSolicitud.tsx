import React from 'react'
import { TableSolicitud } from '../../ui/Tables/TableListarSolicitud';
import { Solicitud } from '../../../pages/solicitudes';

interface Props {
    header: string[];
    items: Solicitud [];
}

export const ListarSolicitud = ({ header, items }: Props) => {
  return (
    <TableSolicitud header={header} items={ items }/>
  )
}
