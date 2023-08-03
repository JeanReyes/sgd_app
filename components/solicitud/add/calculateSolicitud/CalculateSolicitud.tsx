/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { ItemSolicitud } from '../../../../interface/Sgd';
import { formatPrice } from '../../../../utils/methods';

interface Calculate {
    neto: number;
    iva: number;
    bruto: number;
}

interface Props {
    calculateIva?: number;
    items: ItemSolicitud []
}

export const CalculateSolicitud = ({ items }: Props) => {
    
    const [totalCalculate, setTotalCalculate] = useState<Calculate>()
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
        setTotalCalculate(calculate)
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
        <Grid container sx={{paddingTop: 2}}>
            <Grid lg={3} md={3} sm={6} xs={12} item>
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
            <Grid lg={3} md={3} sm={6} xs={12} item>
                {iva}
                <Typography>Total Neto: {formatPrice(totalCalculate?.neto)}</Typography>
                <Typography>Iva: {formatPrice(totalCalculate?.iva)}</Typography>
                <Typography>Total Bruto: {formatPrice(totalCalculate?.bruto)}</Typography>
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
                <Button variant="contained">Cargar Archivos</Button>
                <Typography>Archivos adjuntos: </Typography>
            </Grid>
        </Grid>
    )
}
