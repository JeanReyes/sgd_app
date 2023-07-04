import React, {useContext, useEffect, useRef, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemSolicitud, Solicitud } from '../../../interface/Sgd';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { SgdContext } from '../../../context/App/SgdContext';

interface Props {
    header: string [],
    items: Solicitud []
}

export const TableSolicitud = ({ header, items }: Props) => {
  const [dataItems, setDataItems] = useState([] as Solicitud []);
  const router = useRouter()

  useEffect(() => {
      setDataItems(items)
  },[items]);

const handleStatusSolicitud = (id: string) => {
    router.push(`/solicitud/detail/${id}`)
}
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {header.map((head, index) => (<TableCell align="right" key={index}>{head}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataItems.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="right"> {index + 1} </TableCell>
              <TableCell component="th" align="right"> {row.fecha_creacion} </TableCell>
              <TableCell align="right">{row.creador}</TableCell>
              <TableCell align="right">{row.numero_solicitud}</TableCell>
              <TableCell align="right">{row.area}</TableCell>
              <TableCell align="right">{row.firma}</TableCell>
              <TableCell align="right"><Button onClick={() => handleStatusSolicitud(row.id)}>Ver</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}