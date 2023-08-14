/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography, Box, CardContent, CardActions, Card, TableContainer, Paper, Table, TableHead, TableRow, TableCell } from '@mui/material'
import { ItemSolicitud } from '../../../../interface/Sgd';
import { formatPrice } from '../../../../utils/methods';
import { ModalBase } from '../../../ui/modal/Modal';
import { Calculate } from '../../../../pages/solicitud/ingresar-solicitud';


interface Props {
    items: ItemSolicitud []
    totalCalculate: Calculate;
    handleSetTotalCalculate: (total: Calculate) => void;
}

export const CalculateSolicitud = ({ items, totalCalculate, handleSetTotalCalculate }: Props) => {

    const [itemCalculateIva, setItemCalculateIva] = useState<Calculate []>()
    const [iva, setIva] = useState<string>('afecto');

    const handleCalculateItems = () => {
       setItemCalculateIva(() => {
            return items.map((item) => {
                return {
                    neto: (Number(item.precio) * Number(item.quantity)),
                    iva: iva === 'afecto' ? Math.round(((Number(item.precio) * Number(item.quantity)) * 0.19)) : 0,
                    bruto: iva === 'afecto' ? Math.round(((Number(item.precio) * Number(item.quantity)) * 1.19)) : (Number(item.precio) * Number(item.quantity))
                }
            })
       })
    }

    const handleTotalCalculate = () => {
        const calculate = {neto: 0, iva: 0, bruto: 0} as Calculate
        for(let item of itemCalculateIva!) {
            calculate.neto = calculate.neto + item.neto
            calculate.iva = calculate.iva + item.iva
            calculate.bruto = calculate.bruto + item.bruto
        }
        handleSetTotalCalculate(calculate)
    }

    const handleTypeCalculate = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setIva(e.target.value)
    }

    useEffect(() => {
        if (items) handleCalculateItems()
    },[items, iva]);

    useEffect(() => {
        if(itemCalculateIva) handleTotalCalculate()
    }, [itemCalculateIva])

    return (
        <Box sx={{padding: 1, border: .5}}>
            <Grid container sx={{paddingTop: 2}} spacing={2}>
                <Grid lg={2} md={2} sm={6} xs={12} item>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">IVA</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="afecto"
                            name="radio-buttons-group"
                            value={iva}
                            onChange={(e) => handleTypeCalculate(e)}
                        >
                            <FormControlLabel value="afecto" control={<Radio />} label="Afecto" />
                            <FormControlLabel value="exento" control={<Radio />} label="Exento" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid lg={4} md={4} sm={6} xs={12} item>
                    <TableContainer component={Paper} sx={{width: '90%'}}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" align="right" sx={{width: '50%'}}> <Typography>Total Neto: </Typography> </TableCell>
                                    <TableCell component="th" align="right" sx={{width: '50%'}}> <Typography> $ {formatPrice(totalCalculate?.neto)}</Typography> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" align="right" sx={{width: '50%'}}> <Typography>Iva: </Typography> </TableCell>
                                    <TableCell component="th" align="right" sx={{width: '50%'}}> <Typography> $ {formatPrice(totalCalculate?.iva)}</Typography> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" align="right" sx={{width: '50%'}}> <Typography>Total Bruto: </Typography> </TableCell>
                                    <TableCell component="th" align="right" sx={{width: '50%'}}> <Typography> $ {formatPrice(totalCalculate?.bruto)}</Typography> </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>    
                </Grid>
                <Grid lg={3} md={3} sm={6} xs={12} item>
                    <TextField
                        sx={{width: '100%', paddingRight:2, position: 'relative', bottom: 4 }}
                        id="standard-select-currency"
                        // id="standard-select-currency-native"
                        label="Destino"
                        defaultValue={'kilo'}
                        select
                        variant="standard"
                        name='unidad_medida'
                        // value={values.unidad_medida}
                        // error={!!(touched.unidad_medida && errors.unidad_medida)}
                        // helperText={touched.unidad_medida && errors.unidad_medida}
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                    >
                    
                        <MenuItem value={'kilo'}>kilo</MenuItem>
                        <MenuItem value={'kilo2'}>Kilo2</MenuItem>
                    </TextField> 
                    <TextField
                        sx={{width: '100%', paddingRight:2, position: 'relative', bottom: 4 }}
                        id="standard-select-currency"
                        // id="standard-select-currency-native"
                        label="Programa"
                        defaultValue={'kilo'}
                        select
                        variant="standard"
                        name='unidad_medida'
                        // value={values.unidad_medida}
                        // error={!!(touched.unidad_medida && errors.unidad_medida)}
                        // helperText={touched.unidad_medida && errors.unidad_medida}
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                    >
                    
                        <MenuItem value={'kilo'}>kilo</MenuItem>
                        <MenuItem value={'kilo2'}>Kilo2</MenuItem>
                    </TextField> 
                </Grid>
                <Grid lg={3} md={3} sm={6} xs={12} item>
                    {/* VISTA ADJUNTAR DOCUMENTOS */}
                    <ModalBase
                        activator={(open) => (<Button onClick={open} variant="contained">Cargar Archivos</Button>)}
                    >
                        <>
                            Falta vista y funcionalidad para cargar archivos Falta vista y funcionalidad para cargar archivos Falta vista y funcionalidad para cargar archivos Falta vista y funcionalidad para cargar archivos 
                        </>
                    </ModalBase>
                    <Typography>Archivos adjuntos: </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
