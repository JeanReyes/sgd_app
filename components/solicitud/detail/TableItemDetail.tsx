import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react'
import { ItemSolicitud } from '../../../interface/Sgd';

interface Props {
    header: string [];
    items?: ItemSolicitud [];
}
export const TableItemDetail = ({header, items}: Props) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '170px', marginBottom:2}}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {header.map((head, index) => (<TableCell align="right" key={index}>{head}</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((row, index) => (
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
