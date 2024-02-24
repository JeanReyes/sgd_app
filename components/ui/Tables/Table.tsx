/* eslint-disable react-hooks/exhaustive-deps */
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
import { Step } from '../../../pages/solicitud/ingresar-solicitud';

interface Props {
    header: string [];
    items: ItemSolicitud [];
    step: Step;
    handleRemoveItem: (index: number) => void;
    handleEditItem: (value: {item: ItemSolicitud, index: number}) => void;
    isReadyFields: () => boolean;
}

const initItem: ItemSolicitud [] = new Array(1).fill({ quantity: '', unidad_medida: '', detail: '', classification: '', precio: '' })
export const TableDefault = ({ header, items, step, handleRemoveItem, handleEditItem, isReadyFields }: Props) => {
  const [dataItems, setDataItems] = useState([] as ItemSolicitud []);

  const disabledButtons = () => {
    if (items.length !== 0 && step === 'add-field') return false;
    if (items.length === 0 && step === 'add-field') return true;
    return true
  }

  //TODO: agregado de items por defecto.
  useEffect(() => {
    const tableDefault = [...initItem];
    if(items.length > 0) { // agrego items
      if (tableDefault.length) {
        tableDefault.length = tableDefault.length - 1; 
      }
      setDataItems(() => {
        return [
          ...items,
          ...tableDefault
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
            {dataItems.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" align="right"> {index + 1} </TableCell>
                <TableCell component="th" align="right"> {item.quantity} </TableCell>
                <TableCell align="right">{item.unidad_medida}</TableCell>
                <TableCell align="right">{item.detail}</TableCell>
                <TableCell align="right">{item.classification}</TableCell>
                <TableCell align="right">$ { formatPrice(item.precio)}</TableCell>
                <TableCell align="right">$ { formatPrice((Number(item.precio) * Number(item.quantity))) }</TableCell>
                <TableCell align="right">
                  <Button disabled={disabledButtons()} onClick={() => handleEditItem({item, index})}>edit</Button>
                  <Button disabled={disabledButtons()} onClick={() => handleRemoveItem(index)}>X</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}