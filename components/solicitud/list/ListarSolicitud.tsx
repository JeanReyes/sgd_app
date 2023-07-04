import React from 'react'
import { TableSolicitud } from '../../ui/Tables/TableListarSolicitud';
import { Solicitud } from '../../../interface/Sgd';

interface Props {
    header: string[];
    items: Solicitud [];
}

export const ListarSolicitud = ({ header, items }: Props) => {
  // aqui puede ir los filters avanzados
  return (
    <TableSolicitud header={header} items={ items }/>
  )
}
