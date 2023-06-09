/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Grid, TextField, MenuItem, Button, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ItemSolicitud } from '../../../interface/Sgd';

const initItem = {
    quantity: '',
    unidad_medida: '',
    detail: '',
    classification: '',
    precio: ''
}

interface Props {
    addItems: (values: ItemSolicitud) => void
}

export const AddItem = ({addItems}: Props) => {
    const lgMd = useMediaQuery((theme) => (theme as any).breakpoints.up('md'));
    const [ disabledButton, setDisabledButton ] = useState(true);
    
    const { values, errors, touched, handleChange, handleBlur, resetForm } = useFormik({
        initialValues: initItem,
        validationSchema: Yup.object({
        quantity: Yup
            .number().typeError('Debe ser numero').min(0, 'Min value 0.').max(100, 'Max value 100.')
            .required('requerido'),
        unidad_medida: Yup
            .string()
            .required('requerido'),
        detail: Yup
            .string()
            .required('requerido'),
        classification: Yup
            .string()
            .required('requerido'),
        precio: Yup
            .number().typeError('Debe ser numero').min(0, 'Min value 0.').max(100, 'Max value 100.')
            .required('requerido'),
        }),
        onSubmit: async (values, helpers) => {
            console.log("estamos enviando form");
        }
    });

    const handleAddItem = () => {
        if(Object.keys(errors).length) {
            return;  
        } else {     
            setDisabledButton(true) 
            addItems(values)
            resetForm()
        } 
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && Object.keys(touched).length !== 0) {
            setDisabledButton(false) 
        } else {
            setDisabledButton(true)
        }
        
    }, [errors])


  return (
    <Grid sx={{display:'flex', width: '100%', paddingBottom: 4}} container>
        <Grid lg={1} md={1} sm={12} xs={12} item>
            <TextField 
                sx={{ width: '100%', paddingRight:2 }}
                id="standard-basic" label="Cantidad" variant="standard"
                name='quantity'
                value={values.quantity}
                error={!!(touched.quantity && errors.quantity)}
                helperText={touched.quantity && errors.quantity}
                color="warning"
                onBlur={handleBlur}
                onChange={handleChange}/>
        </Grid>
        <Grid lg={2} md={2} sm={12} xs={12} item>
            <TextField
                sx={{width: '100%', paddingRight:2, position: 'relative', bottom: 4 }}
                id="standard-select-currency"
                // id="standard-select-currency-native"
                label="Unidad de Medida"
                defaultValue={'kilo'}
                select
                variant="standard"
                name='unidad_medida'
                value={values.unidad_medida}
                error={!!(touched.unidad_medida && errors.unidad_medida)}
                helperText={touched.unidad_medida && errors.unidad_medida}
                onBlur={handleBlur}
                onChange={handleChange}
            >
            
                <MenuItem value={'kilo'}>kilo</MenuItem>
                <MenuItem value={'kilo2'}>Kilo2</MenuItem>
                <MenuItem value={'litro'}>Litro</MenuItem>
                <MenuItem value={'litro2'}>Litro2</MenuItem>
            </TextField>
        </Grid>
        <Grid lg={4} md={4} sm={12} xs={12} item>
            <TextField 
                sx={{ width: '100%', paddingRight:2 }}
                id="standard-basic" label="Detalle o Descripción" variant="standard" 
                name='detail'
                value={values.detail}
                error={!!(touched.detail && errors.detail)}
                helperText={touched.detail && errors.detail}
                onBlur={handleBlur}
                onChange={handleChange}/>
                
        </Grid>
        <Grid lg={3} md={3} sm={12} xs={12} item>
            <TextField 
                sx={{ width: '100%', paddingRight:2 }}
                id="standard-basic" label="Clasificación Presupuestaria" variant="standard" 
                name='classification'
                value={values.classification}
                error={!!(touched.classification && errors.classification)}
                helperText={touched.classification && errors.classification}
                onBlur={handleBlur}
                onChange={handleChange}/>     
        </Grid>
        <Grid lg={1} md={1} sm={12} xs={12} item>
            <TextField 
                sx={{ width: '100%'}}
                id="standard-basic" label="Precio Neto" variant="standard" 
                name='precio'
                value={values.precio}
                error={!!(touched.precio && errors.precio)}
                helperText={touched.precio && errors.precio}
                onBlur={handleBlur}
                onChange={handleChange}/>        
        </Grid>
        <Grid lg={1} md={1} sm={12} xs={12} sx={{ paddingLeft: lgMd ? 2 : 0}} item>
            <Button sx={{width:'100%', m:0, marginTop: lgMd ? 0 : 2}} disabled={disabledButton} variant="contained" onClick={handleAddItem}>Ingresar</Button>  
        </Grid>
    </Grid>  
  )
}
