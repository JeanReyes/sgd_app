import React, {useEffect, useState} from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemSolicitud } from '../../../interface/Sgd';
import { Button } from '@mui/material';
import { formatPrice } from '../../../utils/methods';

interface Props {
    header: string [];
    items: ItemSolicitud [];
    handleRemoveItem: (index: number) => void
}

const initItem: ItemSolicitud [] = new Array(1).fill({ quantity: '', unidad_medida: '', detail: '', classification: '', precio: '' })
export const TableDefault = ({ header, items, handleRemoveItem }: Props) => {
  const [dataItems, setDataItems] = useState([] as ItemSolicitud []);

  //TODO: agregado de items por defecto.
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
    <Box sx={{padding: 1, border: .5}}>
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
                <TableCell align="right">$ { formatPrice(row.precio)}</TableCell>
                <TableCell align="right"><Button onClick={() => handleRemoveItem(index)}>X</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}