/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Grid, TextField, MenuItem, Button, useMediaQuery, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import { ItemSolicitud } from '../../../../interface/Sgd';
import { formatPrice } from '../../../../utils/methods';

const initItem = {
    quantity: '',
    unidad_medida: '',
    detail: '',
    classification: '',
    precio: ''
}

interface Props {
    editItem?: {item: ItemSolicitud, index: number}
    addItems: (values: ItemSolicitud) => void;
    handleSetEditItem: (value: {item: ItemSolicitud, index: number}) => void;
}

export const AddItem = ({editItem, addItems, handleSetEditItem}: Props) => {
    const lgMd = useMediaQuery((theme) => (theme as any).breakpoints.up('md'));
    const [ disabledButton, setDisabledButton ] = useState(true);
    const [initItem, setAddItem] = useState({
        quantity: '',
        unidad_medida: '',
        detail: '',
        classification: '',
        precio: ''
    })
    
    
    const { values, errors, touched, handleChange, handleBlur, resetForm, setValues } = useFormik({
        initialValues: initItem,
        validationSchema: Yup.object({
        quantity: Yup
            .number().typeError('Debe ser número').min(1, 'El valor mínimo es 1.').max(250, 'El valor máximo es 250.')
            .required('requerido'),
        unidad_medida: Yup
            .string()
            .required('requerido'),
        detail: Yup
            .string()
            .required('requerido'),
        classification: Yup
            .number().typeError('Debe ser número')
            .required('requerido'),
        precio: Yup
            .number().typeError('Debe ser número').min(0, 'El valor mínimo es 0.')
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

    const handleButtonEvent = () => {
 
        if (Object.keys(editItem as {item: ItemSolicitud, index: number}).length !== 0) {
            setDisabledButton(true) 
            handleSetEditItem({
                item: values,
                index: editItem?.index as number
            })
            resetForm()
        } else {
            handleAddItem()
        }
    }

 
    // habilitar y desactivar button
    useEffect(() => {
        // if (editItem?.item) { // estamos editando
        //     if(Object.keys(errors).length === 0) {
        //         setDisabledButton(false)
        //     } else {
        //         setDisabledButton(true)
        //     }
        // } else {
            if(Object.keys(errors).length === 0 && Object.keys(touched).length !== 0) {
                setDisabledButton(false) 
            } else {
                setDisabledButton(true)
            }
        // }
    }, [errors, touched]);

    useEffect(() => {
        if(editItem)
        if (Object.keys(editItem).length !== 0) {
            setAddItem(editItem.item)
            setValues(editItem.item)
            setDisabledButton(false) 
        }
    }, [editItem])

  return (
    <Box sx={{marginBottom: 5}}>
        <Box sx={{padding: 1, maxWidth: 150, borderLeft: .5, borderTop: .5, borderRight: .5}}>
            {editItem?.item ? 'Editar' : 'Ingreso'} de item:
        </Box>
        <Box sx={{padding: 1, border: .5}}>
            <Grid sx={{display:'flex', width: '100%', paddingBottom: 4}} container>
                <Grid lg={1} md={1} sm={12} xs={12} item>
                    <TextField 
                        sx={{ width: '100%', paddingRight:2 }}
                        id="standard-basic" label="Cantidad" variant="standard"
                        name='quantity'
                        value={values.quantity}
                        error={!!(touched.quantity && errors.quantity)}
                        helperText={touched.quantity && errors.quantity}
                        // color="warning"
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
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <TextField
                            sx={{ width: '100%'}}
                            id="standard-basic" label="Precio Neto" variant="standard" 
                            name='precio'
                            value={formatPrice(values.precio)}
                            error={!!(touched.precio && errors.precio)}
                            helperText={touched.precio && errors.precio}
                            onBlur={handleBlur}
                            onChange={(e) => {
                                const inputPrice = e.target.value.replace(/\D/g, '');
                                handleChange({ target: { name: 'precio', value: inputPrice } });
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Box>
                </Grid>
                <Grid lg={1} md={1} sm={12} xs={12} sx={{ paddingLeft: lgMd ? 2 : 0}} item>
                    <Button 
                        sx={{width:'100%', m:0, marginTop: lgMd ? 0 : 2}} 
                        disabled={disabledButton} 
                        variant="contained" 
                        onClick={handleButtonEvent}
                        >
                            Ingresar
                    </Button>  
                </Grid>
            </Grid>  
        </Box>
    </Box>
  )
}
