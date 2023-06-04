import React, {useEffect, useRef, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemSolicitud } from '../../../interface/Sgd';

interface Props {
    header: string [],
    items: ItemSolicitud []
}


const initItem: ItemSolicitud [] = new Array(10).fill({ quantity: '', unidad_medida: '', detail: '', classification: '', precio: '' })
export const TableDefault = ({ header, items }: Props) => {
  const [dataItems, setDataItems] = useState([] as ItemSolicitud []);

  useEffect(() => {
    if(items.length > 0) {
      if (initItem.length) {
        initItem.length = initItem.length - 1;
      }
      setDataItems(() => {
        return [
          ...items,
          ...initItem
        ]
      })
    } else {
      setDataItems(initItem)
    }
  },[items]);


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
              <TableCell component="th" align="right"> {row.quantity} </TableCell>
              <TableCell align="right">{row.unidad_medida}</TableCell>
              <TableCell align="right">{row.detail}</TableCell>
              <TableCell align="right">{row.classification}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}